"use client";
import SkeletonLoader from "@/components/base/SkeletonLoader";
import { useRegional } from "@/hooks/regional/useRegional";
import { IReportDataResponse } from "@/hooks/statistics/types";
import { ICompetitionRank, useStatistics } from "@/hooks/statistics/useStatistics";
import { IRegional } from "@/types/global";
import React, { useEffect, useState } from "react";
import { FaRegFileExcel } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { exportRankToExcel } from "./exportDataRankToExcel";
import { useActivity } from "@/hooks/activity/useActivity";

const DashboardEventAdmin = () => {
  const { listRegional } = useRegional();
  const { statisticRank } = useStatistics();
  const { updateAttedance } = useActivity();

  const [regional, setRegional] = useState<IRegional[]>([]);
  const [selectedRegional, setSelectedRegional] = useState<string>("4267114e46d4458dbcc8");
  const [report, setReport] = useState<ICompetitionRank[]>();
  const [allClasses, setAllClasses] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingExport, setLoadingExport] = useState<boolean>(false);

  const handleSearchButton = async () => {
    if (selectedRegional) {
      try {
        if (selectedRegional === "all") {
          const response = await statisticRank({ seasonId: "c2ea4ab1f7114bbb8058" });
          setReport(response);
        } else {
          const response = await statisticRank({ seasonId: "c2ea4ab1f7114bbb8058", regionId: selectedRegional });
          setReport(response);
        }
      } catch (error) {
        console.error("Failed to fetch roles:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleExport = async () => {
    setLoadingExport(true);

    try {
      if (report) {
        exportRankToExcel(report);
      } else {
        const response = await statisticRank({ seasonId: "c2ea4ab1f7114bbb8058", regionId: selectedRegional });
        exportRankToExcel(response);
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
          const response = await statisticRank({ seasonId: "c2ea4ab1f7114bbb8058", regionId: selectedRegional });
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

  // useEffect(() => {
  //   if (report) {
  //     const allClasses = Object.entries(report).flatMap(([stage, levels]) =>
  //       Object.keys(levels).map((level) => ({
  //         stage,
  //         level,
  //         subjects: levels[level],
  //       })),
  //     );
  //     setAllClasses(allClasses);
  //   }
  // }, [report]);

  return (
    <div className="mb-16">
      <h1 className="text-2xl font-semibold">Rangking</h1>
      <div className="mt-5 grid grid-cols-1 gap-3">
        <div className="grid grid-cols-1 gap-y-2 md:grid-cols-2">
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
          <div className="flex justify-end">
            <button onClick={handleExport} type="button" className="me-2 inline-flex w-full min-w-[200px] items-center justify-center gap-2 rounded-lg bg-green-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-blue-300 md:w-20">
              <FaRegFileExcel />
              <p>{loadingExport ? "Loading ..." : "Export Data"}</p>
            </button>
          </div>
        </div>

        {/* table */}
        <div className="mt-5">
          <div className="relative overflow-x-auto">
            {loading ? (
              <div className="grid grid-cols-1 gap-3">
                <SkeletonLoader rows={2} />
                <SkeletonLoader rows={2} />
                <SkeletonLoader rows={2} />
                <SkeletonLoader rows={2} />
              </div>
            ) : report && report.length > 0 ? (
              report.map((item, index) => (
                <div key={index} className="mb-6">
                  <p className="pb-2 font-semibold text-gray-700">{item.competitionName}</p>

                  {item.rank && item.rank.length > 0 ? (
                    <table className="w-full text-left text-sm text-gray-500 rtl:text-right">
                      <thead className="text-xs uppercase text-gray-700">
                        <tr>
                          <th scope="col" className="bg-gray-100 px-6 py-3">
                            No
                          </th>
                          <th scope="col" className="bg-gray-100 px-6 py-3">
                            Sertif
                          </th>
                          <th scope="col" className="bg-gray-100 px-6 py-3">
                            Nama
                          </th>
                          <th scope="col" className="bg-gray-100 px-6 py-3">
                            Sekolah
                          </th>
                          <th scope="col" className="bg-gray-100 px-6 py-3">
                            Nilai
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {item.rank.map((rankItem, rankIndex) => (
                          <tr key={rankIndex} className="border-b border-gray-200">
                            <td className="px-6 py-4">{rankIndex + 1}</td>
                            <td className="px-6 py-4">
                              <input
                                type="checkbox"
                                checked={rankItem.attedance || false}
                                onChange={async (e) => {
                                  const newChecked = e.target.checked;

                                  // Langsung update data lokal (state `report`)
                                  setReport((prevReport) => {
                                    if (!prevReport) return prevReport;
                                    return prevReport.map((competition) => ({
                                      ...competition,
                                      rank: competition.rank.map((r) => {
                                        if (r.id === rankItem.id) {
                                          return { ...r, attedance: newChecked };
                                        }
                                        return r;
                                      }),
                                    }));
                                  });

                                  // Baru kirim request ke server
                                  try {
                                    await updateAttedance({
                                      id: rankItem.id,
                                      attedance: newChecked,
                                    });
                                    console.log("Attendance updated");
                                  } catch (error) {
                                    console.error("Failed to update attendance", error);
                                    // OPTIONAL: Kalau gagal, rollback data
                                    setReport((prevReport) => {
                                      if (!prevReport) return prevReport;
                                      return prevReport.map((competition) => ({
                                        ...competition,
                                        rank: competition.rank.map((r) => {
                                          if (r.id === rankItem.id) {
                                            return { ...r, attedance: !newChecked };
                                          }
                                          return r;
                                        }),
                                      }));
                                    });
                                  }
                                }}
                                className="h-4 w-4 cursor-pointer rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                              />
                            </td>
                            <td className="px-6 py-4">{rankItem.name}</td>
                            <td className="px-6 py-4">{rankItem.school}</td>
                            <td className="px-6 py-4">{rankItem.score}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p className="italic text-gray-500">Tidak ada peserta</p>
                  )}
                </div>
              ))
            ) : (
              <p className="italic text-gray-500">Tidak ada data kompetisi</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardEventAdmin;
