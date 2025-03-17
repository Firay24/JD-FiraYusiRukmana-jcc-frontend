"use client";
import ContainerFacilitator from "@/components/base/Container-facilitator/page";
import SkeletonLoader from "@/components/base/SkeletonLoader";
import { useActivity } from "@/hooks/activity/useActivity";
import { useLogin } from "@/hooks/auth/useLogin";
import { IGetAllPayment } from "@/hooks/payment/type";
import { usePayment } from "@/hooks/payment/usePayment";
import { TUser } from "@/hooks/profile/type";
import { useProfileStore } from "@/hooks/profile/useProfile";
import { useRegional } from "@/hooks/regional/useRegional";
import { useSchollStore } from "@/hooks/school/useSchool";
import { ILabelValue, IRegional, StatusPayment } from "@/types/global";
import { convertEpochToDateLong } from "@/utils/convertEpochToDate";
import { formatCurrency } from "@/utils/formatCurrency";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaPlus, FaPowerOff } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { LuSearchX } from "react-icons/lu";
import { TiWarning } from "react-icons/ti";
import Select from "react-select";

const Facilitator = () => {
  const router = useRouter();
  const { logout } = useLogin();
  const { user } = useProfileStore();
  const { allbykolektif } = usePayment();
  const { listRegional } = useRegional();
  const { list } = useSchollStore();
  const { uploadBatch } = useActivity();

  const [regional, setRegional] = useState<IRegional[]>([]);
  const [selectedRegional, setSelectedRegional] = useState<string>("");
  const [listSchool, setListSchool] = useState<ILabelValue[]>([]);
  const [selectedSchool, setSelectedSchool] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [stage, setStage] = useState("TK");

  const [listPayment, setListPayment] = useState<IGetAllPayment[]>([]);
  const [profile, setProfile] = useState<TUser>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [isLoadingSubmit, setIsLoadingSubmit] = useState<boolean>(false);
  const [loadingSchool, setLoadingSchool] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isModalOpenCreate, setIsModalOpenCreate] = useState<boolean>(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.name.endsWith(".xlsx")) {
      setSelectedFile(file);
    } else {
      alert("Harap unggah file dengan format .xlsx");
      setSelectedFile(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }

    try {
      setIsLoadingSubmit(true);
      await uploadBatch(selectedFile, selectedSchool, "c2ea4ab1f7114bbb8058", selectedRegional);
    } catch (error) {
      console.error("Failed to save participants:", error);
    } finally {
      setIsLoadingSubmit(false);
    }
  };

  useEffect(() => {
    try {
      const fetchProfile = async () => {
        try {
          const response = await user();
          setProfile(response);
          setIsLoading(false);
        } catch (error) {
          console.error("Failed to fetch profile:", error);
        } finally {
          setIsLoading(false);
        }
      };

      const fetchList = async () => {
        try {
          setIsLoading(true);
          const response: IGetAllPayment[] = await allbykolektif();
          setListPayment(response);
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchProfile();
      fetchList();
    } catch (error) {
      console.error("Failed to fetch profile:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const fetchRegional = async () => {
      try {
        setLoadingSchool(true);
        const response = await listRegional();
        setRegional(response);
        setSelectedRegional(response[1].id);
      } catch (error) {
        console.error("Failed to fetch roles:", error);
      } finally {
        setLoadingSchool(false);
      }
    };

    if (isModalOpenCreate) {
      fetchRegional();
    }
  }, [isModalOpenCreate]);

  useEffect(() => {
    if (stage) {
      const fetchSchool = async () => {
        try {
          setLoading(true);
          const response = await list(stage);
          const formatted = response.map((item) => ({ label: item.name, value: item.id }));
          setListSchool(formatted);
        } catch (error) {
          console.error("Failed to fetch roles:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchSchool();
    }
  }, [stage]);

  return (
    <ContainerFacilitator>
      <div className="px-4">
        {isLoading ? (
          <>
            <SkeletonLoader rows={1} />
            <div className="mt-6 rounded-lg bg-white p-4">
              <SkeletonLoader rows={5} />
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-between">
              <h2 className="text-2xl font-semibold">{`Halo, ${profile?.name}`}</h2>
              <div onClick={() => setIsModalOpen(true)} className="flex cursor-pointer items-center gap-3 rounded-lg px-4 py-2 text-red-400 hover:bg-neutral-100 hover:text-neutral-800">
                <FaPowerOff />
                <p>Keluar</p>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-6">
              {listPayment.length > 0 ? (
                listPayment.map((payment, index) => (
                  <div onClick={() => router.push(`/facilitator/participants/${payment.id}`)} key={index} className="cursor-pointer rounded-xl bg-gray-100 p-6 shadow-md hover:bg-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800">{payment.invoice}</h3>
                    <p className="text-sm text-gray-600">{convertEpochToDateLong(payment.date)}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <p className="text-base font-semibold">{formatCurrency(payment.amount)}</p>
                      <span className={`me-2 rounded-full px-2.5 py-0.5 text-sm font-medium text-gray-500 ${payment.status === StatusPayment.COMPLETED ? "bg-green-100 text-green-800" : payment.status === StatusPayment.CONFIRMED ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}`}>{payment.status === StatusPayment.COMPLETED ? "Lunas" : payment.status === StatusPayment.CONFIRMED ? "Menunggu" : "Belum Bayar"}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="mt-6 flex flex-col items-center justify-center text-center">
                  <p className="text-8xl text-gray-300">
                    <LuSearchX />
                  </p>
                  <p className="text-gray-500">Tidak ada data transaksi untuk saat ini, silahkan tambahkan data transaksi Anda</p>
                  <button type="button" className="me-2 mt-3 inline-flex items-center gap-2 rounded-full bg-blue-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300">
                    <FaPlus />
                    Transaksi
                  </button>
                </div>
              )}
            </div>
          </>
        )}
        <button onClick={() => setIsModalOpenCreate(true)} type="button" className="fixed bottom-5 right-5 me-2 inline-flex items-center rounded-full bg-blue-500 p-2.5 text-center text-2xl font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300">
          <FaPlus />
          <span className="sr-only">transaksi</span>
        </button>
      </div>
      {/* modal create payment */}
      {isModalOpenCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-full max-w-2xl p-4">
            <div className="relative rounded-lg bg-white shadow-lg">
              <div className="flex items-center justify-between rounded-t border-b border-gray-200 p-4 md:p-5">
                <h3 className="text-xl font-semibold text-gray-900">Tambah Data</h3>
                <button onClick={() => setIsModalOpenCreate(false)} className="ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900">
                  <IoClose size={18} />
                </button>
              </div>
              {isLoading && loading ? (
                <div className="grid grid-cols-1 gap-3">
                  <SkeletonLoader rows={2} />
                  <SkeletonLoader rows={2} />
                  <SkeletonLoader rows={2} />
                  <SkeletonLoader rows={2} />
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5 px-6 pb-6">
                  <div className="mt-4">
                    <div>
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
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    <label htmlFor="stage" className="block ps-2 text-sm font-medium text-gray-600">
                      Stage
                    </label>
                    <select id="stage" onChange={(e) => setStage(e.target.value as "tk" | "sd" | "smp")} className="w-full rounded-lg border-gray-200 bg-gray-50 p-2.5 text-sm text-gray-500 focus:border-blue-500 focus:ring-blue-500">
                      <option value="TK">TK</option>
                      <option value="SD">SD</option>
                      <option value="SMP">SMP</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    <label htmlFor="school" className="block ps-2 text-sm font-medium text-gray-600">
                      School
                    </label>
                    {loadingSchool ? (
                      <div className="mt-0 block w-full animate-pulse rounded-md border bg-gray-100 p-2 text-gray-400">Loading...</div>
                    ) : (
                      <Select
                        styles={{
                          input: (base) => ({
                            ...base,
                            "input:focus": {
                              boxShadow: "none",
                            },
                          }),
                          control: (provided) => ({
                            ...provided,
                            border: "none",
                            boxShadow: "none",
                          }),
                        }}
                        className="basic-single rounded-lg border"
                        classNamePrefix="select"
                        value={listSchool.find((s) => s.value === selectedSchool) ?? null}
                        isSearchable={true}
                        name="school"
                        id="shool"
                        options={listSchool}
                        onChange={(e) => setSelectedSchool(e?.value)}
                      />
                    )}
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    <label htmlFor="file-upload" className="block text-sm font-medium text-gray-600">
                      Upload File Excel
                    </label>
                    <input id="file-upload" type="file" accept=".xlsx" onChange={handleFileChange} className="mt-2 block w-full rounded-md border p-2 text-sm" />
                    {selectedFile && (
                      <p className="mt-2 text-sm text-gray-700">
                        File terpilih: <strong>{selectedFile.name}</strong>
                      </p>
                    )}
                  </div>
                  <button type="submit" className="mt-2 w-full rounded-xl bg-[#5570F1] p-3 text-white">
                    {isLoadingSubmit ? "Loading" : "Simpan"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* logout */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-full max-w-2xl p-4">
            <div className="relative rounded-lg bg-white shadow-lg">
              <div className="flex items-center justify-between rounded-t border-b border-gray-200 p-4 md:p-5">
                <h3 className="text-xl font-semibold text-gray-900">Apa Anda yakin?</h3>
                <button onClick={() => setIsModalOpen(false)} className="ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900">
                  <IoClose size={18} />
                </button>
              </div>
              <div className="grid grid-cols-1 space-y-4 p-4 text-center md:p-5">
                <div className="flex justify-center text-8xl text-red-500">
                  <TiWarning />
                </div>

                <p>Anda akan logout dari akun Anda. Lanjutkan?</p>
              </div>
              <div className="flex items-center justify-center gap-3 rounded-b border-t border-gray-200 p-4 md:p-5">
                <button onClick={() => setIsModalOpen(false)} className="ms-3 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700">
                  Batal
                </button>
                <button
                  onClick={() => {
                    logout();
                    setIsModalOpen(false);
                    localStorage.setItem("isLogged", "false");
                    router.push("/auth/sign-in");
                  }}
                  className="rounded-lg bg-red-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-800"
                >
                  Yakin
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </ContainerFacilitator>
  );
};

export default Facilitator;
