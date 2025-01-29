"use client";

import Navbar from "@/components/module/Navbar";
import { navbarMenuMember } from "@/data/navbarMember";
import { useEffect, useState } from "react";
import { LuSettings2 } from "react-icons/lu";
import CardHistoryActivity from "./_component/CardActivity";
import Table from "./_component/Table";
import Achievement from "./_component/Achievement";
import Container from "@/components/base/Container";

const HistoruyActivity = () => {
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
      <Navbar menu={navbarMenuMember} isScrolled={isScrolled} isLogged title="History Activity" />
      <Container>
        <div className="flex flex-col gap-5 px-4">
          {/* header */}
          <div className="flex flex-row items-center justify-between">
            <p className="flex-1 font-bold">All Activity</p>
            <LuSettings2 className="ml-auto" />
          </div>
        </div>

        {/* Card */}
        <div className="mt-3 flex flex-row gap-2 px-4">
          {[1, 2, 3, 4].map((_, i) => {
            const bgColors = ["bg-base-purple", "bg-base-pink", "bg-base-yellow", "bg-base-green"];
            return (
              <div key={i} className="w-full">
                <CardHistoryActivity title="Total Activity" count={10} bgColor={bgColors[i % bgColors.length]} />
              </div>
            );
          })}
        </div>

        {/* Table */}
        <div className="mx-4 mt-3 overflow-x-auto rounded-xl bg-white p-1">
          <Table />
        </div>

        {/* Achievement */}
        <div className="mx-4 mt-3 overflow-x-auto rounded-xl bg-white p-1">
          <Achievement />
        </div>
      </Container>
    </div>
  );
};

export default HistoruyActivity;
