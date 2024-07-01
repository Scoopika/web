// "use server";

// import { db } from "@/lib/db";
// import { AgentData } from "@scoopika/types";
// import { createClient } from "@supabase/supabase-js";
// import updateAgentData from "./agents/update";

// export default async function UploadVoice(
//   agent: AgentData,
//   file: string,
//   type: string
// ): Promise<
//   { success: false; error?: string } | { success: true; path: string }
// > {

//   const fileBuffer = Buffer.from(file, 'base64');
//   const filename = `voice_${crypto.randomUUID()}.${type}`;

//   const { data, error } = await supabase.storage
//     .from("voices")
//     .upload(filename, fileBuffer);

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
