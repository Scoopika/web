import { FaCheckCircle } from "react-icons/fa";

interface Props {
    title: string;
}

export default function CheckItem({ title }: Props) {

    return (
        <div className="flex items-center gap-2 text-sm">
            <FaCheckCircle size={17} />
            <p className="opacity-80">{title}</p>
        </div>
    )

}
