"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/module/Navbar";
import { navbarMenuMember } from "@/data/navbarMember";
import { BsPersonArmsUp } from "react-icons/bs";
import { IoIosArrowDropright } from "react-icons/io";
import dynamic from "next/dynamic";

const LineChart = dynamic(() => import("../../components/module/Linechart"), { ssr: false });

const HomeMember = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-base-gray">
      {/* nav */}
      <Navbar isScrolled={isScrolled} menu={navbarMenuMember} isLogged logoPath="/only-logo.png" />

      <div className="grid grid-cols-1 gap-4 px-4">
        {/* header */}
        <div className="rounded-lg bg-white p-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div>
                <img className="h-auto w-12 rounded-full" src="/img/profileImg.jpeg" alt="avatar" />
              </div>
              <div>
                <p className="text-lg font-bold">Hello Andre</p>
                <p className="text-sm text-gray-400">Level Cibi</p>
              </div>
            </div>
            <div className="mr-2">
              <p className="text-right text-lg font-bold">5%</p>
              <p className="text-right text-sm text-gray-400">10/99 poin</p>
            </div>
          </div>
          <div className="px-3 py-2">
            <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
              <div className="h-2.5 rounded-full bg-blue-600" style={{ width: "45%" }}></div>
            </div>
          </div>
        </div>

        {/* static */}
        <div className="grid grid-cols-2 gap-2">
          <div className="grid grid-cols-1 gap-3 rounded-lg bg-white p-3">
            <div className="grid grid-cols-1 gap-1">
              <div className="w-fit rounded-md bg-blue-100 p-2 text-blue-700">
                <BsPersonArmsUp />
              </div>
              <p className="text-sm text-neutral-700">Jumlah aktivitas</p>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <p className="text-xl font-semibold">30</p>
                <p className="text-sm text-neutral-400">aktivitas</p>
              </div>
              <div className="cursor-pointer text-xl text-neutral-500 hover:text-neutral-700">
                <IoIosArrowDropright />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3 rounded-lg bg-white p-3">
            <div className="grid grid-cols-1 gap-1">
              <div className="w-fit rounded-md bg-blue-100 p-2 text-blue-700">
                <BsPersonArmsUp />
              </div>
              <p className="text-sm text-neutral-700">Jumlah aktivitas</p>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <p className="text-xl font-semibold">30</p>
                <p className="text-sm text-neutral-400">aktivitas</p>
              </div>
              <div className="cursor-pointer text-xl text-neutral-500 hover:text-neutral-700">
                <IoIosArrowDropright />
              </div>
            </div>
          </div>
        </div>

        {/* graph */}
        <div className="grid grid-cols-1 gap-6 rounded-lg bg-white p-4">
          <p className="font-bold text-neutral-700">Earnings History</p>
          <div className="grid grid-cols-3 gap-2">
            <button className="rounded-full border-2 bg-transparent p-2 text-sm text-neutral-700 hover:bg-blue-800">Default</button>
            <button className="rounded-full bg-blue-600 p-2 text-sm font-medium text-white hover:bg-blue-800">Default</button>
            <button className="rounded-full border-2 bg-transparent p-2 text-sm text-neutral-700 hover:bg-blue-800">Default</button>
          </div>
          <LineChart />
        </div>

        {/* upcoming event */}
        <div></div>
      </div>
    </div>
  );
};

export default HomeMember;
