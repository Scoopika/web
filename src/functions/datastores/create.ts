"use server";

import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import cleanText from "@/scripts/cleanText";
import { DataStore } from "@/types/dataStore";
import { getServerSession } from "next-auth";

function sleep(ms?: number) {
  if (typeof ms !== "number") {
    ms = 0;
  }

  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export default async function createDatastore(
  name: string
): Promise<
  { success: false; error?: string } | { success: true; data: DataStore }
> {
  if (!name) {
    return { success: false };
  }

  name = name.toLowerCase().replaceAll(" ", "-").replaceAll(".", "-");

  const session = await getServerSession(authOptions);

  if (!session) {
    return { success: false };
  }

  const plan = session.user.plan;

  if (plan === "none" || plan === "free" || !plan.includes(":::")) {
    return { success: false };
  }

  const existStores = await db.datastore.findMany({
    where: {
      userId: session.user.id,
    },
  });

  if (existStores && existStores.length > 0) {
    return { success: false };
  }

  const githubRes = await fetch(
    "https://api.github.com/repos/scoopika/store/contents/main.ts",
    {
      headers: {
        authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      },
    }
  );

  const data = await githubRes.json();

  if (!data.content) {
    return { success: false, error: "Can't load API, try again later!" };
  }

  const code = atob(data.content);

  const newKV = await fetch(
    `${process.env.DENO_URL}/organizations/${process.env.DENO_ORG_ID}/databases`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.DENO_TOKEN}`,
      },
      body: JSON.stringify({
        description: name,
      }),
    }
  );

  const newKVState = newKV.status;
  const newKVData = await newKV.json();
  const kvId = newKVData.id as string;

  if (newKVState !== 200) {
    return {
      success: false,
      error: "Can't create a new store. try again later!",
    };
  }

  const newProjectRes = await fetch(
    `${process.env.DENO_URL}/organizations/${process.env.DENO_ORG_ID}/projects`,
    {
      method: "POST",
      body: JSON.stringify({
        name,
      }),
      headers: {
        Authorization: `Bearer ${process.env.DENO_TOKEN}`,
      },
    }
  );

  if (newProjectRes.status !== 200) {
    try {
      const errorDetails = await newProjectRes.json();
      if (errorDetails && errorDetails.message) {
        return {
          success: false,
          error: errorDetails.message,
        };
      }

      return { success: false };
    } catch {
      return { success: false };
    }
  }

  const newProjectData = await newProjectRes.json();
  const projectId = newProjectData.id as string;

  if (!projectId) {
    return { success: false, error: newProjectData.message };
  }

  const deploymentRes = await fetch(
    `${process.env.DENO_URL}/projects/${projectId}/deployments`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.DENO_TOKEN}`,
      },
      body: JSON.stringify({
        entryPointUrl: "main.ts",
        assets: {
          "main.ts": {
            kind: "file",
            content: code,
            encoding: "utf-8",
          },
        },
        envVars: {
          SECURED: "yes",
          VERIFY_URL: `${process.env.SOURCE}/main/verify`,
          USER_ID: session.user.id,
        },
        databases: {
          default: kvId,
        },
      }),
    }
  );

  const status = deploymentRes.status;
  let deploymentData = await deploymentRes.json();

  if (status !== 200) {
    return {
      success: false,
      error: deploymentData.message || "Can't deploy database",
    };
  }

  while (deploymentData.status === "pending") {
    await sleep(2000);

    const newDepRes = await fetch(
      `${process.env.DENO_URL}/deployments/${deploymentData.id}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.DENO_TOKEN}`,
        },
      }
    );
    const newDep = await newDepRes.json();

    if (newDep.status === "failed") {
      return {success: false, error: "Deployment failed. try again later!"};
    }

    if (newDep.status === "success") {
      deploymentData = newDep;
      break;
    }
  }

  const finalData: DataStore = {
    id: crypto.randomUUID(),
    userId: session.user.id,
    db_id: kvId,
    deployment_id: deploymentData.id as string,
    name,
    url: deploymentData.domains[0] as string,
  };

  await db.datastore.create({
    data: finalData,
  });

  return {
    success: true,
    data: finalData,
  };
}
