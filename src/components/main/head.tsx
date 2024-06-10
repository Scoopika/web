interface Props {
  title: string | React.ReactNode;
  description: string;
  action?: React.ReactNode;
  back?: React.ReactNode;
}

export default function AppHead({ title, description, action, back }: Props) {
  return (
    <div className="w-full flex flex-col lg:flex-row lg:items-center gap-3">
      <div className="">
        <div className="flex items-center gap-2 mb-2">
          {back && back}
          <h3 className="text-2xl font-semibold truncate">{title}</h3>
        </div>
        <div className="text-sm opacity-80 truncate">{description}</div>
      </div>
      <div className="w-full flex items-center lg:justify-end">
        {action && action}
      </div>
    </div>
  );
}
