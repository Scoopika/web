import { RiRobot2Fill } from "react-icons/ri";
import { Tb3DCubeSphere } from "react-icons/tb";
import { BiSolidBookContent } from "react-icons/bi";
import { AiFillApi } from "react-icons/ai";
import { Badge } from "@/components/ui/badge";
import { MdApi } from "react-icons/md";

const startingItems: {
  title: string;
  description: string;
  icon: React.ReactNode;
  more?: React.ReactNode;
}[] = [
  {
    title: "Agents",
    description:
      "Smart AI assistants with custom instructions and access to external APIs and tools",
    icon: <RiRobot2Fill />,
  },
  {
    title: "Smart Boxes",
    description:
      "Connect multiple agents in one box and let them collaborate based on the context",
    icon: <Tb3DCubeSphere size={20} />,
  },
  {
    title: "AI-gen Content",
    description:
      "Build AI-generated blog posts or single-page sites by just defining the structure of the content",
    icon: <BiSolidBookContent size={20} />,
    more: (
      <div className="mt-4 flex flex-col gap-2 items-center">
        <Badge className="max-w-max">demo</Badge>
      </div>
    ),
  },
  {
    title: "AI Clients",
    description:
      "In order to run your agents, you need to connect AI clients to Scoopika (like OpenAI or Google)",
    icon: <AiFillApi size={20} />,
    more: (
      <div className="mt-4 flex flex-col gap-2 items-center">
        <Badge className="max-w-max">secure</Badge>
        <Badge variant="secondary">one-click setup</Badge>
      </div>
    ),
  },
  {
    title: "Edge APIs",
    description:
      "You can connect to Scoopika from your server-side, or host an edge API with built-in database with one click",
    icon: <MdApi size={20} />,
    more: (
      <div className="mt-4 flex flex-col gap-2 items-center">
        <Badge className="max-w-max">Pro</Badge>
      </div>
    ),
  },
];

export default startingItems;
