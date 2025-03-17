"use client";
import ContainerFacilitator from "@/components/base/Container-facilitator/page";
import SkeletonLoader from "@/components/base/SkeletonLoader";
import { useLogin } from "@/hooks/auth/useLogin";
import { IGetAllPayment } from "@/hooks/payment/type";
import { usePayment } from "@/hooks/payment/usePayment";
import { TUser } from "@/hooks/profile/type";
import { useProfileStore } from "@/hooks/profile/useProfile";
import { StatusPayment } from "@/types/global";
import { convertEpochToDateLong } from "@/utils/convertEpochToDate";
import { formatCurrency } from "@/utils/formatCurrency";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaPlus, FaPowerOff } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { LuSearchX } from "react-icons/lu";
import { TiWarning } from "react-icons/ti";

const Facilitator = () => {
  const { logout } = useLogin();
  const router = useRouter();
  const { user } = useProfileStore();
  const { allbykolektif } = usePayment();

  const [listPayment, setListPayment] = useState<IGetAllPayment[]>([]);
  const [profile, setProfile] = useState<TUser>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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
            <div className="mt-6">
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
        <button type="button" className="fixed bottom-5 right-5 me-2 inline-flex items-center rounded-full bg-blue-500 p-2.5 text-center text-2xl font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300">
          <FaPlus />
          <span className="sr-only">transaksi</span>
        </button>
      </div>
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
