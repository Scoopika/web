export default function Logo() {
  return (
    <div className="flex items-center justify-center w-9 h-9 rounded-full bg-black dark:bg-white overflow-hidden pl-1 group">
      <img
        src="/logo.png"
        alt="Scoopika logo"
        className="rotate-[-10deg] mt-1.5 group-hover:scale-110 transition-transform duration-500"
      />
    </div>
  );
}
