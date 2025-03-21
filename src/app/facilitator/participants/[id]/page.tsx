"use client";
import ContainerFacilitator from "@/components/base/Container-facilitator/page";
import SkeletonLoader from "@/components/base/SkeletonLoader";
import { IDetailPayment } from "@/hooks/activity/types";
import { usePayment } from "@/hooks/payment/usePayment";
import { IParticipantsList } from "@/hooks/student/type";
import { useStudent } from "@/hooks/student/useStudent";
import { StatusPayment } from "@/types/global";
import { convertEpochToDateShort } from "@/utils/convertEpochToDate";
import { formatCurrency } from "@/utils/formatCurrency";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Participants = () => {
  const params = useParams();
  const { listParticipantByKolektif } = useStudent();
  const { updateStatus, detail } = usePayment();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [statusInvoice, setStatusInvoice] = useState<string>("Belum Bayar");
  const [listParticipants, setListParticipants] = useState<IParticipantsList>();
  const [detailPaymentData, setDetailPaymentData] = useState<IDetailPayment>();

  const handleSubmitStatusPayment = async () => {
    try {
      setIsLoading(true);
      await updateStatus({ id: detailPaymentData?.id as string, payload: { status: StatusPayment.CONFIRMED } });
      const response = await detail(params.id as string);
      if (response) {
        setDetailPaymentData(response);
      }
    } catch (error) {
      console.error("Failed to save status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchList = async () => {
      try {
        setIsLoading(true);
        const response: IParticipantsList = await listParticipantByKolektif(params.id as string);
        setListParticipants(response);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (params.id) {
      fetchList();
    }
  }, []);

  useEffect(() => {
    if (detailPaymentData) {
      if (detailPaymentData.latestStatus.status === StatusPayment.PENDING) {
        setStatusInvoice("Belum Bayar");
      } else if (detailPaymentData.latestStatus.status === StatusPayment.CONFIRMED) {
        setStatusInvoice("Menunggu");
      } else if (detailPaymentData.latestStatus.status === StatusPayment.COMPLETED) {
        setStatusInvoice("Lunas");
      }
    }
  }, [detailPaymentData]);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setIsLoading(true);
        const response = await detail(params.id as string);
        setDetailPaymentData(response);
      } catch (error) {
        console.error("Failed to fetch detail:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetail();
  }, []);

  return (
    <ContainerFacilitator>
      <div className="mb-6 px-4">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Daftar Peserta</h2>
            <p>{listParticipants?.regional}</p>
          </div>
          <div>
            <Link href="/facilitator" className="text-sm text-blue-500 hover:text-blue-600">
              <span>Kembali</span>
            </Link>
          </div>
        </div>
        <div className="mt-4">{detailPaymentData && detailPaymentData.latestStatus.status === StatusPayment.COMPLETED ? <button className="rounded-lg bg-base-green px-5 py-2.5 text-sm text-white">{statusInvoice}</button> : detailPaymentData && detailPaymentData.latestStatus.status === StatusPayment.CONFIRMED ? <button className="rounded-lg bg-base-yellow p-2 text-sm font-medium text-white">{statusInvoice}</button> : <button className="rounded-lg bg-base-pink p-2 text-sm font-medium text-white">{statusInvoice}</button>}</div>

        {/* DETAIL PAYMENT */}

        {/* rincian pembayaran */}
        {isLoading ? (
          <div className="mt-5 rounded-xl border bg-white p-7">
            <SkeletonLoader rows={9} />
          </div>
        ) : (
          <div className="mt-5 flex flex-col gap-2">
            <div className="rounded-lg bg-white p-5">
              <div className="relative overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-500 rtl:text-right">
                  <thead className="border-b border-gray-200 text-xs uppercase text-gray-700">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        No
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Nama
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Username
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Kelas
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Matpel
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Harga
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {detailPaymentData?.competition &&
                      detailPaymentData.competition.map((event, index) => (
                        <tr className="bg-white" key={index}>
                          <td className="px-6 py-4">{index + 1}</td>
                          <th className="px-6 py-4">{event.student.name}</th>
                          <th className="px-6 py-4">{event.student.username}</th>
                          <td className="px-6 py-4">{`${event.student.class} ${event.student.stage}`}</td>
                          <td scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                            {event.subject.name === "ipa" || event.subject.name === "ips"
                              ? event.subject.name.toUpperCase()
                              : event.subject.name
                                  .split(" ")
                                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                                  .join(" ")}
                          </td>
                          <td className="px-6 py-4">{formatCurrency(event.price)}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

              <div className="mb-3 border-b border-t pb-5 pt-5">
                <div className="flex justify-between">
                  <p className="text-sm text-gray-500">Subtotal</p>
                  <p className="text-sm">{detailPaymentData?.competition?.length ? formatCurrency((detailPaymentData.competition.length ?? 0) * (detailPaymentData.competition[0]?.price ?? 0)) : "Rp 0"}</p>
                </div>
                <div className="mt-2 flex justify-between">
                  <p className="text-sm text-gray-500">Diskon</p>
                  <p className="text-sm text-red-600">{detailPaymentData?.competition ? `-${formatCurrency(detailPaymentData.competition.length * (detailPaymentData.competition[0]?.price ?? 0) - (detailPaymentData.amount ?? 0))}` : "Rp 0"}</p>
                </div>
              </div>
              <div className="mt-5 flex justify-between text-lg font-bold">
                <p className="text-sm font-medium">TOTAL</p>
                <p className="text-sm font-semibold">{detailPaymentData?.amount ? formatCurrency(detailPaymentData?.amount) : "Rp 0"}</p>
              </div>
            </div>
          </div>
        )}

        {/* Data Rekening Admin */}
        {detailPaymentData && detailPaymentData.latestStatus.status === StatusPayment.PENDING && (
          <div className="mt-5 flex flex-col gap-2 rounded-lg bg-white p-7">
            <div className="flex w-full flex-col items-start">
              <p className="text-sm font-semibold text-neutral-600">No Rekening</p>
              <div className="grid w-full grid-cols-2">
                <p className="text-md font-normal">1430032335422</p>
                <p className="text-md text-right text-black">Bank Mandiri</p>
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-neutral-600">Atas nama</p>
              <p className="text-md font-normal text-black">Ayatulloh Amini</p>
            </div>
            <div className="mt-5">
              <h2 className="text-md mb-2 font-semibold text-gray-900">Langkah Pembayaran</h2>
              <ul className="w-full list-disc space-y-1 pl-3 text-gray-500">
                <li>Lakukan pembayaran ke rekening di atas</li>
                <li>Screenshoot bukti pembayaran</li>
                <li>Kirim bukti pembayaran melalui tombol "Kirim Bukti Pembayaran"</li>
                <li>Anda akan diarahkan ke pesan whatsapp, lengkapi nama pengirim dan asal bank</li>
                <li>Setelah berhasil mengirim ke admin, lalu klik tombol "Tandai Sudah Membayar"</li>
                <li>Tunggu admin melakukan konfirmasi apakah sudah membayar</li>
              </ul>
            </div>
          </div>
        )}

        {/* Status Transaksi */}
        {detailPaymentData && detailPaymentData.latestStatus.status !== StatusPayment.PENDING && (
          <div className="relative mt-5 rounded-lg bg-white p-4">
            {/* Garis timeline yang menyentuh titik */}
            <div className="absolute bottom-0 left-1/2 top-0 z-0 w-1 -translate-x-1/2 transform bg-gray-300"></div>

            {/* Item pertama */}
            {detailPaymentData.detailStatus &&
              detailPaymentData.detailStatus.map((item, index) => (
                <div key={index} className="relative mt-2 grid grid-cols-3 items-center">
                  <div className="text-right">
                    <p className={`font-semibold ${index === 0 ? "text-green-500" : "text-gray-500"}`}>{item.status === StatusPayment.CONFIRMED ? "Menunggu" : item.status === StatusPayment.PENDING ? "Belum Bayar" : "Lunas"}</p>
                    <p className="text-sm text-black">{convertEpochToDateShort({ epoch: item.date, showtime: true })}</p>
                  </div>
                  <div className="relative flex justify-center">
                    <div className={`z-10 h-6 w-6 rounded-full ${index === 0 ? "bg-green-500" : "bg-gray-300"}`}></div>
                  </div>
                  <div>
                    <p className="text-black">{item.status === StatusPayment.CONFIRMED ? "Menunggu verifikasi" : item.status === StatusPayment.PENDING ? "Pendaftaran" : "Transaksi lunas"}</p>
                  </div>
                </div>
              ))}
          </div>
        )}

        {detailPaymentData && detailPaymentData.latestStatus.status === StatusPayment.PENDING && (
          <div className="mt-5 grid grid-cols-1 gap-2">
            <a href={`https://wa.me/6285190079298?text=Halo%20Admin%20JCC%2C%20izin%20mengirimkan%20bukti%20transfer%20pendaftaran%20kolektif%20dengan%20id%20invoice%20yaitu%20${detailPaymentData.invoice}%0ANominal%3A%20${detailPaymentData.amount}%0ATerima%20kasih%20atas%20perhatiannya%C2%A0admin.`} target="_blank">
              <button className="bg-primary w-full rounded-lg bg-base-purple p-2 text-white">Kirim Bukti Pembayaran</button>
            </a>
            <button onClick={handleSubmitStatusPayment} className="bg-primary w-full rounded-lg bg-base-green p-2 text-white">
              Tandai Sudah Membayar
            </button>
          </div>
        )}

        <div></div>
      </div>
    </ContainerFacilitator>
  );
};

export default Participants;
