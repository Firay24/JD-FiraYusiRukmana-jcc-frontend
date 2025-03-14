"use client";
import Container from "@/components/base/Container";
import SkeletonLoader from "@/components/base/SkeletonLoader";
import BackNavbar from "@/components/module/BackNavbar";
import { IDetailActivity } from "@/hooks/activity/types";
import { useActivity } from "@/hooks/activity/useActivity";
import { usePayment } from "@/hooks/payment/usePayment";
import { StatusPayment } from "@/types/global";
import { convertEpochToDateShort } from "@/utils/convertEpochToDate";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const DetailActivity = () => {
  const params = useParams();
  const { detail } = useActivity();
  const { updateStatus } = usePayment();
  const [detailActivity, setDetailActivity] = useState<IDetailActivity>();
  const [statusInvoice, setStatusInvoice] = useState<string>("Belum Bayar");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleSubmitStatusPayment = async () => {
    try {
      setIsLoading(true);
      await updateStatus({ id: detailActivity?.paymentId as string, payload: { status: StatusPayment.CONFIRMED } });
      const response = await detail(params.myevent as string);
      setDetailActivity(response);
    } catch (error) {
      console.error("Failed to save status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setIsLoading(true);
        const response = await detail(params.myevent as string);
        setDetailActivity(response);
      } catch (error) {
        console.error("Failed to fetch detail:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetail();
  }, []);

  useEffect(() => {
    if (detailActivity) {
      if (detailActivity.latestStatus.status === StatusPayment.PENDING) {
        setStatusInvoice("Belum Bayar");
      } else if (detailActivity.latestStatus.status === StatusPayment.CONFIRMED) {
        setStatusInvoice("Menunggu");
      } else if (detailActivity.latestStatus.status === StatusPayment.COMPLETED) {
        setStatusInvoice("Lunas");
      }
    }
  }, [detailActivity]);

  return (
    <div className="min-h-screen bg-base-gray p-4">
      <Container>
        <div className="mb-6">
          <BackNavbar href="/member/event" />
        </div>
        {/* Invoice */}
        {isLoading ? (
          <div className="rounded-xl border bg-white p-7">
            <SkeletonLoader rows={5} />
          </div>
        ) : (
          <div className="rounded-xl border bg-white p-7">
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-col gap-1">
                <p className="text-start text-2xl font-semibold">Invoice</p>
                <p className="text-sm text-neutral-600">{detailActivity?.paymentDate ? `${convertEpochToDateShort({ epoch: detailActivity.paymentDate, showtime: true })} WIB` : "-"}</p>
              </div>
            </div>

            {/* ID Invoice */}
            <div className="mt-5 flex flex-row">
              <div className="flex w-full flex-col gap-1">
                <p className="text-sm font-semibold text-neutral-600">ID Invoice</p>
                <p className="text-md text-black">{detailActivity?.invoice}</p>
              </div>
            </div>

            {/* Events */}
            <div className="mt-5 flex flex-col gap-2">
              <p className="text-sm font-semibold text-neutral-600">Events</p>
              <div className="flex w-full flex-col items-start">
                <p className="text-md text-black">{detailActivity?.events.name}</p>
                <p className="text-sm text-neutral-600">{detailActivity?.events.region}</p>
              </div>
            </div>
          </div>
        )}

        {/* detail event */}
        {detailActivity ? (
          <div className="mt-5 flex flex-col gap-2 rounded-lg bg-white p-7">
            <h2 className="text-lg font-medium">Informasi Lomba</h2>
            <div className="grid grid-cols-2 text-sm">
              <p className="text-gray-500">Lokasi</p>
              <p>{detailActivity.events.location}</p>
            </div>
            <div className="grid grid-cols-2 text-sm">
              <p className="text-gray-500">Waktu</p>
              <p>{convertEpochToDateShort({ epoch: detailActivity.events.date, showtime: true })}</p>
            </div>
            <div className="grid grid-cols-2 text-sm">
              <p className="text-gray-500">Ruang</p>
              <p>{detailActivity.events.room || "-"}</p>
            </div>
            <div className="grid grid-cols-2 text-sm">
              <p className="text-gray-500">Pengawas</p>
              <p>{detailActivity.events.supervisor || "-"}</p>
            </div>
          </div>
        ) : (
          <div className="bg-white p-7">
            <SkeletonLoader rows={5} />
          </div>
        )}
      </Container>
    </div>
  );
};

export default DetailActivity;
