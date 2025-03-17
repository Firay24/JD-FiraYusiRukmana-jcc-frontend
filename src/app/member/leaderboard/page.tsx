"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/module/Navbar";
import { navbarMenuMember } from "@/data/navbarMember";
import { MdFilterListAlt } from "react-icons/md";
import { useActivity } from "@/hooks/activity/useActivity";
import { IListParticipant } from "@/hooks/activity/types";
import { useEvent } from "@/hooks/event/useEvent";
import { useSubject } from "@/hooks/subject/useSubject";
import { PiEmptyBold } from "react-icons/pi";

type StageType = "TK" | "SD" | "SMP";

const Leaderboard = () => {
  const { participant } = useActivity();
  const { eventId } = useEvent();
  const { listSubject } = useSubject();
  const [listParticipant, setParticipant] = useState<IListParticipant>();
  const [isScrolled, setIsScrolled] = useState(false);
  const [jenjang, setJenjang] = useState<StageType>("TK");
  const [matpel, setMatpel] = useState("");
  const [level, setLevel] = useState("");
  const [subjectId, setSubjectId] = useState<string>("");
  const [isloading, setIsLoading] = useState<boolean>(false);

  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(20);

  const matpelOptions = {
    TK: ["Matematika", "IPA", "Bahasa Inggris"],
    SD: ["Matematika", "IPA", "IPS", "Bahasa Inggris"],
    SMP: ["Matematika", "IPA", "IPS", "Bahasa Inggris"],
  };

  const levelOptions = {
    TK: ["1"],
    SD: ["1", "2", "3", "4", "5", "6"],
    SMP: ["1", "2", "3"],
  };

  const handleSearch = async () => {
    try {
      setIsLoading(true);

      const response = await eventId({ stage: jenjang, level: level, subjectId: subjectId, region: 1 });
      const newIdCompetition = response.id;

      const participantResponse = await participant({ page, limit, idCompetition: newIdCompetition });
      setParticipant(participantResponse);
    } catch (error) {
      console.error("Error during handleSearch:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const fetchSubject = async () => {
      try {
        const response = await listSubject();
        const selectedSubjectId = response.find((subject) => subject.name === matpel.toLocaleLowerCase())?.id;
        setSubjectId(selectedSubjectId || "");
      } catch (error) {}
    };
    if (matpel) {
      fetchSubject();
    }
  }, [matpel]);

  useEffect(() => {
    if (jenjang && matpel && level) {
      handleSearch();
    }
  }, [page, limit]);

  return (
    <div className="min-h-screen bg-base-gray">
      {/* navbar */}
      <Navbar menu={navbarMenuMember} isScrolled={isScrolled} isLogged title="Leaderboard" />

      <div className="grid grid-cols-1 gap-4 px-4">
        {/* static */}
        {/* <div className="grid grid-cols-3 items-end justify-between gap-4 rounded-lg bg-base-purple p-4">
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
        </div> */}

        {/* table */}
        <div className="mb-6 grid grid-cols-1 gap-5 rounded-lg bg-white p-4">
          <div className="grid grid-cols-1 gap-4">
            <p className="text-md font-bold">Pilih Jenis Perlombaan</p>

            {/* Jenjang */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Jenjang</label>
              <select
                value={jenjang}
                onChange={(e) => {
                  setJenjang(e.target.value as StageType);
                  setMatpel("");
                  setLevel("");
                }}
                className="mt-1 w-full rounded-full border p-2 pl-4 focus:ring-2 focus:ring-blue-400"
              >
                <option value="TK">TK</option>
                <option value="SD">SD</option>
                <option value="SMP">SMP</option>
              </select>
            </div>

            {/* Mata Pelajaran */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Mata Pelajaran</label>
              <select value={matpel} onChange={(e) => setMatpel(e.target.value)} className="mt-1 w-full rounded-full border p-2 pl-4 focus:ring-2 focus:ring-blue-400">
                <option value="" disabled>
                  Pilih Mata Pelajaran
                </option>
                {matpelOptions[jenjang].map((mapel) => (
                  <option key={mapel} value={mapel}>
                    {mapel}
                  </option>
                ))}
              </select>
            </div>

            {/* Level */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Level</label>
              <select value={level} onChange={(e) => setLevel(e.target.value)} className="mt-1 w-full rounded-full border p-2 pl-4 focus:ring-2 focus:ring-blue-400">
                <option value="" disabled>
                  Pilih Level
                </option>
                {levelOptions[jenjang].map((lvl) => (
                  <option key={lvl} value={lvl}>
                    {jenjang === "TK" ? `TK ${lvl}` : `Kelas ${lvl}`}
                  </option>
                ))}
              </select>
            </div>

            {/* Button Search */}
            <button onClick={handleSearch} className="w-full rounded-full bg-blue-500 py-2 text-white transition hover:bg-blue-600" disabled={!matpel || !level}>
              Cari
            </button>
          </div>
          {/* search */}
          {/* <div className="flex items-center justify-between">
            <form className="max-w-md">
              <label htmlFor="default-search" className="sr-only mb-2 text-sm font-medium text-gray-900">
                Search
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
                  <svg className="h-4 w-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                  </svg>
                </div>
                <input type="search" id="default-search" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500" placeholder="Search Mockups, Logos..." required />
              </div>
            </form>
            <button type="button" className="inline-flex h-fit items-center rounded-full bg-gray-300 p-3 text-center text-base-purple hover:bg-blue-800 focus:outline-none focus:ring-4">
              <MdFilterListAlt />
            </button>
          </div> */}
          {/* button */}
          {/* <div className="grid grid-cols-3 gap-2">
            <button className="rounded-full border-2 bg-transparent p-2 text-sm text-neutral-700 hover:bg-blue-800">Default</button>
            <button className="rounded-full bg-blue-600 p-2 text-sm font-medium text-white hover:bg-blue-800">Default</button>
            <button className="rounded-full border-2 bg-transparent p-2 text-sm text-neutral-700 hover:bg-blue-800">Default</button>
          </div> */}
          <div className="mt-4">
            <div className="relative overflow-x-auto sm:rounded-lg">
              {listParticipant && listParticipant.data.length > 0 ? (
                <div>
                  <p>{`Jumlah peserta: ${listParticipant.totalItems}`}</p>
                  <table className="mt-2 w-full text-left text-sm text-gray-500 rtl:text-right">
                    <thead className="bg-gray-50 text-xs uppercase text-gray-700">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          No
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Nama
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Nilai
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Asal Sekolah
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {listParticipant &&
                        listParticipant.data.map((participant, index) => (
                          <tr key={index} className="border-b odd:bg-white even:bg-gray-50">
                            <td className="px-6 py-4">{index + 1}</td>
                            <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                              {participant.name}
                            </th>
                            <td className="px-6 py-4">{participant.score}</td>
                            <td className="px-6 py-4">{participant.school}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                  <div className="mt-3 flex w-full flex-col items-center justify-center gap-2">
                    <div className="flex items-center gap-8">
                      <button onClick={() => listParticipant?.page && setPage(listParticipant.page - 1)} disabled={listParticipant?.page === 1} className="border-slate-300 text-slate-600 hover:bg-slate-800 hover:border-slate-800 focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:bg-slate-800 rounded-md border p-2.5 text-center text-sm shadow-sm transition-all hover:text-white hover:shadow-lg focus:text-white active:text-white disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                          <path fillRule="evenodd" d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
                        </svg>
                      </button>

                      <p className="text-slate-600">
                        Page <strong className="text-slate-800">{listParticipant?.page}</strong> of&nbsp;<strong className="text-slate-800">{listParticipant?.totalPages}</strong>
                      </p>

                      <button onClick={() => listParticipant?.page && setPage(listParticipant.page + 1)} disabled={listParticipant?.page === listParticipant?.totalPages} className="border-slate-300 text-slate-600 hover:bg-slate-800 hover:border-slate-800 focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:bg-slate-800 rounded-md border p-2.5 text-center text-sm shadow-sm transition-all hover:text-white hover:shadow-lg focus:text-white active:text-white disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                          <path fillRule="evenodd" d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                    <div>
                      <label htmlFor="limit" className="mr-2 text-sm font-medium text-gray-700">
                        Limit
                      </label>
                      <select
                        id="limit"
                        value={limit}
                        onChange={(e) => {
                          setLimit(Number(e.target.value));
                          setPage(1);
                        }}
                        className="rounded-full border border-gray-300 p-1 pl-4"
                      >
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                        <option value={70}>70</option>
                      </select>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex min-h-60 flex-col items-center justify-center text-center text-gray-400">
                  <p className="text-center text-6xl">
                    <PiEmptyBold />
                  </p>
                  <p>tidak ada data</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
