import Link from "next/link";
import React from "react";
import { dataDummy } from "./data";
import { useRouter } from "next/navigation";

const Table = () => {
  const router = useRouter();

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right">
        <thead className="border-b text-xs uppercase text-gray-700">
          <tr>
            <th scope="col" className="px-6 py-3">
              Date
            </th>
            <th scope="col" className="px-6 py-3">
              Season
            </th>
            <th scope="col" className="px-6 py-3">
              Subject
            </th>
            <th scope="col" className="px-6 py-3">
              Score
            </th>
          </tr>
        </thead>
        <tbody>
          {dataDummy.map((row, index) => (
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
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
