"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/module/Navbar";
import { navbarMenuMember } from "@/data/navbarMember";
import { BsPersonArmsUp } from "react-icons/bs";
import { IoIosArrowDropright } from "react-icons/io";
import dynamic from "next/dynamic";
import { useStudent } from "@/hooks/student/useStudent";
import { LevelInfo, PrfoileResponse } from "@/types/student";
import { useModalStore } from "@/state/modalState";
import { IoClose } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { PiStudentFill } from "react-icons/pi";
import getFirstName from "@/utils/getFirstName";
import { getLevelInfo } from "@/utils/getInfoLevel";
import SkeletonLoader from "@/components/base/SkeletonLoader";
import { MdOutlineQueryStats } from "react-icons/md";

const LineChart = dynamic(() => import("../../components/module/Linechart"), { ssr: false });

const HomeMember = () => {
  const { profile } = useStudent();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [studentProfile, setStudentProfile] = useState<PrfoileResponse>();
  const { isModalOpen, openModal, closeModal } = useModalStore();
  const [levelInfo, setLevelInfo] = useState<LevelInfo>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);

    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        const data = await profile();
        setStudentProfile(data);
      } catch (error) {
        openModal();
        console.error("Failed to load profile:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (studentProfile) {
      setLevelInfo(getLevelInfo(studentProfile?.poin));
    }
  }, [studentProfile]);

  return (
    <>
      <div className="min-h-screen bg-base-gray">
        {/* nav */}
        <Navbar isScrolled={isScrolled} menu={navbarMenuMember} isLogged logoPath="/only-logo.png" />

        <div className="grid grid-cols-1 gap-4 px-4">
          {/* header */}
          {isLoading ? (
            <div className="rounded-lg bg-white p-4">
              <SkeletonLoader rows={4} />
            </div>
          ) : (
            <div className="rounded-lg bg-white p-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div>
                    <img className="h-auto w-12 rounded-full" src="/img/profileImg.jpeg" alt="avatar" />
                  </div>
                  <div>
                    <p className="text-lg font-bold">{`Hello ${studentProfile?.nama ? getFirstName(studentProfile?.nama) : ""}`}</p>
                    <p className="text-sm text-gray-400">{`Level ${levelInfo?.level}`}</p>
                  </div>
                </div>
                <div className="mr-2">
                  <p className="text-right text-lg font-bold">{`${levelInfo?.progressPercentage}%`}</p>
                  <p className="text-right text-sm text-gray-400">{`${levelInfo?.currentPoints}/${levelInfo?.maxPoints} poin`}</p>
                </div>
              </div>
              <div className="px-3 py-2">
                <div className="h-2.5 w-full rounded-full bg-gray-200">
                  <div className="h-2.5 rounded-full bg-blue-600" style={{ width: `${levelInfo?.progressPercentage}%` }}></div>
                </div>
              </div>
            </div>
          )}

          {/* static */}
          <div className="grid grid-cols-2 gap-2">
            {isLoading ? (
              <div className="rounded-lg bg-white p-4">
                <SkeletonLoader rows={4} />
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3 rounded-lg bg-white p-3">
                <div className="grid grid-cols-1 gap-1">
                  <div className="w-fit rounded-md bg-blue-100 p-2 text-blue-700">
                    <BsPersonArmsUp />
                  </div>
                  <p className="text-sm text-neutral-700">Jumlah aktivitas</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <p className="text-xl font-semibold">{studentProfile?.totalActivity}</p>
                    <p className="text-sm text-neutral-400">aktivitas</p>
                  </div>
                  <div className="cursor-pointer text-xl text-neutral-500 hover:text-neutral-700">
                    <IoIosArrowDropright />
                  </div>
                </div>
              </div>
            )}
            {isLoading ? (
              <div className="rounded-lg bg-white p-4">
                <SkeletonLoader rows={4} />
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3 rounded-lg bg-white p-3">
                <div className="grid grid-cols-1 gap-1">
                  <div className="w-fit rounded-md bg-blue-100 p-2 text-blue-700">
                    <MdOutlineQueryStats />
                  </div>
                  <p className="text-sm text-neutral-700">Rata-rata Nilai</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <p className="text-xl font-semibold">{studentProfile?.avarageScore}</p>
                    <p className="text-sm text-neutral-400">nilai</p>
                  </div>
                  <div className="cursor-pointer text-xl text-neutral-500 hover:text-neutral-700">
                    <IoIosArrowDropright />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* graph */}
          {isLoading ? null : (
            <div className="grid grid-cols-1 gap-6 rounded-lg bg-white p-4">
              <p className="font-bold text-neutral-700">Earnings History</p>
              <div className="grid grid-cols-3 gap-2">
                <button className="rounded-full border-2 bg-transparent p-2 text-sm text-neutral-700 hover:bg-blue-800">Default</button>
                <button className="rounded-full bg-blue-600 p-2 text-sm font-medium text-white hover:bg-blue-800">Default</button>
                <button className="rounded-full border-2 bg-transparent p-2 text-sm text-neutral-700 hover:bg-blue-800">Default</button>
              </div>
              <LineChart />
            </div>
          )}

          {/* upcoming event */}
          {isLoading ? null : (
            <div className="rounded-lg bg-white p-4">
              <div className="flex justify-between">
                <p className="font-bold text-neutral-700">Upcoming Events</p>

                <a href="#" className="font-medium text-blue-600 hover:underline dark:text-blue-500">
                  Read more
                </a>
              </div>
              <div className="mt-3 grid grid-cols-1 gap-4">
                <div className="flex pl-0">
                  <hr className="mr-2 h-full w-1 rounded border-0 bg-green-500 dark:bg-gray-700 md:my-10" />
                  <div className="grid grid-cols-1 gap-1 p-3">
                    <p className="font-semibold text-neutral-700">JCC S1 - SD/Mi sederajat</p>
                    <p className="text-xs text-gray-600">23 Feb 2025</p>
                  </div>
                </div>
                <div className="flex pl-0">
                  <hr className="mr-2 h-full w-1 rounded border-0 bg-red-500 dark:bg-gray-700 md:my-10" />
                  <div className="grid grid-cols-1 gap-1 p-3">
                    <p className="font-semibold text-neutral-700">JCC S1 - SD/Mi sederajat</p>
                    <p className="text-xs text-gray-600">23 Feb 2025</p>
                  </div>
                </div>
                <div className="flex pl-0">
                  <hr className="mr-2 h-full w-1 rounded border-0 bg-yellow-300 dark:bg-gray-700 md:my-10" />
                  <div className="grid grid-cols-1 gap-1 p-3">
                    <p className="font-semibold text-neutral-700">JCC S1 - SD/Mi sederajat</p>
                    <p className="text-xs text-gray-600">23 Feb 2025</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-full max-w-2xl p-4">
            <div className="relative rounded-lg bg-white shadow-lg">
              <div className="flex items-center justify-between rounded-t border-b border-gray-200 p-4 md:p-5">
                <h3 className="text-xl font-semibold text-gray-900">Pemberitahuan</h3>
                <button onClick={closeModal} className="ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900">
                  <IoClose size={18} />
                </button>
              </div>
              <div className="grid grid-cols-1 space-y-4 p-4 text-center md:p-5">
                <div className="flex justify-center text-8xl text-gray-700">
                  <PiStudentFill />
                </div>

                <p>Mari lengkapi dulu data profil Anda saat ini</p>
              </div>
              <div className="flex items-center justify-center gap-3 rounded-b border-t border-gray-200 p-4 md:p-5">
                <button
                  onClick={() => {
                    closeModal();
                    router.push("/member/profile/create");
                  }}
                  className="rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-800"
                >
                  Lengkapi Profile Disini
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HomeMember;
