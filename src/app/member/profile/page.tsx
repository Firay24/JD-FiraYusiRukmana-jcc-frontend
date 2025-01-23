"use client";
import Navbar from "@/components/module/Navbar";
import { navbarMenuMember } from "@/data/navbarMember";
import React, { useEffect, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { MdHomeFilled, MdOutlineFamilyRestroom } from "react-icons/md";
import { PiStudentFill } from "react-icons/pi";
import { BsCalendar2DateFill } from "react-icons/bs";
import { CgGenderFemale } from "react-icons/cg";
import { FaPhone } from "react-icons/fa";

const Profile = () => {
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
      <Navbar menu={navbarMenuMember} isScrolled={isScrolled} isLogged title="Profile" />

      {/* main */}
      <div className="grid grid-cols-1 gap-4 px-4">
        {/* header */}
        <div className="bg-base-green rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div>
                <img className="h-10 w-10 rounded-full object-cover object-center" src="/img/profileImg.jpeg" alt="avatar" />
              </div>
              <div>
                <p className="text-lg font-bold text-white">Hello Andre</p>
                <p className="text-sm text-green-800">Level Cibi</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="mr-2 text-center text-white">
                <p className="text-lg font-bold">50</p>
                <p className="text-sm">poin</p>
              </div>
              <button type="button" className="text-base-green inline-flex h-fit items-center rounded-full bg-white p-3 text-center">
                <AiFillEdit />
              </button>
            </div>
          </div>
        </div>

        {/* main */}
        <div className="rounded-lg bg-white p-4">
          <p className="mb-4 font-semibold text-neutral-700">Biodata</p>
          <div className="grid grid-cols-1 gap-5">
            <div className="flex items-center gap-3">
              <div className="h-fit w-fit rounded-full bg-teal-100 p-3 text-lg text-teal-500">
                <BsCalendar2DateFill />
              </div>
              <div>
                <p className="text-sm italic text-gray-400">tanggal lahir</p>
                <p className="font-medium text-neutral-700">Banyuwangi, 9 Desember 2006</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-fit w-fit rounded-full bg-teal-100 p-3 text-lg text-teal-500">
                <PiStudentFill />
              </div>
              <div>
                <p className="text-sm italic text-gray-400">asal sekolah</p>
                <p className="font-medium text-neutral-700">SMAN 1 Genteng, kelas 11</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-fit w-fit rounded-full bg-teal-100 p-3 text-lg text-teal-500">
                <MdHomeFilled />
              </div>
              <div>
                <p className="text-sm italic text-gray-400">alamat</p>
                <p className="font-medium text-neutral-700">Genteng Gang Garuda No 2</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-fit w-fit rounded-full bg-teal-100 p-3 text-lg text-teal-500">
                <CgGenderFemale />
              </div>
              <div>
                <p className="text-sm italic text-gray-400">jenis kelamin</p>
                <p className="font-medium text-neutral-700">Perempuan</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-fit w-fit rounded-full bg-teal-100 p-3 text-lg text-teal-500">
                <FaPhone />
              </div>
              <div>
                <p className="text-sm italic text-gray-400">nomer hp</p>
                <p className="font-medium text-neutral-700">085231796284</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-fit w-fit rounded-full bg-teal-100 p-3 text-lg text-teal-500">
                <MdOutlineFamilyRestroom />
              </div>
              <div>
                <p className="text-sm italic text-gray-400">orang tua</p>
                <p className="font-medium text-neutral-700">Pak John, Bu Wati</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
