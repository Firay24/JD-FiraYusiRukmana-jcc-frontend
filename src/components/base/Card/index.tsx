import clsx from "clsx";

interface CardProps {
  children: React.ReactNode;
  type?: "border" | "shadow" | "none";
  className?: string;
}

export default function Card({ children, className, type = "shadow" }: CardProps) {
  const hasPaddingX = /\bpx-\d+\b/.test(className || "");
  const hasPaddingY = /\bpy-\d+\b/.test(className || "");
  const hasPadding = /\bp-\d+\b/.test(className || "");
  const hasWidthClass = /\bw-(\d+|full)\b/.test(className || "");
  const hasBackgroundClass = /\bbg-[a-zA-Z0-9]+\b/.test(className || "");
  const hasRoundedClass = /\brounded(-[a-zA-Z0-9]+)?\b/.test(className || "");
  const hasShadowClass = /\bshadow(-[a-zA-Z0-9]+)?\b/.test(className || "");
  const hasBorderClass = /\bborder(-[a-zA-Z0-9]+)?\b/.test(className || "");

  return (
    <div
      className={clsx(className, {
        "px-4": !hasPadding && !hasPaddingX,
        "py-4": !hasPadding && !hasPaddingY,
        "w-full": !hasWidthClass,
        "rounded-lg": !hasRoundedClass,
        "bg-white": !hasBackgroundClass,
        shadow: !hasShadowClass && type === "shadow",
        "border border-neutral-200": !hasBorderClass && type === "border",
      })}
    >
      {children}
    </div>
  );
}
