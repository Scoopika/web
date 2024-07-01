interface Props {
  icon: React.ReactNode;
  title: string;
  description: string;
  children?: React.ReactNode;
}

export default function Empty({ icon, title, description, children }: Props) {
  return (
    <div className="w-full p-4 flex items-center justify-center flex-col group">
      <div className="w-20 h-20 relative flex items-center justify-center">
        <div className="w-10 h-10 border-1 rounded-xl bg-accent/20 backdrop-blur flex items-center justify-center absolute top-4 left-3 rotate-[-20deg] transition-all duration-500 group-hover:border-black/20 dark:group-hover:border-white/20"></div>
        <div className="w-10 h-10 border-1 rounded-xl bg-accent/20 backdrop-blur flex items-center justify-center rotate-[-20deg] transition-all duration-300 group-hover:border-black/20 dark:group-hover:border-white/20"></div>
        <div className="w-10 h-10 border-1 rounded-xl bg-accent/20 backdrop-blur flex items-center justify-center absolute top-6 left-7 rotate-[-20deg] transition-all duration-200 group-hover:border-black/20 dark:group-hover:border-white/20">
          {icon}
        </div>
      </div>
      <div className="font-semibold mb-1">{title}</div>
      <div className="text-sm opacity-80 lg:w-[80%] mb-6 text-center">
        {description}
      </div>
      {children}
    </div>
  );
}
