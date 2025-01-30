"use client";
import Container from "@/components/base/Container";
import React, { useState } from "react";
import { CiSquarePlus } from "react-icons/ci";

const CreateEvent = () => {
  const [fields, setFields] = useState([{ level: "", subject: "" }]);
  const selectedSubjects = fields.map((field) => field.subject);
  const [statusInvoice, setStatusInvoice] = useState(false);

  const addField = () => {
    setFields([...fields, { level: "", subject: "" }]);
  };

  const removeField = (index: any) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const updateField = ({ index, key, value }: { index: any; key: any; value: any }) => {
    setFields(fields.map((field, i) => (i === index ? { ...field, [key]: value } : field)));
  };

  return (
    <div className="min-h-screen bg-base-gray p-4">
      <Container>
        <div className="rounded-xl border bg-white p-7">
          <p className="text-start text-2xl font-normal">Events</p>
          <div className="mt-8 flex flex-col items-center gap-2">
            {fields.map((field, index) => (
              <div key={index} className="flex w-full flex-row items-center gap-2">
                <select value={field.level} onChange={(e) => updateField({ index: index, key: "level", value: e.target.value })} className="w-full rounded-lg border border-neutral-300 p-2">
                  <option value="" disabled className="text-neutral-400">
                    Level
                  </option>
                  <option value="1">Level 1</option>
                  <option value="2">Level 2</option>
                  <option value="3">Level 3</option>
                  <option value="4">Level 4</option>
                  <option value="5">Level 5</option>
                  <option value="6">Level 6</option>
                </select>

                <select value={field.subject} onChange={(e) => updateField({ index: index, key: "subject", value: e.target.value })} className="w-full rounded-lg border border-neutral-300 p-2">
                  <option value="" disabled className="text-neutral-400">
                    Subject
                  </option>
                  {["matematika", "sains", "biologi"].map((subject) => (
                    <option key={subject} value={subject} disabled={selectedSubjects.includes(subject)}>
                      {subject.charAt(0).toUpperCase() + subject.slice(1)}
                    </option>
                  ))}
                </select>

                {fields.length > 1 && (
                  <button onClick={() => removeField(index)} className="text-red-500">
                    ✖
                  </button>
                )}
              </div>
            ))}
            <CiSquarePlus className="text-[1.8rem]" onClick={addField} />
            {fields[0].subject === "" || fields[0].level === "" ? (
              <button disabled className="bg-primary w-full cursor-not-allowed rounded-lg bg-base-purple p-2 text-white opacity-50">
                Daftar
              </button>
            ) : (
              <button className="bg-primary w-full rounded-lg bg-base-purple p-2 text-white">Daftar</button>
            )}
          </div>
        </div>

        {/* Invoice */}
        <div className="rounded-xl border bg-white p-7">
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-col gap-1">
              <p className="text-start text-2xl font-semibold">Invoice</p>
              <p className="text-sm text-neutral-600">12/22/2025 12:00 WIB</p>
            </div>
            {statusInvoice ? (
              <button className="mb-2 me-2 rounded-lg bg-base-green px-5 py-2.5 text-sm text-white">Lunas</button>
            ) : (
              <button type="button" className="mb-2 me-2 rounded-lg bg-base-pink px-5 py-2.5 text-sm font-medium text-white">
                Belum Bayar
              </button>
            )}
          </div>

          {/* ID Invoice */}
          <div className="mt-5 flex flex-row">
            <div className="flex w-full flex-col gap-1">
              <p className="text-sm font-semibold text-neutral-600">ID Invoice</p>
              <div className="flex w-full flex-row items-center justify-between">
                <p className="text-lg text-black">ASSASAQAMS61</p>
                <p className="text-lg font-semibold">Rp 150.000,00</p>
              </div>
            </div>
          </div>

          {/* Events */}
          <div className="mt-5 flex flex-col gap-2">
            <p className="text-sm font-semibold text-neutral-600">Events</p>
            <div className="flex w-full flex-col items-start">
              <p className="text-lg text-black">JCC S1 - SD/Mi sederajat Regional I</p>
              <p className="text-sm text-neutral-600">23 Februari 2025</p>
            </div>
          </div>
        </div>

        {/* Rincian Pembayaran */}
        <div className="mt-5 flex flex-col gap-2">
          {/* Rincian Pembayaran */}
          <div className="mt-5 rounded-lg bg-white p-5">
            <div className="relative overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right">
                <thead className="border-b border-gray-200 text-xs uppercase text-gray-700">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Subject
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Count
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
                      Math
                    </th>
                    <td className="px-6 py-4">1</td>
                    <td className="px-6 py-4">Rp75.000</td>
                  </tr>
                  <tr className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
                      Biology
                    </th>
                    <td className="px-6 py-4">1</td>
                    <td className="px-6 py-4">Rp75.000</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mb-3 border-b border-t pb-5 pt-5">
              <div className="flex justify-between">
                <p className="text-sm text-gray-500">Subtotal</p>
                <p className="text-sm">Rp150.000</p>
              </div>
              <div className="mt-2 flex justify-between">
                <p className="text-sm text-gray-500">Discount</p>
                <p className="text-sm">Rp0</p>
              </div>
            </div>
            <div className="mt-5 flex justify-between text-lg font-bold">
              <p className="text-sm font-medium text-base-pink">TOTAL</p>
              <p className="text-sm font-semibold">Rp150.000</p>
            </div>
          </div>
        </div>

        {/* Data Rekening Admin */}
        <div className="mt-5 flex flex-col gap-2 rounded-lg bg-white p-4">
          <div className="flex w-full flex-col items-start">
            <p className="text-sm font-semibold text-neutral-600">No Rekening</p>
            <div className="flex w-full flex-row items-center justify-between">
              <p className="text-lg font-normal">123456789</p>
              <p className="text-lg font-semibold text-black">BCA</p>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-neutral-600">Atas nama</p>
            <p className="text-lg font-normal text-black">Fira Yusi Rukmana</p>
          </div>
        </div>

        {/* Status Transaksi */}
        <div className="relative mt-5 rounded-lg bg-white p-4">
          {/* Garis timeline yang menyentuh titik */}
          <div className="absolute bottom-0 left-1/2 top-0 z-0 w-1 -translate-x-1/2 transform bg-gray-300"></div>

          {/* Item pertama */}
          <div className="relative grid grid-cols-3 items-center">
            <div className="pr-4 text-right">
              <p className="font-semibold text-gray-500">Transaksi</p>
              <p className="text-black">12/22/25 12:00 WIB</p>
            </div>
            <div className="relative flex justify-center">
              <div className="z-10 h-6 w-6 rounded-full bg-gray-300"></div>
            </div>
            <div className="pl-4">
              <p className="text-black">Pendaftaran events</p>
            </div>
          </div>

          {/* Item kedua */}
          <div className="relative mt-4 grid grid-cols-3 items-center">
            <div className="pr-4 text-right">
              <p className="font-semibold text-green-600">Completed</p>
              <p className="text-black">12/22/25 12:00 WIB</p>
            </div>
            <div className="relative flex justify-center">
              <div className="z-10 h-6 w-6 rounded-full bg-green-500"></div>
            </div>
            <div className="pl-4">
              <p className="text-black">Berhasil dikonfirmasi</p>
            </div>
          </div>
        </div>

        <button className="bg-primary mt-5 w-full rounded-lg bg-base-purple p-2 text-white">Konfirmasi Pembayaran</button>
      </Container>
    </div>
  );
};

export default CreateEvent;
