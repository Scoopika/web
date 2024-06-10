interface Props {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export default function SettingsRow({ title, description, children }: Props) {
  return (
    <div className="w-full flex flex-col lg:flex-row p-3 pt-5 pb-5 border-b-1 gap-4 lg:gap-6 max-w-full overflow-auto">
      <div className="w-full">
        <h3 className="font-semibold">{title}</h3>
        <p className="text-xs opacity-70">{description}</p>
      </div>
      <div className="w-full flex items-center gap-4">
        {children}
      </div>
    </div>
  );
}
