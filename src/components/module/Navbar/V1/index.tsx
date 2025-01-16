"use client";

import Button from "@/components/base/Button";
import clsx from "clsx";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { MdMenu } from "react-icons/md";

export default function Navbar() {
  const contentRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [contentHeight, setContentHeight] = useState("0px");

  const updateContentHeight = useCallback(() => {
    if (window.innerWidth < 1024) {
      setContentHeight(isOpen && contentRef.current ? `${contentRef.current.scrollHeight}px` : "0px");
    } else {
      setContentHeight("auto");
    }
  }, [isOpen]);

  useEffect(() => {
    updateContentHeight();
    window.addEventListener("resize", updateContentHeight);

    return () => window.removeEventListener("resize", updateContentHeight);
  }, [isOpen, updateContentHeight]);

  const handleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <nav className="sticky top-0 flex w-full flex-col border-b border-neutral-300 bg-white p-4 lg:flex-row lg:items-center">
      <div className="flex w-full gap-4">
        <Link href="/docs/navbar">
          <img src="/logo.png" alt="Logo" className="h-6" />
        </Link>
        <Button onClick={handleOpen} variant="light" className="ml-auto h-8 w-8 p-0 text-h4 lg:hidden">
          <MdMenu />
        </Button>
      </div>
      <div ref={contentRef} style={{ height: contentHeight }} className={clsx("w-full overflow-hidden transition-[height] duration-300 ease-in-out")}>
        <div className="flex w-full flex-col justify-end gap-4 pt-4 lg:flex-row lg:p-0">
          <Link href="/docs/navbar">Home</Link>
          <Link href="/docs/navbar">About</Link>
          <Link href="/docs/navbar">Contact</Link>
        </div>
      </div>
    </nav>
  );
}
