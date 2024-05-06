import Image from "next/image";

export default function Loading() {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Image
        src="/logo.png"
        alt="Scoopika logo"
        width={40}
        height={40}
        className="rotate-[-10deg] mt-1.5 group-hover:scale-110 transition-transform duration-500"
      />
    </div>
  );
}
