"use client";
import Navbar from "@/components/module/Navbar";
import { navbarMenuMember } from "@/data/navbarMember";
import React, { useEffect, useState } from "react";

const Event = () => {
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
      <Navbar menu={navbarMenuMember} isScrolled={isScrolled} isLogged title="Events" />

      {/* event */}
      <div className="grid grid-cols-1 gap-4 px-4">
        <div className="flex rounded-lg bg-white p-4">
          <hr className="mr-4 h-full w-2 rounded border-0 bg-green-500 md:my-10" />
          <div className="grid grid-cols-1 gap-3">
            <div>
              <p className="text-xl font-semibold text-neutral-700">JCC S1 - SD/Mi sederajat</p>
              <p className="text-sm text-neutral-600">Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
            </div>
            <div className="flex justify-between">
              <div className="grid grid-cols-1 text-xs text-gray-600">
                <p className="text-sm font-semibold">23 Feb 2024</p>
                <p>09.00 - 10.00 PM</p>
              </div>
              <button className="rounded-lg bg-green-500 px-6 text-sm text-white">Daftar</button>
            </div>
          </div>
        </div>
        <div className="flex rounded-lg bg-white p-4">
          <hr className="mr-4 h-full w-2 rounded border-0 bg-base-yellow md:my-10" />
          <div className="grid grid-cols-1 gap-3">
            <div>
              <p className="text-xl font-semibold text-neutral-700">JCC S1 - SD/Mi sederajat</p>
              <p className="text-sm text-neutral-600">Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
            </div>
            <div className="flex justify-between">
              <div className="grid grid-cols-1 text-xs text-gray-600">
                <p className="text-sm font-semibold">23 Feb 2024</p>
                <p>09.00 - 10.00 PM</p>
              </div>
              <button className="rounded-lg bg-base-yellow px-6 text-sm text-white">Daftar</button>
            </div>
          </div>
        </div>
        <div className="flex rounded-lg bg-white p-4">
          <hr className="mr-4 h-full w-2 rounded border-0 bg-base-pink md:my-10" />
          <div className="grid grid-cols-1 gap-3">
            <div>
              <p className="text-xl font-semibold text-neutral-700">JCC S1 - SD/Mi sederajat</p>
              <p className="text-sm text-neutral-600">Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
            </div>
            <div className="flex justify-between">
              <div className="grid grid-cols-1 text-xs text-gray-600">
                <p className="text-sm font-semibold">23 Feb 2024</p>
                <p>09.00 - 10.00 PM</p>
              </div>
              <button className="rounded-lg bg-base-pink px-6 text-sm text-white">Daftar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Event;
