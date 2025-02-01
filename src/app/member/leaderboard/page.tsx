"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/module/Navbar";
import { navbarMenuMember } from "@/data/navbarMember";
import { MdFilterListAlt } from "react-icons/md";

const Leaderboard = () => {
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
      {/* navbar */}
      <Navbar menu={navbarMenuMember} isScrolled={isScrolled} isLogged title="Leaderboard" />

      <div className="grid grid-cols-1 gap-4 px-4">
        {/* static */}
        <div className="grid grid-cols-3 items-end justify-between gap-4 rounded-lg bg-base-purple p-4">
          <div className="text-center text-white">
            <p className="text-xl font-semibold">2</p>
            <p className="text-xs">subject</p>
          </div>
          <div className="text-center text-white">
            <p className="text-2xl font-bold text-base-yellow">175</p>
            <p className="text-xs">dari 200</p>
          </div>
          <div className="text-center text-white">
            <p className="text-xl font-semibold">50</p>
            <p className="text-xs">jumlah poin</p>
          </div>
        </div>

        {/* table */}
        <div className="grid grid-cols-1 gap-5 rounded-lg bg-white p-4">
          <div className="flex items-center justify-between">
            <form className="max-w-md">
              <label htmlFor="default-search" className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Search
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
                  <svg className="h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                  </svg>
                </div>
                <input type="search" id="default-search" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500" placeholder="Search Mockups, Logos..." required />
              </div>
            </form>
            <button type="button" className="inline-flex h-fit items-center rounded-full bg-gray-300 p-3 text-center text-base-purple hover:bg-blue-800 focus:outline-none focus:ring-4">
              <MdFilterListAlt />
            </button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <button className="rounded-full border-2 bg-transparent p-2 text-sm text-neutral-700 hover:bg-blue-800">Default</button>
            <button className="rounded-full bg-blue-600 p-2 text-sm font-medium text-white hover:bg-blue-800">Default</button>
            <button className="rounded-full border-2 bg-transparent p-2 text-sm text-neutral-700 hover:bg-blue-800">Default</button>
          </div>
          <div className="">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right">
                <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Score
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Regional
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 odd:dark:bg-gray-900 even:dark:bg-gray-800">
                    <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
                      Fira Yusi
                    </th>
                    <td className="px-6 py-4">80</td>
                    <td className="px-6 py-4">1</td>
                  </tr>
                  <tr className="border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 odd:dark:bg-gray-900 even:dark:bg-gray-800">
                    <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
                      Fira Yusi
                    </th>
                    <td className="px-6 py-4">80</td>
                    <td className="px-6 py-4">1</td>
                  </tr>
                  <tr className="border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 odd:dark:bg-gray-900 even:dark:bg-gray-800">
                    <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
                      Fira Yusi
                    </th>
                    <td className="px-6 py-4">80</td>
                    <td className="px-6 py-4">1</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
