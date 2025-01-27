import React from "react";

const Table = () => {
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
          <tr className="">
            <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
              1/1/25
            </th>
            <td className="px-6 py-4">Silver</td>
            <td className="px-6 py-4">Math</td>
            <td className="px-6 py-4">80</td>
          </tr>
          <tr className="">
            <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
              1/1/25
            </th>
            <td className="px-6 py-4">White</td>
            <td className="px-6 py-4">Math</td>
            <td className="px-6 py-4">80</td>
          </tr>
          <tr className="">
            <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
              1/1/25
            </th>
            <td className="px-6 py-4">Black</td>
            <td className="px-6 py-4">Math</td>
            <td className="px-6 py-4">80</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;
