import clsx from "clsx";

export default function Skeleton({ className }: { className?: string }) {
  return <div className={clsx("animate-pulse cursor-wait bg-neutral-300", className)}></div>;
}
