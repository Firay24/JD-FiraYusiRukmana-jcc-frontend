"use client";
import { IListAllParticipant } from "@/hooks/activity/types";
import { useActivity } from "@/hooks/activity/useActivity";
import { useRegional } from "@/hooks/regional/useRegional";
import { SubjectResponse, useSubject } from "@/hooks/subject/useSubject";
import { IRegional } from "@/types/global";
import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";

const Participants = () => {
  const { listRegional } = useRegional();
  const { listSubject } = useSubject();
  const { listAll } = useActivity();

  const [regional, setRegional] = useState<IRegional[]>([]);
  const [subjects, setSubjects] = useState<SubjectResponse[]>([]);
  const [participants, setParticipants] = useState<IListAllParticipant>();
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(20);

  const [loading, setLoading] = useState<boolean>(true);
  const classOptions = {
    TK: ["1"],
    SD: ["1", "2", "3", "4", "5", "6"],
    SMP: ["1", "2", "3"],
  };

  const [selectedRegional, setSelectedRegional] = useState<string>("");
  const [selectedStage, setSelectedStage] = useState<string>("TK");
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [selectedSubject, setSelectedSubject] = useState<string>("");

  const handleSearchButton = async () => {
    try {
      setLoading(true);
      const response = await listAll({ regionId: selectedRegional, stage: selectedStage, level: selectedClass, subjectId: selectedSubject });
      setParticipants(response);
    } catch (error) {
      console.error("Failed to fetch roles:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchRegional = async () => {
      try {
        setLoading(true);
        const response = await listRegional();
        setRegional(response);
        setSelectedRegional(response[1].id);
      } catch (error) {
        console.error("Failed to fetch roles:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchSubject = async () => {
      try {
        setLoading(true);
        const response = await listSubject();
        setSubjects(response);
        setSelectedSubject(response[0].id);
      } catch (error) {
        console.error("Failed to fetch roles:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRegional();
    fetchSubject();
  }, []);

  return (
    <div className="mb-16">
      <h1 className="text-2xl font-semibold">Peserta</h1>
      <div className="grid grid-cols-1 gap-3">
        <div className="mt-3 grid grid-cols-5 gap-8">
          <div className="col-span-2">
            <label htmlFor="regional" className="mb-2 block text-gray-900">
              Regional
            </label>
            <select value={selectedRegional} onChange={(e) => setSelectedRegional(e.target.value)} id="regional" className="w-full rounded-lg border-gray-200 bg-gray-50 p-2.5 text-sm text-gray-500 focus:border-blue-500 focus:ring-blue-500">
              {regional &&
                regional.length > 0 &&
                regional.map((regional) => (
                  <option key={regional.id} value={regional.id}>
                    {regional.name}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label htmlFor="stage" className="mb-2 block text-gray-900">
              Jenjang
            </label>
            <select value={selectedStage} onChange={(e) => setSelectedStage(e.target.value)} id="stage" className="w-full rounded-lg border-gray-200 bg-gray-50 p-2.5 text-sm text-gray-500 focus:border-blue-500 focus:ring-blue-500">
              <option value="TK">TK</option>
              <option value="SD">SD</option>
              <option value="SMP">SMP</option>
            </select>
          </div>
          <div>
            <label htmlFor="class" className="mb-2 block text-gray-900">
              Kelas
            </label>
            <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} id="class" className="w-full rounded-lg border-gray-200 bg-gray-50 p-2.5 text-sm text-gray-500 focus:border-blue-500 focus:ring-blue-500">
              {classOptions[selectedStage as "TK" | "SD" | "SMP"]?.map((option, index) => (
                <option key={index} value={option}>
                  {`Kelas ${option}`}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="subject" className="mb-2 block text-gray-900">
              Mata Pelajaran
            </label>
            <select value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)} id="subject" className="w-full rounded-lg border-gray-200 bg-gray-50 p-2.5 text-sm text-gray-500 focus:border-blue-500 focus:ring-blue-500">
              {subjects &&
                subjects.length > 0 &&
                subjects.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div>
          <button onClick={handleSearchButton} type="button" className="me-2 inline-flex items-center gap-2 rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <IoSearch />
            Cari
          </button>
        </div>

        {/* table */}

        <div className="relative mt-5 overflow-x-auto sm:rounded-lg">
          {participants && participants.data.length > 0 ? (
            <div>
              <table className="w-full text-left text-sm text-gray-500 rtl:text-right">
                <thead className="bg-gray-50 text-xs uppercase text-gray-700">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      No
                    </th>
                    <th scope="col" className="px-6 py-3">
                      ID JCC
                    </th>
                    <th scope="col" className="px-6 py-3">
                      ID Peserta
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Nama
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Asal Sekolah
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {participants &&
                    participants.data.length > 0 &&
                    participants.data.map((participant, index) => (
                      <tr key={index} className="border-b border-gray-200 odd:bg-white even:bg-gray-50">
                        <td className="px-6 py-4">{index + 1}</td>
                        <td className="px-6 py-4">{`J${participant.idMember.toString().padStart(4, "0")}`}</td>
                        <td className="px-6 py-4">{participant.idParticipant}</td>
                        <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                          {participant.name}
                        </th>
                        <td className="px-6 py-4">{participant.school}</td>
                        <td className="px-6 py-4">
                          <a href="#" className="font-medium text-blue-600 hover:underline dark:text-blue-500">
                            Edit
                          </a>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <div className="mt-3 flex w-full items-center justify-between gap-2">
                <div className="flex items-center gap-8">
                  <button onClick={() => participants?.page && setPage(participants.page - 1)} disabled={participants?.page === 1} className="border-slate-300 text-slate-600 hover:bg-slate-800 hover:border-slate-800 focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:bg-slate-800 rounded-md border p-2.5 text-center text-sm shadow-sm transition-all hover:text-white hover:shadow-lg focus:text-white active:text-white disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                      <path fillRule="evenodd" d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
                    </svg>
                  </button>

                  <p className="text-slate-600">
                    Page <strong className="text-slate-800">{participants?.page}</strong> of&nbsp;<strong className="text-slate-800">{participants?.totalPages}</strong>
                  </p>

                  <button onClick={() => participants?.page && setPage(participants.page + 1)} disabled={participants?.page === participants?.totalPages} className="border-slate-300 text-slate-600 hover:bg-slate-800 hover:border-slate-800 focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:bg-slate-800 rounded-md border p-2.5 text-center text-sm shadow-sm transition-all hover:text-white hover:shadow-lg focus:text-white active:text-white disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
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
            <div>
              <p>data tidak ditemukan</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Participants;
