import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Loading() {
  return (
    <div className="w-full p-24 flex items-center justify-center">
      <div className="w-10 h-10 relative">
        <div className="w-10 h-10 absolute top-0 left-0 border-1 rounded-full flex items-center justify-center bg-accent/20 z-10">
          <AiOutlineLoading3Quarters className="animate-spin opacity-80" size={18} />
        </div>
        <div className="w-10 h-10 absolute top-0 left-0 border-1 rounded-full flex items-center justify-center bg-accent/20 animate-ping"></div>
      </div>
    </div>
  );
}
