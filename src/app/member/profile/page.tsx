"use client";
import Navbar from "@/components/module/Navbar";
import { navbarMenuMember } from "@/data/navbarMember";
import React, { useEffect, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { MdHomeFilled, MdOutlineFamilyRestroom } from "react-icons/md";
import { PiStudentFill } from "react-icons/pi";
import { BsCalendar2DateFill } from "react-icons/bs";
import { CgGenderFemale } from "react-icons/cg";
import { FaBook, FaPhone, FaRegUser, FaRunning } from "react-icons/fa";
import { GiMusicalNotes } from "react-icons/gi";
import Container from "@/components/base/Container";
import { useRouter } from "next/navigation";
import { useStudent } from "@/hooks/student/useStudent";
import { IStudentInfo, LevelInfo } from "@/hooks/student/type";
import SkeletonLoader from "@/components/base/SkeletonLoader";
import { getLevelInfo } from "@/utils/getInfoLevel";
import { FaIdCardClip } from "react-icons/fa6";

const Profile = () => {
  // States
  const [isScrolled, setIsScrolled] = useState(false);
  const [dataProfile, setDataProfile] = useState<IStudentInfo>();
  const [isLoading, setIsLoading] = useState(false);
  // const [levelInfo, setLevelInfo] = useState<LevelInfo>();

  // Hooks
  const router = useRouter();
  const { profile } = useStudent();

  // UseEffect
  // Mengambil data profile saat pertama kali render
  useEffect(() => {
    const handleGetStudentProfile = async () => {
      setIsLoading(true);
      try {
        const res = await profile();
        setDataProfile(res);
      } catch (error) {
        setIsLoading(false);
        console.error("Failed to fetch profile:", error);
      } finally {
        setIsLoading(false);
      }
    };
    handleGetStudentProfile();

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // useEffect(() => {
  //   if (dataProfile) {
  //     setLevelInfo(getLevelInfo(dataProfile.poin));
  //   }
  // }, [dataProfile]);

  return (
    <div className="min-h-screen bg-base-gray">
      {/* nav */}
      <Navbar menu={navbarMenuMember} isScrolled={isScrolled} isLogged title="Profile" />
      <Container>
        {/* main */}
        <div className="grid grid-cols-1 gap-4 px-4">
          {/* header */}
          {isLoading ? (
            <SkeletonLoader rows={4} />
          ) : (
            <div className="rounded-lg bg-base-green p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div>
                    <img className="h-10 w-10 rounded-full object-cover object-center" src="/img/profileImg.jpeg" alt="avatar" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-white">{`Hello ${dataProfile?.name}`}</p>
                    <p className="text-sm text-green-800">{dataProfile?.username}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {/* <div className="mr-2 text-center text-white">
                    <p className="text-lg font-bold">{dataProfile?.poin}</p>
                    <p className="text-sm">poin</p>
                  </div> */}
                  <button
                    type="button"
                    onClick={() => {
                      router.push("/member/profile/edit");
                    }}
                    className="inline-flex h-fit items-center rounded-full bg-white p-3 text-center text-base-green"
                  >
                    <AiFillEdit />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* main */}
          {isLoading ? (
            <SkeletonLoader rows={4} />
          ) : (
            <div className="rounded-lg bg-white p-4">
              {/* biodata */}
              <div>
                <p className="mb-4 font-semibold text-neutral-700">Biodata</p>
                <div className="grid grid-cols-1 gap-5 ps-5">
                  <div className="flex items-center gap-3">
                    <div className="h-fit w-fit rounded-full bg-teal-100 p-3 text-lg text-teal-500">
                      <FaRegUser />
                    </div>
                    <div>
                      <p className="text-sm italic text-gray-400">nama</p>
                      <p className="font-medium text-neutral-700">{dataProfile?.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-fit w-fit rounded-full bg-teal-100 p-3 text-lg text-teal-500">
                      <FaIdCardClip />
                    </div>
                    <div>
                      <p className="text-sm italic text-gray-400">nik</p>
                      <p className="font-medium text-neutral-700">{dataProfile?.nik}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-fit w-fit rounded-full bg-teal-100 p-3 text-lg text-teal-500">
                      <BsCalendar2DateFill />
                    </div>
                    <div>
                      <p className="text-sm italic text-gray-400">tanggal lahir</p>
                      <p className="font-medium text-neutral-700">{dataProfile?.birthdate ? new Date(Number(dataProfile.birthdate) * 1000).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) : ""}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-fit w-fit rounded-full bg-teal-100 p-3 text-lg text-teal-500">
                      <PiStudentFill />
                    </div>
                    <div>
                      <p className="text-sm italic text-gray-400">asal sekolah</p>
                      <p className="font-medium text-neutral-700">{dataProfile?.school}</p>
                    </div>
                  </div>
                  {/* <div className="flex items-center gap-3">
                    <div className="h-fit w-fit rounded-full bg-teal-100 p-3 text-lg text-teal-500">
                      <MdHomeFilled />
                    </div>
                    <div>
                      <p className="text-sm italic text-gray-400">alamat</p>
                      <p className="font-medium text-neutral-700">{dataProfile?.address}</p>
                    </div>
                  </div> */}
                  <div className="flex items-center gap-3">
                    <div className="h-fit w-fit rounded-full bg-teal-100 p-3 text-lg text-teal-500">
                      <CgGenderFemale />
                    </div>
                    <div>
                      <p className="text-sm italic text-gray-400">jenis kelamin</p>
                      <p className="font-medium text-neutral-700">{dataProfile?.gender ? "Laki-laki" : "Perempuan"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-fit w-fit rounded-full bg-teal-100 p-3 text-lg text-teal-500">
                      <FaPhone />
                    </div>
                    <div>
                      <p className="text-sm italic text-gray-400">nomer hp</p>
                      <p className="font-medium text-neutral-700">{dataProfile?.phoneNumber}</p>
                    </div>
                  </div>
                  {/* <div className="flex items-center gap-3">
                    <div className="h-fit w-fit rounded-full bg-teal-100 p-3 text-lg text-teal-500">
                      <MdOutlineFamilyRestroom />
                    </div>
                    <div>
                      <p className="text-sm italic text-gray-400">orang tua</p>
                      <p className="font-medium text-neutral-700">{`Pak ${dataProfile?.fatherName}, Bu ${dataProfile?.motherName}`}</p>
                    </div>
                  </div> */}
                </div>
              </div>
              {/* minat bakat */}
              {/* <div className="mt-10">
              <p className="mb-4 font-semibold text-neutral-700">Minat & Bakat</p>
              <div className="grid grid-cols-1 gap-5 ps-5">
                <div className="flex items-center gap-3">
                  <div className="h-fit w-fit rounded-full bg-teal-100 p-3 text-lg text-teal-500">
                    <GiMusicalNotes />
                  </div>
                  <div>
                    <p className="text-sm italic text-gray-400">Minat</p>
                    <p className="font-medium text-neutral-700">Musik, Seni Lukis</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-fit w-fit rounded-full bg-teal-100 p-3 text-lg text-teal-500">
                    <FaRunning />
                  </div>
                  <div>
                    <p className="text-sm italic text-gray-400">Bakat</p>
                    <p className="font-medium text-neutral-700">Lari Jarak Pendek, Menulis</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-fit w-fit rounded-full bg-teal-100 p-3 text-lg text-teal-500">
                    <MdOutlineSportsSoccer />
                  </div>
                  <div>
                    <p className="text-sm italic text-gray-400">Prestasi</p>
                    <p className="font-medium text-neutral-700">Juara 2 Lomba Lari 100m Tingkat Kabupaten</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-fit w-fit rounded-full bg-teal-100 p-3 text-lg text-teal-500">
                    <FaBook />
                  </div>
                  <div>
                    <p className="text-sm italic text-gray-400">Hobi</p>
                    <p className="font-medium text-neutral-700">Membaca Novel, Menggambar</p>
                  </div>
                </div>
              </div>
            </div> */}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Profile;
