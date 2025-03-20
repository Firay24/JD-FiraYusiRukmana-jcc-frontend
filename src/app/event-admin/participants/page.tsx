"use client";
import { IListAllParticipant, IParticipant } from "@/hooks/activity/types";
import { useActivity } from "@/hooks/activity/useActivity";
import { usePayment } from "@/hooks/payment/usePayment";
import { useProfileStore } from "@/hooks/profile/useProfile";
import { useRegional } from "@/hooks/regional/useRegional";
import { SubjectResponse, useSubject } from "@/hooks/subject/useSubject";
import { useModalStore } from "@/state/modalState";
import { IRegional, StatusPayment } from "@/types/global";
import React, { useEffect, useState } from "react";
import { IoClose, IoSearch } from "react-icons/io5";

const Participants = () => {
  const { listRegional } = useRegional();
  const { listSubject } = useSubject();
  const { listAll } = useActivity();
  const { updateStatus } = usePayment();
  const { updateUser } = useProfileStore();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [regional, setRegional] = useState<IRegional[]>([]);
  const [subjects, setSubjects] = useState<SubjectResponse[]>([]);
  const [participants, setParticipants] = useState<IListAllParticipant>();
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

  const [selectedParticipant, setSelectedParticipant] = useState<IParticipant>();
  const [selectedRegional, setSelectedRegional] = useState<string>("");
  const [selectedStage, setSelectedStage] = useState<string>("TK");
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [selectedSubject, setSelectedSubject] = useState<string>("");

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

  const handleSearchButton = async () => {
    try {
      setLoading(true);
      const response = await listAll({ page: page, limit: limit, regionId: selectedRegional, stage: selectedStage, level: selectedClass, subjectId: selectedSubject });
      setParticipants(response);
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
      await handleSearchButton();
      closeModal();
    } catch (error) {
      console.error("Failed to update status:", error);
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

  useEffect(() => {
    handleSearchButton();
  }, [page, limit]);

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
          <button onClick={handleSearchButton} type="button" className="me-2 inline-flex items-center gap-2 rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300">
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
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Invoice
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
                        <td className="px-6 py-4">{`J${participant.idMember.padStart(4, "0")}`}</td>
                        <td className="px-6 py-4">
                          <span className={`${participant.payment.status === "COMPLETED" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"} me-2 rounded-sm px-2.5 py-0.5 text-sm font-medium`}>{participant.payment.status === "COMPLETED" ? "Lunas" : "Belum"}</span>
                        </td>
                        <td className="px-6 py-4">{participant.payment.invoice}</td>
                        <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                          {participant.name}
                        </th>
                        <td className="px-6 py-4">{participant.school}</td>
                        <td className="px-6 py-4">
                          <p onClick={() => openModal(participant)} className="cursor-pointer font-medium text-blue-600 hover:underline dark:text-blue-500">
                            Edit
                          </p>
                        </td>
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
                          <p>{selectedParticipant.payment.id}</p>
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
