import { FaCheckCircle } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";

interface Props {
  title: string;
  className?: string;
}

export default function CheckItem({ title, className }: Props) {
  return (
    <div className={`flex gap-2 text-sm ${className}`}>
      <div className="min-w-4 min-h-4 max-w-4 max-h-4 flex items-center justify-center ">
        <FaCheck size={13} />
      </div>
      <p className="opacity-80">{title}</p>
    </div>
  );
}
