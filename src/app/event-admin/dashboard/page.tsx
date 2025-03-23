"use client";
import { useRegional } from "@/hooks/regional/useRegional";
import { IReportDataResponse } from "@/hooks/statistics/types";
import { useStatistics } from "@/hooks/statistics/useStatistics";
import { IRegional } from "@/types/global";
import React, { useEffect, useState } from "react";
import { FaUserGroup } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";

const DashboardEventAdmin = () => {
  const { listRegional } = useRegional();
  const { statisticReport } = useStatistics();

  const [regional, setRegional] = useState<IRegional[]>([]);
  const [selectedRegional, setSelectedRegional] = useState<string>("all");
  const [report, setReport] = useState<IReportDataResponse>();
  const [allClasses, setAllClasses] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const handleSearchButton = async () => {
    if (selectedRegional) {
      try {
        if (selectedRegional === "all") {
          const response = await statisticReport();
          setReport(response);
        } else {
          const response = await statisticReport(selectedRegional);
          setReport(response);
        }
      } catch (error) {
        console.error("Failed to fetch roles:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    const fetchRegional = async () => {
      try {
        setLoading(true);
        const response = await listRegional();
        setRegional(response);
      } catch (error) {
        console.error("Failed to fetch roles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRegional();
  }, []);

  useEffect(() => {
    const fetchStatistic = async () => {
      try {
        if (regional) {
          const response = await statisticReport();
          setReport(response);
        }
      } catch (error) {
        console.error("Failed to fetch roles:", error);
      } finally {
        setLoading(false);
      }
    };

    if (selectedRegional) {
      fetchStatistic();
    }
  }, [regional]);

  useEffect(() => {
    if (report) {
      const allClasses = Object.entries(report).flatMap(([stage, levels]) =>
        Object.keys(levels).map((level) => ({
          stage,
          level,
          subjects: levels[level],
        })),
      );
      setAllClasses(allClasses);
    }
  }, [report]);

  return (
    <div className="mb-16">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <div className="mt-5 grid grid-cols-1 gap-3">
        <div className="flex gap-5">
          <div>
            <select value={selectedRegional} onChange={(e) => setSelectedRegional(e.target.value)} id="regional" className="w-full rounded-lg border-gray-200 bg-gray-50 p-2.5 text-sm text-gray-500 focus:border-blue-500 focus:ring-blue-500">
              <option value="all">Semua Regional</option>
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
            <button onClick={handleSearchButton} type="button" className="me-2 inline-flex items-center gap-2 rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300">
              <IoSearch />
              Cari
            </button>
          </div>
        </div>

        {/* statistic */}
        <div className="mt-5">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
            <div className="flex flex-col items-center gap-2 rounded-lg bg-green-50 p-5">
              <div className="w-fit rounded-full bg-green-600 p-3 text-white">
                <FaUserGroup />
              </div>
              <p>Jumlah Peserta</p>
              <p className="text-2xl font-semibold">{report?.grandTotal}</p>
            </div>
            <div className="flex flex-col items-center gap-2 rounded-lg bg-yellow-50 p-5">
              <div className="w-fit rounded-full bg-yellow-400 p-3 text-white">
                <FaUserGroup />
              </div>
              <p>Peserta TK</p>
              <p className="text-2xl font-semibold">{report?.totalPerStage.TK}</p>
            </div>
            <div className="flex flex-col items-center gap-2 rounded-lg bg-red-50 p-5">
              <div className="w-fit rounded-full bg-red-600 p-3 text-white">
                <FaUserGroup />
              </div>
              <p>Peserta SD</p>
              <p className="text-2xl font-semibold">{report?.totalPerStage.SD}</p>
            </div>
            <div className="flex flex-col items-center gap-2 rounded-lg bg-blue-50 p-5">
              <div className="w-fit rounded-full bg-blue-600 p-3 text-white">
                <FaUserGroup />
              </div>
              <p>Peserta SMP</p>
              <p className="text-2xl font-semibold">{report?.totalPerStage.SMP}</p>
            </div>
          </div>
        </div>

        {/* table */}
        <div className="mt-5">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-left text-sm text-gray-500 rtl:text-right">
              <thead className="text-xs uppercase text-gray-700">
                <tr>
                  <th scope="col" className="bg-gray-100 px-6 py-3">
                    Kelas
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Bahasa Inggris
                  </th>
                  <th scope="col" className="bg-gray-100 px-6 py-3">
                    IPS
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Matematika
                  </th>
                  <th scope="col" className="bg-gray-100 px-6 py-3">
                    Sains
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Grand Total
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <th scope="row" className="whitespace-nowrap bg-gray-100 px-6 py-4 font-medium text-gray-900">
                    1 TK/RA
                  </th>
                  <td className="px-6 py-4">{report?.report.TK["1"]["bahasa inggris"]}</td>
                  <td className="bg-gray-100 px-6 py-4">{report?.report.TK["1"]["ips"]}</td>
                  <td className="px-6 py-4">{report?.report.TK["1"]["matematika"]}</td>
                  <td className="bg-gray-100 px-6 py-4">{report?.report.TK["1"]["ipa"]}</td>
                  <td className="px-6 py-4">{report?.totalPerLevel.TK["1"]}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <th scope="row" className="whitespace-nowrap bg-gray-100 px-6 py-4 font-medium text-gray-900">
                    1 SD/MI
                  </th>
                  <td className="px-6 py-4">{report?.report.SD["1"]["bahasa inggris"]}</td>
                  <td className="bg-gray-100 px-6 py-4">{report?.report.SD["1"]["ips"]}</td>
                  <td className="px-6 py-4">{report?.report.SD["1"]["matematika"]}</td>
                  <td className="bg-gray-100 px-6 py-4">{report?.report.SD["1"]["ipa"]}</td>
                  <td className="px-6 py-4">{report?.totalPerLevel.SD["1"]}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <th scope="row" className="whitespace-nowrap bg-gray-100 px-6 py-4 font-medium text-gray-900">
                    2 SD/MI
                  </th>
                  <td className="px-6 py-4">{report?.report.SD["2"]["bahasa inggris"]}</td>
                  <td className="bg-gray-100 px-6 py-4">{report?.report.SD["2"]["ips"]}</td>
                  <td className="px-6 py-4">{report?.report.SD["2"]["matematika"]}</td>
                  <td className="bg-gray-100 px-6 py-4">{report?.report.SD["2"]["ipa"]}</td>
                  <td className="px-6 py-4">{report?.totalPerLevel.SD["2"]}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <th scope="row" className="whitespace-nowrap bg-gray-100 px-6 py-4 font-medium text-gray-900">
                    3 SD/MI
                  </th>
                  <td className="px-6 py-4">{report?.report.SD["3"]["bahasa inggris"]}</td>
                  <td className="bg-gray-100 px-6 py-4">{report?.report.SD["3"]["ips"]}</td>
                  <td className="px-6 py-4">{report?.report.SD["3"]["matematika"]}</td>
                  <td className="bg-gray-100 px-6 py-4">{report?.report.SD["3"]["ipa"]}</td>
                  <td className="px-6 py-4">{report?.totalPerLevel.SD["3"]}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <th scope="row" className="whitespace-nowrap bg-gray-100 px-6 py-4 font-medium text-gray-900">
                    4 SD/MI
                  </th>
                  <td className="px-6 py-4">{report?.report.SD["4"]["bahasa inggris"]}</td>
                  <td className="bg-gray-100 px-6 py-4">{report?.report.SD["4"]["ips"]}</td>
                  <td className="px-6 py-4">{report?.report.SD["4"]["matematika"]}</td>
                  <td className="bg-gray-100 px-6 py-4">{report?.report.SD["4"]["ipa"]}</td>
                  <td className="px-6 py-4">{report?.totalPerLevel.SD["4"]}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <th scope="row" className="whitespace-nowrap bg-gray-100 px-6 py-4 font-medium text-gray-900">
                    5 SD/MI
                  </th>
                  <td className="px-6 py-4">{report?.report.SD["5"]["bahasa inggris"]}</td>
                  <td className="bg-gray-100 px-6 py-4">{report?.report.SD["5"]["ips"]}</td>
                  <td className="px-6 py-4">{report?.report.SD["5"]["matematika"]}</td>
                  <td className="bg-gray-100 px-6 py-4">{report?.report.SD["5"]["ipa"]}</td>
                  <td className="px-6 py-4">{report?.totalPerLevel.SD["5"]}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <th scope="row" className="whitespace-nowrap bg-gray-100 px-6 py-4 font-medium text-gray-900">
                    6 SD/MI
                  </th>
                  <td className="px-6 py-4">{report?.report.SD["6"]["bahasa inggris"]}</td>
                  <td className="bg-gray-100 px-6 py-4">{report?.report.SD["6"]["ips"]}</td>
                  <td className="px-6 py-4">{report?.report.SD["6"]["matematika"]}</td>
                  <td className="bg-gray-100 px-6 py-4">{report?.report.SD["6"]["ipa"]}</td>
                  <td className="px-6 py-4">{report?.totalPerLevel.SD["6"]}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <th scope="row" className="whitespace-nowrap bg-gray-100 px-6 py-4 font-medium text-gray-900">
                    7 SMP/MTs
                  </th>
                  <td className="px-6 py-4">{report?.report.SMP["1"]["bahasa inggris"]}</td>
                  <td className="bg-gray-100 px-6 py-4">{report?.report.SMP["1"]["ips"]}</td>
                  <td className="px-6 py-4">{report?.report.SMP["1"]["matematika"]}</td>
                  <td className="bg-gray-100 px-6 py-4">{report?.report.SMP["1"]["ipa"]}</td>
                  <td className="px-6 py-4">{report?.totalPerLevel.SMP["1"]}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <th scope="row" className="whitespace-nowrap bg-gray-100 px-6 py-4 font-medium text-gray-900">
                    8 SMP/MTs
                  </th>
                  <td className="px-6 py-4">{report?.report.SMP["2"]["bahasa inggris"]}</td>
                  <td className="bg-gray-100 px-6 py-4">{report?.report.SMP["2"]["ips"]}</td>
                  <td className="px-6 py-4">{report?.report.SMP["2"]["matematika"]}</td>
                  <td className="bg-gray-100 px-6 py-4">{report?.report.SMP["2"]["ipa"]}</td>
                  <td className="px-6 py-4">{report?.totalPerLevel.SMP["2"]}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <th scope="row" className="whitespace-nowrap bg-gray-100 px-6 py-4 font-medium text-gray-900">
                    9 SMP/MTs
                  </th>
                  <td className="px-6 py-4">{report?.report.SMP["3"]["bahasa inggris"]}</td>
                  <td className="bg-gray-100 px-6 py-4">{report?.report.SMP["3"]["ips"]}</td>
                  <td className="px-6 py-4">{report?.report.SMP["3"]["matematika"]}</td>
                  <td className="bg-gray-100 px-6 py-4">{report?.report.SMP["3"]["ipa"]}</td>
                  <td className="px-6 py-4">{report?.totalPerLevel.SMP["3"]}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <th scope="row" className="whitespace-nowrap bg-red-100 px-6 py-4 font-medium text-gray-900">
                    Grand Total
                  </th>
                  <td className="bg-red-100 px-6 py-4">{report?.totalPerSubject["bahasa inggris"]}</td>
                  <td className="bg-red-100 px-6 py-4">{report?.totalPerSubject["ips"]}</td>
                  <td className="bg-red-100 px-6 py-4">{report?.totalPerSubject["matematika"]}</td>
                  <td className="bg-red-100 px-6 py-4">{report?.totalPerSubject["ipa"]}</td>
                  <td className="bg-red-100 px-6 py-4 font-bold">{report?.grandTotal}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardEventAdmin;
