"use client";

// next core
import { useEffect, useState } from "react";

// components
import Table from "./_component/Table";
import Navbar from "@/components/module/Navbar";
import Container from "@/components/base/Container";
import SkeletonLoader from "@/components/base/SkeletonLoader";
import CardHistoryActivity from "./_component/CardActivity";
import Achievement from "./_component/Achievement";

// data
import { navbarMenuMember } from "@/data/navbarMember";

// icons
import { PiEmptyBold } from "react-icons/pi";
import { LuSettings2 } from "react-icons/lu";

// hooks
import { useActivity } from "@/hooks/activity/useActivity";
import { IListActivityStudent } from "@/hooks/activity/types";

const HistoruyActivity = () => {
  const { listbyidstudent } = useActivity();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [listActivities, setListActivities] = useState<IListActivityStudent[]>([]);

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
        {/* **UPCOMING FEATURES** */}
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
                <p>Data kosong karena Anda belum mengikuti perlombaan apapun</p>
              </div>
            )}
          </div>
        )}

        {/* **UPCOMING FEATURES** */}
        {/* Achievement */}
        {/* <div className="mx-4 mt-3 overflow-x-auto rounded-xl bg-white p-1">
          <Achievement />
        </div> */}
      </Container>
    </div>
  );
};

export default HistoruyActivity;
