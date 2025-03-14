"use client";
import ContainerFacilitator from "@/components/base/Container-facilitator/page";
import { IGetAllPayment } from "@/hooks/payment/type";
import { usePayment } from "@/hooks/payment/usePayment";
import { TUser } from "@/hooks/profile/type";
import { useProfileStore } from "@/hooks/profile/useProfile";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { LuSearchX } from "react-icons/lu";

const Facilitator = () => {
  const { user } = useProfileStore();
  const { allbyuser } = usePayment();

  const [listPayment, setListPayment] = useState<IGetAllPayment[]>([]);
  const [profile, setProfile] = useState<TUser>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
          const response: IGetAllPayment[] = await allbyuser();
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
        <h2 className="text-2xl font-semibold">{`Halo, ${profile?.name}`}</h2>
        <div className="mt-6 flex flex-col items-center justify-center text-center">
          <p className="text-8xl text-gray-300">
            <LuSearchX />
          </p>
          <p className="text-gray-500">Tidak ada data transaksi untuk saat ini, silahkan tambahkan data transaksi Anda</p>
          <button type="button" className="me-2 mt-3 inline-flex items-center gap-2 rounded-full bg-blue-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300">
            <FaPlus />
            Transaksi
          </button>
          <button type="button" className="fixed bottom-5 right-5 me-2 inline-flex items-center rounded-full bg-blue-500 p-2.5 text-center text-2xl font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300">
            <FaPlus />
            <span className="sr-only">transaksi</span>
          </button>
        </div>
      </div>
    </ContainerFacilitator>
  );
};

export default Facilitator;
