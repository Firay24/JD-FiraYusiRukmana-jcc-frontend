"use client";
import Container from "@/components/base/Container";
import SkeletonLoader from "@/components/base/SkeletonLoader";
import BackNavbar from "@/components/module/BackNavbar";
import { IDetailActivity } from "@/hooks/activity/types";
import { useActivity } from "@/hooks/activity/useActivity";
import { usePayment } from "@/hooks/payment/usePayment";
import { StatusPayment } from "@/types/global";
import { convertEpochToDateLong, convertEpochToDateShort } from "@/utils/convertEpochToDate";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import CertifTemplate1 from "./template-certif.png";
import Image from "next/image";

const DetailActivity = () => {
  const params = useParams();
  const certifRef = useRef<HTMLDivElement>(null);
  const { detail } = useActivity();
  const { updateStatus } = usePayment();
  const [detailActivity, setDetailActivity] = useState<IDetailActivity>();
  const [statusInvoice, setStatusInvoice] = useState<string>("Belum Bayar");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const downloadPDF = async () => {
    if (!certifRef.current) return;

    const canvas = await html2canvas(certifRef.current);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("landscape", "px", [canvas.width, canvas.height]);
    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save(`${detailActivity?.student.name}-sertifikat.pdf`);
  };

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
            {/* <div className="mt-5 flex flex-row">
              <div className="flex w-full flex-col gap-1">
                <p className="text-sm font-semibold text-neutral-600">ID Invoice</p>
                <p className="text-md text-black">{detailActivity?.invoice}</p>
              </div>
            </div> */}

            {/* Events */}
            <div className="mt-5 flex flex-col gap-2">
              <p className="text-sm font-semibold text-neutral-600">Events</p>
              <div className="flex w-full flex-col items-start">
                <p className="text-md text-black">{detailActivity?.events.name}</p>
                <p className="text-sm font-semibold">{`${detailActivity?.events.subject.toUpperCase()} ${detailActivity?.events.stage} Kelas ${detailActivity?.events.level}`}</p>
                <p className="text-sm text-neutral-600">{detailActivity?.events.region}</p>
              </div>
            </div>
          </div>
        )}

        {/* detail event */}
        {detailActivity ? (
          <div className="grid grid-cols-1 gap-4">
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
                <p className="text-gray-500">ID Peserta</p>
                <p>{`J${detailActivity.idjcc.toString().padStart(4, "0")}` || "-"}</p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center rounded-lg bg-white p-7">
              <div ref={certifRef} className="fixed top-0 -z-10 h-[794px] w-[1123px]">
                <Image src={CertifTemplate1} alt="Sertifikat Background" fill className="absolute h-full w-full object-cover" />

                {/* text */}
                <p className="absolute left-1/2 top-[27%] -translate-x-1/2 transform text-[22px] text-[#404040]">No: 228/JCC/CHP/IV/2025</p>
                <p className="absolute left-1/2 top-[38%] -translate-x-1/2 transform text-[33px] text-[#f8bd34]">{detailActivity.student.name}</p>
                <p className="absolute left-1/2 top-[47%] -translate-x-1/2 transform text-[30px] font-light text-[#404040]" style={{ letterSpacing: "10px" }}>
                  SEBAGAI PESERTA
                </p>
                <p className="absolute left-1/2 top-[53%] w-[65%] -translate-x-1/2 transform text-center text-[22px] text-[#404040]">
                  bidang <span className="font-bold">{detailActivity.events.subject.toUpperCase()}</span> dalam Junior National Olympiad (JUNIO),
                </p>
                <p className="absolute left-1/2 top-[57%] w-[65%] -translate-x-1/2 transform text-center text-[22px] text-[#404040]">
                  tingkat <span>{detailActivity.events.stage === "SMP" ? "SMP/MTs" : detailActivity.events.stage === "SD" ? "SD/MI" : "TK/RA"}</span> Kelas <span>{detailActivity.events.stage === "SMP" ? detailActivity.events.level + 6 : detailActivity.events.level}</span> yang diselenggarakan di <span>{detailActivity.events.location}</span>, <span className="font-bold"></span>
                  {`${detailActivity.events.region}, pada `}
                  <span className="font-bold">{`Minggu, ${convertEpochToDateLong(detailActivity.events.date)}`}</span>.
                </p>
              </div>
              {/* Tombol Download */}
              <button onClick={downloadPDF} className="mt-6 rounded-lg bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700">
                Download Sertifikat
              </button>
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
