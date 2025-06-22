"use client";
import { IListParticipant, Participant } from "@/hooks/activity/types";
import { useActivity } from "@/hooks/activity/useActivity";
import { useEvent } from "@/hooks/event/useEvent";
import { useRegional } from "@/hooks/regional/useRegional";
import { IGetStudentInfo } from "@/hooks/student/type";
import { useStudent } from "@/hooks/student/useStudent";
import { useSubject } from "@/hooks/subject/useSubject";
import { IRegional } from "@/types/global";
import { generatePDF } from "@/utils/generatePdfLeaderboard";
import React, { useEffect, useState } from "react";
import { FiDownload } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";
import { MdClear } from "react-icons/md";
import { PiEmptyBold } from "react-icons/pi";

type StageType = "TK" | "SD" | "SMP";

const PengumumanPage = () => {
  const { participant } = useActivity();
  const { eventId } = useEvent();
  const { listSubject } = useSubject();
  const { profile } = useStudent();
  const { listRegional } = useRegional();

  const [regional, setRegional] = useState<IRegional[]>([]);
  const [selectedRegional, setSelectedRegional] = useState<string>("96c3c7a9086642158d0a");
  const [profileStudent, setProfileStuden] = useState<IGetStudentInfo>();
  const [listParticipant, setParticipant] = useState<IListParticipant>();
  const [isScrolled, setIsScrolled] = useState(false);
  const [jenjang, setJenjang] = useState<StageType>("TK");
  const [matpel, setMatpel] = useState("");
  const [level, setLevel] = useState("");
  const [subjectId, setSubjectId] = useState<string>("");
  const [isloading, setIsLoading] = useState<boolean>(false);
  const [isloadingDownload, setIsLoadingDownload] = useState<boolean>(false);
  const [rangking, setRanking] = useState<any>({ ranking: 0, skor: 0 });
  const [search, setSearch] = useState<string>("");
  const [allData, setAllData] = useState<Participant[]>();

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

  const fetchAllData = async () => {
    try {
      setIsLoadingDownload(true);

      if (!listParticipant) return [];

      let page = 1;
      let totalPage = listParticipant.totalPages;
      let allDataTemp: any[] = [];

      while (page <= totalPage) {
        let participantResponse;

        if (selectedRegional === "all") {
          participantResponse = await participant({
            page,
            limit,
            stage: jenjang,
            level,
            subjectId,
            search: "",
          });
        } else {
          const response = await eventId({
            stage: jenjang,
            level,
            subjectId,
            region: parseInt(selectedRegional, 10),
          });
          const newIdCompetition = response.id;

          participantResponse = await participant({
            page,
            limit,
            idCompetition: newIdCompetition,
            search: "",
          });
        }

        if (participantResponse && participantResponse.data) {
          allDataTemp = [...allDataTemp, ...participantResponse.data];
        }

        page++;
      }

      setAllData(allDataTemp);
      return allDataTemp;
    } catch (error) {
      console.error("Error fetching all data:", error);
      return [];
    } finally {
      setIsLoadingDownload(false);
    }
  };

  const handleDownload = async () => {
    try {
      const allDataFetched = await fetchAllData();

      if (allDataFetched.length > 0) {
        generatePDF(allDataFetched, `${jenjang}-${level}-${matpel}`, selectedRegional === "all" ? "all" : selectedRegional);
      } else {
        console.warn("No data available to download.");
      }
    } catch (error) {
      console.error("Error during handleDownload:", error);
    }
  };

  const handleFilter = async () => {
    try {
      setIsLoading(true);

      if (selectedRegional === "all") {
        const participantResponse = await participant({ page: page, limit, stage: jenjang, level: level, subjectId: subjectId, search: "" });
        setParticipant(participantResponse);
      } else {
        const response = await eventId({ stage: jenjang, level: level, subjectId: subjectId, region: parseInt(selectedRegional, 10) });
        const newIdCompetition = response.id;

        const participantResponse = await participant({ page: page, limit, idCompetition: newIdCompetition, search: "" });
        setParticipant(participantResponse);
        participantResponse.data.map((item: Participant, index) => {
          if (item.id === profileStudent?.id) {
            setRanking({ ranking: index + 1, skor: item.score });
          }
        });
      }
    } catch (error) {
      console.error("Error during handleSearch:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchButton = async () => {
    try {
      setIsLoading(true);
      const responseId = await eventId({ stage: jenjang, level: level, subjectId: subjectId, region: parseInt(selectedRegional, 10) });
      const newIdCompetition = responseId.id;

      const response = await participant({ page, limit, idCompetition: newIdCompetition, search: search });
      setParticipant(response);
    } catch (error) {
      console.error("Failed to fetch roles:", error);
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
    const fetchProfileStudent = async () => {
      try {
        setIsLoading(true);
        const responseProfile = await profile();
        if (responseProfile) {
          setProfileStuden(responseProfile);
        }
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    const fetchRegional = async () => {
      try {
        setIsLoading(true);
        const response = await listRegional();
        setRegional(response);
      } catch (error) {
        console.error("Failed to fetch roles:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRegional();
    fetchProfileStudent();
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
      handleFilter();
    }
  }, [page, limit]);
  return (
    <div className="grid grid-cols-1 gap-4 px-4">
      {/* table */}
      <div className="mb-6 grid grid-cols-1 gap-5 rounded-lg bg-white p-4">
        <div className="grid grid-cols-1 gap-4">
          <p className="text-md font-bold">Pilih Jenis Perlombaan</p>

          <div>
            <label className="block text-sm font-medium text-gray-700">Jenjang</label>
            <select value={selectedRegional} onChange={(e) => setSelectedRegional(e.target.value)} className="mt-1 w-full rounded-full border p-2 pl-4 focus:ring-2 focus:ring-blue-400">
              <option value="all">Semua Regional</option>
              {regional.map((item, index) => (
                <option value={item.region} key={index}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

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
          <button onClick={handleFilter} className="w-full rounded-full bg-blue-500 py-2 text-white transition hover:bg-blue-600" disabled={!matpel || !level}>
            Cari
          </button>
          {listParticipant && listParticipant.totalItems > 0 && (
            <button onClick={handleDownload} className="flex w-full items-center justify-center gap-2 rounded-full bg-base-yellow py-2 text-gray-800 transition hover:bg-yellow-400" disabled={!matpel || !level}>
              {isloadingDownload ? (
                <svg aria-hidden="true" role="status" className="me-3 inline h-4 w-4 animate-spin text-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                </svg>
              ) : (
                <FiDownload />
              )}
              {isloadingDownload ? "Loading ..." : "Unduh PDF"}
            </button>
          )}
        </div>
        {/* search */}
        <div className="flex w-full">
          <label htmlFor="simple-search" className="sr-only">
            Search
          </label>
          <div className="relative w-full">
            <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3 text-gray-500">
              <IoSearch />
            </div>
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value.replace(/\s/g, ""))} id="simple-search" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500" placeholder="Cari nama..." required />
          </div>
          <button onClick={handleSearchButton} className="ms-2 rounded-lg bg-blue-500 p-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300">
            <svg className="h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
            <span className="sr-only">Search</span>
          </button>
          <button
            onClick={() => {
              handleFilter();
              setSearch("");
            }}
            className="ms-2 rounded-lg bg-gray-400 p-2.5 text-sm font-medium text-white hover:bg-gray-500 focus:outline-none focus:ring-4 focus:ring-gray-300"
          >
            <MdClear />
            <span className="sr-only">Search</span>
          </button>
        </div>
        {/* button */}
        {/* <div className="grid grid-cols-3 gap-2">
                <button className="rounded-full border-2 bg-transparent p-2 text-sm text-neutral-700 hover:bg-blue-800">Default</button>
                <button className="rounded-full bg-blue-600 p-2 text-sm font-medium text-white hover:bg-blue-800">Default</button>
                <button className="rounded-full border-2 bg-transparent p-2 text-sm text-neutral-700 hover:bg-blue-800">Default</button>
              </div> */}
        <div className="mt-2">
          <div className="relative overflow-x-auto sm:rounded-lg">
            {listParticipant && listParticipant.data.length > 0 ? (
              <div>
                <table className="mt-2 w-full text-left text-sm text-gray-500 rtl:text-right">
                  <thead className="bg-gray-50 text-xs uppercase text-gray-700">
                    <tr>
                      <th scope="col" className="p-1">
                        No
                      </th>
                      <th scope="col" className="p-1">
                        Nama
                      </th>
                      <th scope="col" className="p-1">
                        Nilai
                      </th>
                      <th scope="col" className="p-1">
                        Asal Sekolah
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {listParticipant &&
                      listParticipant.data.map((participant, index) => (
                        <tr key={index} className={`border-b ${profileStudent?.id === participant.id ? "bg-base-yellow" : "bg-gray-50"}`}>
                          <td className="p-1">{index + 1}</td>
                          <th scope="row" className="whitespace-nowrap p-1 font-medium text-gray-900">
                            {participant.name}
                          </th>
                          <td className="p-1">{participant.score}</td>
                          <td className="p-1">{participant.school}</td>
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
  );
};

export default PengumumanPage;
