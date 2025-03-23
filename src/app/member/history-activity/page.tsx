"use client";

import Navbar from "@/components/module/Navbar";
import { navbarMenuMember } from "@/data/navbarMember";
import { useEffect, useState } from "react";
import { LuSettings2 } from "react-icons/lu";
import CardHistoryActivity from "./_component/CardActivity";
import Table from "./_component/Table";
import Achievement from "./_component/Achievement";
import Container from "@/components/base/Container";
import { useActivity } from "@/hooks/activity/useActivity";
import { IListActivityStudent } from "@/hooks/activity/types";
import SkeletonLoader from "@/components/base/SkeletonLoader";
import { PiEmptyBold } from "react-icons/pi";

const HistoruyActivity = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { listbyidstudent } = useActivity();
  const [listActivities, setListActivities] = useState<IListActivityStudent[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        setIsLoading(true);
        const response = await listbyidstudent({ page: 1, limit: 10 });
        if (response) {
          setListActivities(response.data);
        }
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    fetchActivity();

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
      <Navbar menu={navbarMenuMember} isScrolled={isScrolled} isLogged title="Riwayat Perlombaan" />
      <Container>
        {/* header */}
        {/* <div className="flex flex-col gap-5 px-4">
          <div className="flex flex-row items-center justify-between">
            <p className="flex-1 font-bold">All Activity</p>
            <LuSettings2 className="ml-auto" />
          </div>
        </div> */}

        {/* Card */}
        {/* <div className="mt-3 flex flex-row gap-2 px-4">
          {[1, 2, 3, 4].map((_, i) => {
            const bgColors = ["bg-base-purple", "bg-base-pink", "bg-base-yellow", "bg-base-green"];
            return (
              <div key={i} className="w-full">
                <CardHistoryActivity title="Total Activity" count={10} bgColor={bgColors[i % bgColors.length]} />
              </div>
            );
          })}
        </div> */}

        {/* Table */}
        {isLoading ? (
          <div className="m-4 rounded-lg bg-white p-4">
            <SkeletonLoader rows={5} />
          </div>
        ) : (
          <div className="mx-4 mt-3 overflow-x-auto rounded-xl bg-white p-1">
            {listActivities && listActivities.length > 0 ? (
              <Table listActivities={listActivities} />
            ) : (
              <div className="flex flex-col items-center gap-4 p-4 text-center">
                <p className="text-6xl text-gray-200">
                  <PiEmptyBold />
                </p>
                <p>Data kosong karena Anda belum mengikuti perlombaan apapaun</p>
              </div>
            )}
          </div>
        )}
        {/* Achievement */}
        {/* <div className="mx-4 mt-3 overflow-x-auto rounded-xl bg-white p-1">
          <Achievement />
        </div> */}
      </Container>
    </div>
  );
};

export default HistoruyActivity;
