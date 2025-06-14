"use client";
import { IListAllParticipant, IParticipant } from "@/hooks/activity/types";
import { useActivity } from "@/hooks/activity/useActivity";
import { usePayment } from "@/hooks/payment/usePayment";
import { useProfileStore } from "@/hooks/profile/useProfile";
import { useRegional } from "@/hooks/regional/useRegional";
import { useStudent } from "@/hooks/student/useStudent";
import { SubjectResponse, useSubject } from "@/hooks/subject/useSubject";
import { IRegional, StatusPayment } from "@/types/global";
import { convertDateToEpoch } from "@/utils/convertDateToEpoch";
import { exportToExcel } from "@/utils/exportExcel";
import { toTitleCase } from "@/utils/toTitleCase";
import React, { useEffect, useState } from "react";
import { FaRegFileExcel } from "react-icons/fa";
import { IoClose, IoSearch } from "react-icons/io5";
import { exportClassToExcel } from "./exportClassToExcel";

const Participants = () => {
  const { listRegional } = useRegional();
  const { listSubject } = useSubject();
  const { listAll } = useActivity();
  const { updateStatus } = usePayment();
  const { updateUser } = useProfileStore();
  const { listParcipantsClass } = useStudent();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [regional, setRegional] = useState<IRegional[]>([]);
  const [subjects, setSubjects] = useState<SubjectResponse[]>([]);
  const [participants, setParticipants] = useState<IListAllParticipant>();
  const [loadingExport, setLoadingExport] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(20);

  const [formData, setFormData] = useState({
    name: "",
    status: "",
  });

  const [loading, setLoading] = useState<boolean>(true);
  const classOptions = {
    TK: ["1"],
    SD: ["1", "2", "3", "4", "5", "6"],
    SMP: ["1", "2", "3"],
  };

  const [search, setSearch] = useState<string>("");
  const [selectedParticipant, setSelectedParticipant] = useState<IParticipant>();
  const [selectedRegional, setSelectedRegional] = useState<string>("");
  const [selectedStage, setSelectedStage] = useState<string>("TK");
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [typeSearch, setTypeSearch] = useState<string>("filter");
  const [selectedDate, setSelectedDate] = useState<string>("");

  const openModal = (participant: IParticipant) => {
    setFormData({
      name: participant.name,
      status: participant.payment.status,
    });
    setSelectedParticipant(participant);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleFilterButton = async () => {
    try {
      setLoading(true);
      const response = await listAll({ page: page, limit: limit, regionId: selectedRegional, stage: selectedStage, level: selectedClass, subjectId: selectedSubject, search: "" });
      setParticipants(response);
    } catch (error) {
      console.error("Failed to fetch roles:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchButton = async () => {
    try {
      setLoading(true);
      if (typeSearch === "all") {
        const response = await listAll({ page: page, limit: limit, search: search, regionId: selectedRegional, date: selectedDate ? convertDateToEpoch(selectedDate) : undefined });
        setParticipants(response);
      } else if (typeSearch === "filter") {
        const response = await listAll({ page: page, limit: limit, regionId: selectedRegional, stage: selectedStage, level: selectedClass, subjectId: selectedSubject, search: search });
        setParticipants(response);
      }
    } catch (error) {
      console.error("Failed to fetch roles:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitEdit = async (e: React.FormEvent, idPayment: string) => {
    e.preventDefault();
    try {
      await updateStatus({ id: idPayment, payload: { status: formData.status as StatusPayment } });
      await updateUser({ name: formData.name });
      await handleFilterButton();
      closeModal();
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const handleExport = async () => {
    setLoadingExport(true);

    try {
      const response = await listParcipantsClass({ seasonId: "c2ea4ab1f7114bbb8058", regionId: selectedRegional });
      if (response) {
        const roomOrder = ["J0", "J1", "J2", "J3", "J4", "J5", "J6", "J7", "J8", "J9", "E1", "E2", "E3", "E5", "E6", "E7", "E8"];

        const sortedParticipants = response.sort((a, b) => {
          return roomOrder.indexOf(a.room) - roomOrder.indexOf(b.room);
        });

        exportClassToExcel(sortedParticipants);
      }
    } catch (error) {
      console.error("Failed to export data:", error);
    } finally {
      setLoadingExport(false);
    }
  };

  useEffect(() => {
    const fetchRegional = async () => {
      try {
        setLoading(true);
        const response = await listRegional();
        setRegional(response);

        const regionCurrent = response.find((item) => item.region === 4);
        if (regionCurrent) {
          setSelectedRegional(regionCurrent.id);
        }
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

  useEffect(() => {
    if (selectedRegional && selectedStage && selectedClass && selectedSubject) {
      handleFilterButton();
    } else {
      handleSearchButton();
    }
  }, [page, limit]);

  return (
    <div className="mb-16">
      <h1 className="text-2xl font-semibold">Peserta</h1>
      <div className="grid grid-cols-1 gap-3">
        <div className="mt-3 grid grid-cols-2 gap-8 md:grid-cols-5">
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
          <button onClick={handleFilterButton} type="button" className="me-2 inline-flex items-center gap-2 rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300">
            <IoSearch />
            Cari
          </button>
        </div>

        {/* search */}
        {/* <div className="mt-4 border-t border-gray-300"></div> */}

        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          <div className="mt-2 flex gap-3">
            <div>
              <select value={typeSearch} onChange={(e) => setTypeSearch(e.target.value)} className="w-full rounded-lg border-gray-200 bg-gray-50 p-2.5 text-sm text-gray-500 focus:border-blue-500 focus:ring-blue-500">
                <option value="all">All</option>
                <option value="filter">Filter</option>
              </select>
            </div>
            <div className="flex w-full">
              <label htmlFor="simple-search" className="sr-only">
                Search
              </label>
              <div className="relative w-full">
                <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3 text-gray-500">
                  <IoSearch />
                </div>
                <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} id="simple-search" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500" placeholder="Search branch name..." required />
              </div>
              <button onClick={handleSearchButton} className="ms-2 rounded-lg border border-blue-700 bg-blue-700 p-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300">
                <svg className="h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
                <span className="sr-only">Search</span>
              </button>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2">
            <div>
              <button onClick={handleExport} type="button" className="me-2 inline-flex w-full min-w-[200px] items-center justify-center gap-2 rounded-lg bg-green-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
                <FaRegFileExcel />
                <p>{loadingExport ? "Loading" : "Export Data"}</p>
              </button>
            </div>
          </div>
        </div>

        <div>
          <p>{`Jumlah Peserta: ${participants && participants.totalItems}`}</p>
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
                      Ruang
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {participants &&
                    participants.data.length > 0 &&
                    participants.data.map((participant, index) => (
                      <tr key={index} className="border-b border-gray-200 odd:bg-white even:bg-gray-50">
                        <td className="px-6 py-4">{index + 1}</td>
                        <td className="px-6 py-4">{`J${participant.idMember.padStart(4, "0")}`}</td>
                        <td className="px-6 py-4">{participant.idParticipant}</td>
                        <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                          {toTitleCase(participant.name)}
                        </th>
                        <td className="px-6 py-4">{participant.school}</td>
                        <td className="px-6 py-4">{participant.competition.room}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
              {isModalOpen && selectedParticipant && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-600 bg-opacity-10">
                  <div className="relative w-full max-w-2xl p-4">
                    <div className="relative rounded-lg bg-white">
                      <div className="flex items-center justify-between rounded-t border-b border-gray-200 p-4 md:p-5">
                        <h3 className="text-xl font-semibold text-gray-900">Edit</h3>
                        <button onClick={closeModal} className="ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900">
                          <IoClose size={18} />
                        </button>
                      </div>
                      <div className="mx-10">
                        <form onSubmit={(e) => handleSubmitEdit(e, selectedParticipant.payment.id)} className="mt-6 flex flex-col gap-5">
                          <div className="group relative z-0 mb-5 w-full">
                            <input value={formData?.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} type="text" name="floating_name" id="floating_name" className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0" placeholder=" " required />
                            <label htmlFor="floating_name" className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4">
                              Name <span className="text-red-500">*</span>
                            </label>
                          </div>
                          <div className="group relative z-0 mb-5 w-full">
                            <label htmlFor="status" className="mb-2 block text-sm text-gray-500">
                              Status <span className="text-red-500">*</span>
                            </label>
                            <select value={formData?.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} id="stage" className="w-full border-none bg-gray-50 p-2.5 text-sm text-gray-500 focus:border-blue-500 focus:ring-blue-500">
                              <option value="COMPLETED">Lunas</option>
                              <option value="CONFIRMED">Menunggu</option>
                              <option value="PENDING">Belum lunas</option>
                            </select>
                          </div>
                          <div className="mb-10 flex w-full items-center justify-center text-center">
                            <button type="submit" className="me-2 w-full items-center gap-2 rounded-lg bg-blue-700 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                              Simpan
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="mt-3 flex w-full items-center justify-between gap-2">
                <div className="flex items-center gap-8">
                  <button onClick={() => participants?.page && setPage(participants.page - 1)} disabled={participants?.page === 1} className="border-slate-300 text-slate-600 hover:border-slate-800 focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:bg-slate-800 rounded-md border bg-gray-200 p-2.5 text-center text-sm shadow-sm transition-all hover:bg-gray-300 hover:shadow-lg disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                      <path fillRule="evenodd" d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
                    </svg>
                  </button>

                  <p className="text-gray-800">
                    Page <strong className="text-slate-800">{participants?.page}</strong> of&nbsp;<strong className="text-slate-800">{participants?.totalPages}</strong>
                  </p>

                  <button onClick={() => participants?.page && setPage(participants.page + 1)} disabled={participants?.page === participants?.totalPages} className="border-slate-300 text-slate-600 hover:border-slate-800 focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:bg-slate-800 rounded-md border bg-gray-200 p-2.5 text-center text-sm shadow-sm transition-all hover:bg-gray-300 hover:shadow-lg disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
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
                    className="rounded-full border border-gray-300 p-1 pl-4 text-gray-800"
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
