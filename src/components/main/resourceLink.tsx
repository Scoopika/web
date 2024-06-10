import Link from "next/link";
import { FaExternalLinkAlt } from "react-icons/fa";

interface Props {
  name: string;
  link: string;
}

export default function ResourceLink({ name, link }: Props) {
  return (
    <Link
      href={link}
      target="_blank"
      className="text-sm opacity-70 underline hover:opacity-100 transitiona-all flex items-center gap-2 group"
    >
      {name}
      <FaExternalLinkAlt className="opacity-0 group-hover:opacity-100 transition-all" />
    </Link>
  );
}
