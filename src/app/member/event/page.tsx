"use client";
import Container from "@/components/base/Container";
import Navbar from "@/components/module/Navbar";
import { navbarMenuMember } from "@/data/navbarMember";
import React, { useEffect, useState } from "react";
import { eventsDummy } from "./data";
import { useRouter } from "next/navigation";
import { useActivity } from "@/hooks/activity/useActivity";
import { IListActivity, IListActivityStudent } from "@/hooks/activity/types";
import { convertEpochToDateShort } from "@/utils/convertEpochToDate";
import { StatusPayment } from "@/types/global";
import { PiEmptyBold } from "react-icons/pi";

const tabs = [
  { id: "all", label: "All" },
  // { id: "invoice", label: "Invoice" },
  { id: "my-event", label: "My Event" },
];

const Event = () => {
  const { listbyidstudent } = useActivity();
  const [activeTab, setActiveTab] = useState<string>("all");
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(20);
  const [listActivity, setListActivity] = useState<IListActivityStudent[]>([]);

  // Hooks
  const router = useRouter();

  useEffect(() => {
    const fetchList = async () => {
      try {
        const response: IListActivity = await listbyidstudent({ page, limit });
        setIsLoading(true);
        setListActivity(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    fetchList();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-base-gray">
      {/* nav */}
      <Navbar menu={navbarMenuMember} isScrolled={isScrolled} isLogged title="Events" />
      <Container>
        <div className="p-4">
          {/* Tabs */}
          <div className="flex space-x-2 rounded-lg bg-gray-100 p-1">
            {tabs.map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`md: w-full rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300 focus:outline-none sm:w-max ${activeTab === tab.id ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-200"}`}>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Event List */}
          <div className="mt-4 space-y-4">
            {eventsDummy
              .filter((event) => event.status === true)
              .filter((event) => event.category === activeTab || activeTab === "all")
              .map((event) => {
                const isRegistered = listActivity.some((activity) => activity.competition.season === event.id.toString());
                return (
                  <div key={event.id} className="flex rounded-lg bg-white p-4 shadow-md">
                    <div className={`mr-4 w-1 ${event.color} rounded-full`} />
                    <div className="flex flex-col space-y-2">
                      <div className="grid grid-cols-2 items-center">
                        <h3 className="text-lg font-semibold text-gray-800">{event.title}</h3>
                        <a href={`/member/event/${event.id}`} className="text-right font-medium text-blue-600 hover:underline dark:text-blue-500">
                          Read more
                        </a>
                      </div>
                      <p className="text-sm text-gray-600">{event.description}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div>
                          <p className="font-semibold">{event.date}</p>
                          <p>{event.time}</p>
                        </div>
                        {!isRegistered ? (
                          <button
                            className={`${event.color} rounded-lg px-4 py-2 text-sm text-white`}
                            onClick={(e) => {
                              e.stopPropagation();
                              router.push("/member/event/create");
                            }}
                          >
                            Daftar
                          </button>
                        ) : (
                          <button disabled className={`rounded-lg bg-gray-300 px-4 py-2 text-sm text-gray-500`}>
                            Sudah Terdaftar
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>

          {/* my event list */}
          {activeTab === "my-event" && (
            <div className="mt-4 space-y-4">
              {listActivity && listActivity.length > 0 ? (
                listActivity.map((event, index) => (
                  <div onClick={() => router.push(`/member/event/invoice/${event.id}`)} key={index} className="cursor-pointer rounded-xl bg-white p-6 shadow-md">
                    <div className="flex flex-col">
                      <h3 className="text-lg font-semibold text-gray-800">{event.competition.name}</h3>
                      <p className="text-sm text-gray-600">{event.competition.region.name}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <p className="font-semibold">{convertEpochToDateShort({ epoch: event.competition.date, showtime: true })}</p>
                        <span className={`me-2 rounded-full px-2.5 py-0.5 text-xs font-medium ${event.statusPayment === StatusPayment.COMPLETED ? "bg-green-100 text-green-800" : event.statusPayment === StatusPayment.CONFIRMED ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}`}>{event.statusPayment === StatusPayment.COMPLETED ? "Lunas" : event.statusPayment === StatusPayment.CONFIRMED ? "Menunggu" : "Belum Bayar"}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center pt-6 text-gray-400">
                  <PiEmptyBold size={100} />
                  <p className="mt-2">Tidak ada Event Anda saat ini</p>
                </div>
              )}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Event;
