"use client";
import SkeletonLoader from "@/components/base/SkeletonLoader";
import { useRegional } from "@/hooks/regional/useRegional";
import { ICompetitionRank, IListWinner, useStatistics } from "@/hooks/statistics/useStatistics";
import { IRegional } from "@/types/global";
import React, { useEffect, useRef, useState } from "react";
import { FaRegFileExcel } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { exportRankToExcel } from "./exportDataRankToExcel";
import { useActivity } from "@/hooks/activity/useActivity";
import { MdDownload } from "react-icons/md";
import Image from "next/image";
import CertifTemplate1 from "./templateJuara.png";
import CertifTemplate2 from "./templateTK.jpg";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import generateCertificateNumber from "@/utils/generateCertificateNumber";
import { convertEpochToDateLong } from "@/utils/convertEpochToDate";
import { toTitleCase } from "@/utils/toTitleCase";

const DashboardEventAdmin = () => {
  const { listRegional } = useRegional();
  const { statisticRank, listWinner } = useStatistics();
  const { updateAttedance } = useActivity();

  const [regional, setRegional] = useState<IRegional[]>([]);
  const [selectedRegional, setSelectedRegional] = useState<string>("96c3c7a9086642158d0a");
  // const [report, setReport] = useState<ICompetitionRank[]>();
  const [report, setReport] = useState<IListWinner[]>();
  const [allClasses, setAllClasses] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingExport, setLoadingExport] = useState<boolean>(false);

  const downloadPDF = async ({ id, name, category, subject, level, stage, competitionId }: { id: string; name: string; category: string; subject: string; level: number; stage: string; competitionId: string }) => {
    const certifElement = document.getElementById(id + competitionId);
    if (!certifElement) return;

    const canvas = await html2canvas(certifElement);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("landscape", "px", [canvas.width, canvas.height]);
    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save(`${subject.toUpperCase()}-${category.toUpperCase()}-${stage} ${level}-${name}.pdf`);
  };

  const handleSearchButton = async () => {
    if (selectedRegional) {
      try {
        const response = await listWinner(selectedRegional);
        setReport(response);
      } catch (error) {
        console.error("Failed to fetch roles:", error);
      } finally {
        setLoading(false);
      }
    }
  };
  // const handleSearchButton = async () => {
  //   if (selectedRegional) {
  //     try {
  //       if (selectedRegional === "all") {
  //         const response = await statisticRank({ seasonId: "c2ea4ab1f7114bbb8058" });
  //         setReport(response);
  //       } else {
  //         const response = await statisticRank({ seasonId: "c2ea4ab1f7114bbb8058", regionId: selectedRegional });
  //         setReport(response);
  //       }
  //     } catch (error) {
  //       console.error("Failed to fetch roles:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  // };

  const handleExport = async () => {
    setLoadingExport(true);

    try {
      if (report) {
        exportRankToExcel(report);
      } else {
        const response = await listWinner(selectedRegional);
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
          const response = await listWinner(selectedRegional);
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
                  <p className="pb-2 font-semibold text-gray-700">{item.name}</p>

                  {item.winner && item.winner.length > 0 ? (
                    <table className="w-full text-left text-sm text-gray-500 rtl:text-right">
                      <thead className="text-xs uppercase text-gray-700">
                        <tr>
                          <th scope="col" className="bg-gray-100 px-6 py-3">
                            No
                          </th>
                          <th scope="col" className="bg-gray-100 px-6 py-3">
                            Keterangan
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
                          <th scope="col" className="bg-gray-100 px-6 py-3">
                            Sertif
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {item.winner.map((rankItem, rankIndex) => (
                          <tr key={rankIndex} className="border-b border-gray-200">
                            <td className="px-6 py-4">{rankIndex + 1}</td>
                            <td className="px-6 py-4">{rankItem.category}</td>
                            <td className="px-6 py-4">{rankItem.name}</td>
                            <td className="px-6 py-4">{rankItem.school}</td>
                            <td className="px-6 py-4">{rankItem.score}</td>
                            <td className="px-6 py-4">
                              {rankItem.stage === "TK" ? (
                                <div id={rankItem.studentId + item.idCompetition} className="fixed left-1/2 top-1/2 -z-10 h-[794px] w-[1123px] -translate-x-1/2 -translate-y-1/2 font-monosugar">
                                  <Image src={CertifTemplate2} alt="Sertifikat Background" fill className="absolute h-full w-full object-cover" />
                                  {/* text */}
                                  <p className="absolute left-14 top-[25%] transform text-[20px] font-thin text-[#404040]">{`No. ${generateCertificateNumber(rankItem.certifNumber, item.date)}`}</p>
                                  <p className="absolute left-14 top-[36%] transform text-[33px] text-[#fe656e]">{toTitleCase(rankItem.name)}</p>
                                  <p className="absolute left-14 top-[44%] transform p-2 text-[30px] font-medium text-[#404040]" style={{ letterSpacing: "5px" }}>
                                    {`${rankItem.category.toUpperCase()} REGIONAL`}
                                  </p>
                                  <p className="absolute left-14 top-[54%] w-[65%] transform text-left text-[22px] font-thin text-[#404040]">
                                    bidang <span className="font-medium">{rankItem.subject.toUpperCase()}</span> dalam Junior National Olympiad (JUNIO),
                                  </p>
                                  <p className="absolute left-14 top-[57%] w-[50%] transform text-left text-[22px] font-thin leading-7 text-[#404040]" style={{ letterSpacing: "1px" }}>
                                    tingkat <span>{item.stage === "SMP" ? "SMP/MTs" : item.stage === "SD" ? "SD/MI" : "TK/RA"}</span> Kelas <span>{item.stage === "SMP" ? item.level + 6 : item.level}</span> yang diselenggarakan di <span>{item.location}</span>, <span className="font-bold"></span>
                                    {`${item.region}, pada `}
                                    <span>{`Minggu, ${convertEpochToDateLong(item.date)}`}</span>.
                                  </p>
                                </div>
                              ) : (
                                <div id={rankItem.studentId + item.idCompetition} className="fixed left-1/2 top-1/2 -z-10 h-[794px] w-[1123px] -translate-x-1/2 -translate-y-1/2">
                                  <Image src={CertifTemplate1} alt="Sertifikat Background" fill className="absolute h-full w-full object-cover" />
                                  <p className="absolute left-1/2 top-[28%] -translate-x-1/2 transform text-[22px] text-[#404040]">{`NO. ${generateCertificateNumber(rankItem.certifNumber, item.date)}`}</p>
                                  <p className="absolute left-1/2 top-[39%] -translate-x-1/2 transform text-[33px] text-[#f8bd34]">{toTitleCase(rankItem.name)}</p>
                                  <p className="absolute left-1/2 top-[52%] -translate-x-1/2 transform text-[30px] font-medium text-[#404040]" style={{ letterSpacing: "5px" }}>
                                    {`${rankItem.category.toUpperCase()} REGIONAL`}
                                  </p>
                                  <p className="absolute left-1/2 top-[58%] w-[65%] -translate-x-1/2 transform text-center text-[22px] text-[#404040]">
                                    bidang <span className="font-bold">{rankItem.subject.toUpperCase()}</span> dalam Junior National Olympiad (JUNIO),
                                  </p>
                                  <p className="absolute left-1/2 top-[61%] w-[65%] -translate-x-1/2 transform text-center text-[22px] leading-7 text-[#404040]" style={{}}>
                                    tingkat <span>{item.stage === "SMP" ? "SMP/MTs" : item.stage === "SD" ? "SD/MI" : "TK/RA"}</span> Kelas <span>{item.stage === "SMP" ? item.level + 6 : item.level}</span> yang diselenggarakan di <span>{item.location}</span>, <span className="font-bold"></span>
                                    {`${item.region}, pada `}
                                    <span className="font-bold">{`Minggu, ${convertEpochToDateLong(item.date)}`}</span>.
                                  </p>
                                </div>
                              )}
                              <button type="button" onClick={() => downloadPDF({ competitionId: item.idCompetition, id: rankItem.studentId, name: rankItem.name, category: rankItem.category, subject: item.subject, level: item.level, stage: item.stage })} className="me-2 inline-flex items-center rounded-lg bg-gray-400 p-2 text-center text-sm font-medium text-white hover:bg-gray-500 focus:outline-none focus:ring-4 focus:ring-blue-300">
                                <MdDownload />
                              </button>
                            </td>
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
