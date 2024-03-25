import "@/styles/mdx.css";
import { allDocs } from "docs/contentlayer/generated";
import { notFound } from "next/navigation";
import { Mdx } from "@/components/docs/mdx-components";
import { getTableOfContents } from "@/lib/toc";
import { DashboardTableOfContents } from "@/components/docs/toc";
import { DocsPager } from "@/components/docs/pager";
import { docsConfig } from "@/config/docs";
import { DocsSidebarNav } from "@/components/docs/sidebar";
import { Metadata } from "next";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const doc = await getDocBySlug(params.slug);

  if (!doc) {
    return {};
  }

  return {
    title: doc.title,
    description: doc.description,
    openGraph: {
      title: doc.title,
      description: doc.description,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: doc.title,
      description: doc.description,
    },
  };
}

async function getDocBySlug(slug: string) {
  const doc = allDocs.find((doc) => doc.slug === slug);

  if (!doc) {
    notFound();
  }

  return doc;
}

export default async function Page({ params }: Props) {
  const doc = await getDocBySlug(params.slug);

  const toc = await getTableOfContents(doc.body.raw);

  return (
    <div className="pt-16 min-h-screen flex">
      <DocsSidebarNav items={docsConfig.sidebarNav} />
      <div className="w-full border-r-1 p-10">
        <p className="font-semibold text-[var(--brandpurple)] mb-2">
          {doc.category}
        </p>
        <h1 className="text-3xl font-bold mb-8">{doc.title}</h1>
        <div
          className="w-full "
          style={{ boxShadow: "0px 0px 380px 10px var(--brandpurple)" }}
        ></div>
        <Mdx code={doc.body.code} />
        <br />
        <hr className="mb-6"></hr>
        <DocsPager doc={doc} />
      </div>
      <div className="hidden text-sm xl:block">
        <div className="sticky top-16 -mt-10 max-h-[calc(var(--vh)-4rem)] overflow-y-auto pt-10 pl-4 min-w-56">
          <DashboardTableOfContents toc={toc} />
        </div>
      </div>
    </div>
  );
}
