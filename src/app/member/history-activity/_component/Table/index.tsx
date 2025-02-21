import Link from "next/link";
import React from "react";
import { dataDummy } from "./data";
import { useRouter } from "next/navigation";
import { IListActivityStudent } from "@/hooks/activity/types";
import { convertEpochToDateShort } from "@/utils/convertEpochToDate";
import { FaFilePdf } from "react-icons/fa";

const Table = ({ listActivities }: { listActivities: IListActivityStudent[] }) => {
  const router = useRouter();

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right">
        <thead className="border-b text-xs uppercase text-gray-700">
          <tr>
            <th scope="col" className="px-6 py-3">
              Tanggal
            </th>
            <th scope="col" className="px-6 py-3">
              Matpel
            </th>
            <th scope="col" className="px-6 py-3">
              Score
            </th>
            <th scope="col" className="px-6 py-3">
              Regional
            </th>
          </tr>
        </thead>
        <tbody>
          {listActivities.map((row, index) => (
            <tr key={index} className="cursor-pointer hover:bg-gray-100">
              <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                {convertEpochToDateShort({ epoch: row.competition.date, showtime: false })}
              </th>
              <td className="px-6 py-4">{row.competition.subject}</td>
              <td className="px-6 py-4">{row.score}</td>
              <td className="px-6 py-4">{row.competition.region.name}</td>
              <td>
                <button onClick={() => router.push(`/member/history-activity/${row.competition.id}/${row.pathAnswer.split("\\")[1]}`)} type="button" className="me-2 inline-flex items-center rounded-full bg-blue-500 p-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300">
                  <FaFilePdf />
                </button>
              </td>
            </tr>
          ))}
          {/* {dataDummy.map((row, index) => (
            <tr
              key={index}
              onClick={() => {
                router.push("history-activity/evaluation");
              }}
              className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
                {row.date}
              </th>
              <td className="px-6 py-4">{row.season}</td>
              <td className="px-6 py-4">{row.subject}</td>
              <td className="px-6 py-4">{row.score}</td>
            </tr>
          ))} */}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
