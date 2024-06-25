// "use server";

// import { db } from "@/lib/db";
// import { AgentData } from "@scoopika/types";
// import { createClient } from "@supabase/supabase-js";
// import updateAgentData from "../../functions/agents/update";
// import { NextApiRequest, NextApiResponse } from "next";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const supabase = createClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL as string,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
//   );

//   const filename = `voice_${crypto.randomUUID()}.wav`;

//   const { data, error } = await supabase.storage
//     .from("voices")
//     .upload(filename, file);

//   if (!data || !data.path || error) {
//     return {
//       success: false,
//       error: error?.message || "Can't upload audio file!",
//     };
//   }

//   const update = await updateAgentData(agent.id, { ...agent, voice: data.path });

//   if (!update?.success) {
//     return {
//         success: false,
//         error: "Failed to update agent data!"
//     }
//   }

//   return {
//     success: true,
//     path: data.path,
//   };
// }
