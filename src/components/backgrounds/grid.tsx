export default function GridSmallBackground({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`h-full w-full dark:bg-grid-white/[0.04] bg-grid-black/[0.06] relative ${className}`}
    >
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_5%,black)]"></div>
      {children && children}
    </div>
  );
}
