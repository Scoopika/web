import Link from "next/link";
import { FaExternalLinkAlt } from "react-icons/fa";

interface Props {
  name: string;
  link: string;
  underline?: boolean;
  showIcon?: boolean;
}

export default function ResourceLink({
  name,
  link,
  underline,
  showIcon,
}: Props) {
  return (
    <Link
      href={link}
      target="_blank"
      className={`text-sm opacity-70 hover:opacity-100 transitiona-all flex items-center gap-2 group ${
        underline !== false && "underline"
      }`}
    >
      {name}
      <FaExternalLinkAlt
        className={`${showIcon !== true && "opacity-0"} group-hover:opacity-100 transition-all`}
      />
    </Link>
  );
}
