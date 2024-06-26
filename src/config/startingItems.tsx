import { RiRobot2Fill } from "react-icons/ri";
import { TbCube3dSphere } from "react-icons/tb";
import { BiSolidBookContent } from "react-icons/bi";
import { AiFillApi } from "react-icons/ai";
import { Badge } from "@/components/ui/badge";
import { MdApi } from "react-icons/md";
import { FaDatabase } from "react-icons/fa6";

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
    icon: <TbCube3dSphere size={20} />,
  },
  // {
  //   title: "AI-gen Content",
  //   description:
  //     "Build AI-generated blog posts or single-page sites by just defining the structure of the content",
  //   icon: <BiSolidBookContent size={20} />,
  //   more: (
  //     <div className="mt-4 flex flex-col gap-2 items-center">
  //       <Badge className="max-w-max">demo</Badge>
  //     </div>
  //   ),
  // },
  // {
  //   title: "AI Clients",
  //   description:
  //     "In order to run your agents, you need to connect AI clients to Scoopika (like OpenAI or Google)",
  //   icon: <AiFillApi size={20} />,
  //   more: (
  //     <div className="mt-4 flex flex-col gap-2 items-center">
  //       <Badge className="max-w-max">secure</Badge>
  //       <Badge variant="secondary">one-click setup</Badge>
  //     </div>
  //   ),
  // },
  {
    title: "Data Stores",
    description:
      "Managed Serverless data stores used for persistent history sessions and users",
    icon: <FaDatabase size={20} />,
    more: (
      <div className="mt-4 flex flex-col gap-2 items-center">
        <Badge className="max-w-max">Pro</Badge>
        <Badge className="max-w-max">One-click setup</Badge>
      </div>
    ),
  },
];

export default startingItems;
