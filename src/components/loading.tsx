import { AiOutlineLoading } from "react-icons/ai";

export default function Loading() {

    return (
        <div className="w-full flex flex-col items-center p-24">
            <AiOutlineLoading className="animate-spin" />
          </div>
    )

}