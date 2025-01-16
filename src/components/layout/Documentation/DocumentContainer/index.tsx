import Code from "@/components/base/Code";
import clsx from "clsx";
import Link from "next/link";
import { useMemo } from "react";
import slugify from "slugify";

export default function DocumentContainer({ title, monospace, children }: { title: string; monospace?: boolean; children: React.ReactNode }) {
  const slug = useMemo(() => slugify(title), [title]);

  return (
    <div id={slug} className="relative flex min-h-dvh w-full flex-col items-start gap-4 border-b border-neutral-300 px-4 py-8">
      <div className={clsx({ "overflow-x-auto": monospace }, "block w-full")}>
        <Link href={`#${slug}`}>
          {monospace && (
            <Code>
              <h1>{title}</h1>
            </Code>
          )}
          {!monospace && <h1>{title}</h1>}
        </Link>
      </div>
      {children}
    </div>
  );
}
