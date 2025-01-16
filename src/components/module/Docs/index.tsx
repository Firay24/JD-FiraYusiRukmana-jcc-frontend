import Link from "next/link";

export default function Docs() {
  return (
    <main className="h-full w-full text-white">
      <div className="flex h-full w-full flex-col items-center justify-center gap-6 bg-neutral-900 px-4">
        <h1 className="text-center text-h1 font-extralight leading-normal tracking-widest lg:font-extralight">XNGINE </h1>
        <div className="flex flex-wrap justify-center gap-8 text-h5 font-extralight uppercase tracking-widest lg:font-extralight">
          <ul className="flex list-disc flex-col gap-4 pl-5">
            <li>
              <Link href="/docs/components" className="">
                Components
              </Link>
            </li>
            <li>
              <Link href="/docs/utilities" className="">
                Utilities
              </Link>
            </li>
            <li>
              <Link href="/docs/hooks" className="">
                Hooks
              </Link>
            </li>
            <li>
              <Link href="/docs/state" className="">
                State
              </Link>
            </li>
          </ul>
          <ul className="flex list-disc flex-col gap-4 pl-5">
            <li>
              <Link href="/docs/navbar" className="">
                Navbar
              </Link>
            </li>
            <li>
              <Link href="/auth/sign-up" className="">
                Sign Up
              </Link>
            </li>
            <li>
              <Link href="/auth/sign-in" className="">
                Sign In
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
