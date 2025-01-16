"use client";

import Button from "@/components/base/Button";
import clsx from "clsx";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { MdHome, MdInfo, MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight, MdLocalPhone, MdMenu } from "react-icons/md";

export default function Navbar({ children }: { children: React.ReactNode }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenSide, setIsOpenSide] = useState(false);
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

  const handleOpenSide = useCallback(() => {
    setIsOpenSide((prev) => !prev);
  }, []);

  const links = [
    {
      label: "Home",
      icon: <MdHome />,
      href: "/docs/navbar",
    },
    {
      label: "About",
      icon: <MdInfo />,
      href: "/docs/navbar",
    },
    {
      label: "Contact",
      icon: <MdLocalPhone />,
      href: "/docs/navbar",
    },
  ];

  return (
    <>
      <nav ref={navRef} className="sticky top-0 z-50 flex w-full flex-col border-b border-neutral-300 bg-white p-4 lg:flex-row lg:items-center">
        <div className="flex w-full gap-4">
          <Link href="/docs/navbar">
            <img src="/logo.png" alt="Logo" className="h-6" />
          </Link>
          <Button onClick={handleOpen} variant="light" className="ml-auto h-8 w-8 p-0 text-h4 lg:hidden">
            <MdMenu />
          </Button>
        </div>
        <div ref={contentRef} style={{ height: contentHeight }} className={clsx("w-full overflow-hidden transition-[height] duration-300 ease-in-out lg:hidden")}>
          <div className="flex w-full flex-col justify-end gap-4 pt-4 lg:flex-row lg:p-0">
            {links.map((link, index) => (
              <Link key={index} href={link.href} className="flex items-center gap-2">
                {link.icon}
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
      <div className="flex">
        <div>
          <aside style={{ top: navRef.current?.offsetHeight + "px", height: `calc(100dvh - ${navRef.current?.offsetHeight}px)` }} className={clsx({ "w-[200px]": isOpenSide, "w-[70px]": !isOpenSide }, "sticky col-span-2 hidden border-r border-neutral-300 bg-white transition-[width] duration-300 ease-in-out lg:block")}>
            <div className="flex flex-col gap-4 p-4">
              <Button onClick={handleOpenSide} variant="custom" className="h-[38px] w-[38px] border-neutral-300 bg-white p-0 text-h4">
                {isOpenSide && <MdKeyboardDoubleArrowLeft />}
                {!isOpenSide && <MdKeyboardDoubleArrowRight />}
              </Button>
              {links.map((link, index) => (
                <Link key={index} href={link.href} className="flex items-center overflow-hidden rounded-lg border border-neutral-300 p-2">
                  <span className="mr-2.5 text-[20px]">{link.icon}</span> {link.label}
                </Link>
              ))}
            </div>
          </aside>
        </div>
        <div className="flex-grow">{children}</div>
      </div>
    </>
  );
}
