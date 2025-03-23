"use client";
import Container from "@/components/base/Container";
import Navbar from "@/components/module/Navbar";
import { navbarMenuMember } from "@/data/navbarMember";
import React, { useEffect, useState } from "react";
import { eventsDummy } from "./data";
import { useRouter } from "next/navigation";
import { useActivity } from "@/hooks/activity/useActivity";
import { IListActivity, IListActivityStudent } from "@/hooks/activity/types";
import { convertEpochToDateLong, convertEpochToDateShort } from "@/utils/convertEpochToDate";
import { StatusPayment } from "@/types/global";
import { PiEmptyBold } from "react-icons/pi";
import { usePayment } from "@/hooks/payment/usePayment";
import { IGetAllPayment } from "@/hooks/payment/type";
import SkeletonLoader from "@/components/base/SkeletonLoader";
import { formatCurrency } from "@/utils/formatCurrency";
import { FaLocationDot } from "react-icons/fa6";
import { FaCalendar } from "react-icons/fa";

const tabs = [
  { id: "all", label: "Semua" },
  { id: "invoice", label: "Pembayaran" },
  { id: "my-event", label: "Lombaku" },
];

const Event = () => {
  const router = useRouter();
  const { allbyuser } = usePayment();
  const { listbyidstudent } = useActivity();

  const [listActivity, setListActivity] = useState<IListActivityStudent[]>([]);
  const [listPayment, setListPayment] = useState<IGetAllPayment[]>([]);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(20);

  useEffect(() => {
    const fetchList = async () => {
      try {
        setIsLoading(true);
        const response: IListActivity = await listbyidstudent({ page, limit });
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

  useEffect(() => {
    if (activeTab === "invoice") {
      const fetchList = async () => {
        try {
          setIsLoading(true);
          const response: IGetAllPayment[] = await allbyuser();
          setListPayment(response);
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchList();
    }
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-base-gray">
      {/* nav */}
      <Navbar menu={navbarMenuMember} isScrolled={isScrolled} isLogged title="Event Lomba" />
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

          <div>
            {isLoading ? (
              <div className="mt-4 grid grid-cols-1 gap-3">
                <div className="round rounded-md bg-white p-4">
                  <SkeletonLoader rows={4} />
                </div>
                <div className="round rounded-md bg-white p-4">
                  <SkeletonLoader rows={4} />
                </div>
                <div className="round rounded-md bg-white p-4">
                  <SkeletonLoader rows={4} />
                </div>
              </div>
            ) : (
              <div>
                {/* Event List */}
                <div className="mt-4 space-y-4">
                  {eventsDummy
                    .filter((event) => event.category === activeTab || activeTab === "all")
                    .map((event) => (
                      <div key={event.id} className="flex rounded-lg bg-white p-4 shadow-md">
                        <div className={`mr-4 w-1 ${event.color} rounded-full`} />
                        <div className="flex flex-col space-y-2">
                          <div className="grid grid-cols-2 items-center">
                            <h3 className="text-lg font-semibold text-gray-800">{event.title}</h3>
                            {/* <a href={`/member/event/${event.id}`} className="text-right font-medium text-blue-600 hover:underline dark:text-blue-500">
                              Read more
                            </a> */}
                          </div>
                          <p className="text-sm text-gray-600">{event.description}</p>
                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <div>
                              <p className="font-semibold">{event.date}</p>
                              <p>{event.time}</p>
                            </div>
                            {event.status ? (
                              <button
                                className={`${event.color} rounded-lg px-4 py-2 text-sm text-white`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  router.push(`/member/event/create?seasonId=${event.seasonId}&region=${event.id}`);
                                }}
                              >
                                Ayo Daftar
                              </button>
                            ) : (
                              <button disabled className={`rounded-lg bg-gray-300 px-4 py-2 text-sm text-gray-500`}>
                                Ditutup
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>

                {/* my event list */}
                {activeTab === "my-event" && (
                  <div className="mt-4 space-y-4">
                    {listActivity && listActivity.length > 0 ? (
                      listActivity.map((event, index) => (
                        <div onClick={() => router.push(`/member/event/my-event/${event.id}`)} key={index} className="cursor-pointer rounded-xl bg-white p-6 shadow-md">
                          <div className="flex flex-col">
                            <h3 className="text-lg font-semibold text-gray-800">{event.competition.name}</h3>
                            <p className="text-sm text-gray-600">{event.competition.region.name}</p>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <FaLocationDot />
                              <p className="font-semibold">{event.competition.location}</p>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <FaCalendar />
                              <p className="font-semibold">{convertEpochToDateLong(event.competition.date)}</p>
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

                {/* invoice */}
                {activeTab === "invoice" && (
                  <div className="mt-4 space-y-4">
                    {listPayment && listPayment.length > 0 ? (
                      listPayment.map((payment, index) => (
                        <div onClick={() => router.push(`/member/event/invoice/${payment.id}`)} key={index} className="cursor-pointer rounded-xl bg-white p-6 shadow-md">
                          <h3 className="text-lg font-semibold text-gray-800">{payment.invoice}</h3>
                          <p className="text-sm text-gray-600">{convertEpochToDateLong(payment.date)}</p>
                          <div className="mt-2 flex items-center justify-between">
                            <p className="text-base font-semibold">{formatCurrency(payment.amount)}</p>
                            <span className={`me-2 rounded-full px-2.5 py-0.5 text-sm font-medium text-gray-500 ${payment.status === StatusPayment.COMPLETED ? "bg-green-100 text-green-800" : payment.status === StatusPayment.CONFIRMED ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}`}>{payment.status === StatusPayment.COMPLETED ? "Lunas" : payment.status === StatusPayment.CONFIRMED ? "Menunggu" : "Belum Bayar"}</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="flex flex-col items-center justify-center pt-6 text-gray-400">
                        <PiEmptyBold size={100} />
                        <p className="mt-2">Tidak ada Event Lomba Anda saat ini</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Event;
