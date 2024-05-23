import { CSSProperties } from "react";

export default function GridSmallBackground({
  children,
  className,
  colors,
  shadow = true,
  style,
}: {
  children?: React.ReactNode;
  className?: string;
  colors?: { light?: string; dark?: string };
  style?: CSSProperties;
  shadow?: boolean;
}) {
  let light: string;
  let dark: string;

  if (colors) {
    light = colors.light || "black";
    dark = colors.dark || "white";
  } else {
    light = "black";
    dark = "white";
  }

  return (
    <div
      className={`h-full w-full bg-grid-black/[0.06] dark:bg-grid-white/[0.05] ${className}`}
      style={style}
    >
      {/* Radial gradient for the container to give a faded look */}
      {shadow && (
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_2%,black)] hidden md:block"></div>
      )}
      {children && children}
    </div>
  );
}
