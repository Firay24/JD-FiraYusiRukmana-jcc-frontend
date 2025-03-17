"use client";
import ContainerFacilitator from "@/components/base/Container-facilitator/page";
import SkeletonLoader from "@/components/base/SkeletonLoader";
import { IParticipantsList } from "@/hooks/student/type";
import { useStudent } from "@/hooks/student/useStudent";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Participants = () => {
  const params = useParams();
  const router = useRouter();
  const { listParticipantByKolektif } = useStudent();
  const [listParticipants, setListParticipants] = useState<IParticipantsList>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
  return (
    <ContainerFacilitator>
      <div className="px-4">
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

        {/* table */}
        <div className="mt-6">
          {isLoading ? (
            <div className="rounded-lg bg-white p-4">
              <SkeletonLoader rows={5} />
            </div>
          ) : (
            <table className="w-full text-left text-sm text-gray-500 rtl:text-right">
              <thead className="bg-gray-50 text-xs uppercase text-gray-700">
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
                </tr>
              </thead>
              <tbody>
                {listParticipants &&
                  listParticipants.participant.length > 0 &&
                  listParticipants.participant.map((participant, index) => (
                    <tr key={index} className="border-b border-gray-200 odd:bg-white even:bg-gray-50">
                      <td className="px-6 py-4">{index + 1}</td>
                      <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                        {participant.name}
                      </th>
                      <td className="px-6 py-4">{participant.username}</td>
                      <td className="px-6 py-4">{`${participant.class} ${participant.stage}`}</td>
                      <td className="px-6 py-4">{participant.subject}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </ContainerFacilitator>
  );
};

export default Participants;
