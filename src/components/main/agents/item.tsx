import { Badge } from "@/components/ui/badge";
import { AgentData } from "@scoopika/types";
import Link from "next/link";

interface Props {
  agent: AgentData;
}

export default function AgentItem({ agent }: Props) {
  return (
    <Link href={`/app/agents/${agent.id}`} className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(25%-1rem)] h-64 rounded-3xl overflow-hidden relative group mb-4 shadow border-1 dark:border-white/20">
      {agent.avatar && agent.avatar.length > 0 ? (
        <img
          src={agent.avatar}
          className="w-full h-full object-cover rounded-2xl group-hover:scale-110 group-hover:rotate-[-5deg] transition-all opacity-70"
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-r from-violet-400/30 to-pink-400/30 group-hover:scale-110 transition-all rounded-2xl"></div>
      )}
      <div className="w-full h-28 bottom-0 left-0 p-2 absolute flex items-end">
        <div className="bg-background/90 rounded-md rounded-b-3xl backdrop-blur p-3 w-full">
            <Badge variant="secondary" className="text-xs mb-2">{agent.id.split("-")[0]}</Badge>
            <div className="font-semibold text-sm mb-1">{agent.name}</div>
            <div className="text-xs opacity-80 min-w-max truncate">{agent.description}</div>
        </div>
      </div>
    </Link>
  );
}
