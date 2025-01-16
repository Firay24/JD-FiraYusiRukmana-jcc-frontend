import Link from "next/link";

export default function page() {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-3 bg-neutral-900 text-h5 font-extralight uppercase tracking-widest text-white">
      <ul className="flex list-disc flex-col gap-4">
        <li>
          <Link href="/docs">Back to Home</Link>
        </li>
        <li>
          <Link href="/docs/navbar/v1">V1</Link>
        </li>
        <li>
          <Link href="/docs/navbar/v2">V2</Link>
        </li>
        <li>
          <Link href="/docs/navbar/v3">V3</Link>
        </li>
      </ul>
    </main>
  );
}
