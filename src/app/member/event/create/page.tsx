"use client";
import Container from "@/components/base/Container";
import SkeletonLoader from "@/components/base/SkeletonLoader";
import BackNavbar from "@/components/module/BackNavbar";
import { useActivity } from "@/hooks/activity/useActivity";
import { useEvent } from "@/hooks/event/useEvent";
import { IGetStudentInfo } from "@/hooks/student/type";
import { useStudent } from "@/hooks/student/useStudent";
import { SubjectResponse, useSubject } from "@/hooks/subject/useSubject";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const EventCreate = () => {
  const router = useRouter();
  const { profile } = useStudent();
  const { listSubject } = useSubject();
  const { create } = useActivity();
  const { eventId } = useEvent();

  const [profileStudent, setProfileStuden] = useState<IGetStudentInfo>();
  const [subjects, setSubjects] = useState<SubjectResponse[]>([]);
  const [selectedSubjects, setSelectedSUbject] = useState<SubjectResponse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingSubmit, setIsLoadingSubmit] = useState<boolean>(false);

  const handleSelectSubject = (subject: SubjectResponse) => {
    setSelectedSUbject((prev) => {
      const isAlreadySelected = prev.some((s) => s.id === subject.id);

      if (isAlreadySelected) {
        return prev.filter((s) => s.id !== subject.id);
      } else {
        return [...prev, subject];
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const competitionIds: string[] = [];

    if (profileStudent) {
      for (const subject of selectedSubjects) {
        try {
          const responseCompetitionId = await eventId({
            stage: profileStudent.stage,
            level: profileStudent.class,
            subjectId: subject.id,
          });

          if (responseCompetitionId) {
            competitionIds.push(responseCompetitionId.id);
          }
        } catch (error) {
          console.error("Error fetching competition ID:", error);
        }
      }

      const priceList = [0, 70000, 130000, 180000, 220000];
      const totalAmount = priceList[competitionIds.length] || 0;

      try {
        setIsLoadingSubmit(true);
        await create({
          studentId: profileStudent.id,
          competitionId: competitionIds,
          attedance: false,
          score: 0,
          incorrect: 0,
          correct: 0,
          pathAnswer: "",
          amount: totalAmount,
        });
      } catch (error) {
      } finally {
        setIsLoadingSubmit(false);
        router.replace("/member/event");
      }
    }
  };

  useEffect(() => {
    const fetchMatpel = async () => {
      try {
        setIsLoading(true);
        const responseSubject = await listSubject();
        if (responseSubject) {
          setSubjects(responseSubject);
        }
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    const fetchProfileStudent = async () => {
      try {
        setIsLoading(true);
        const responseProfile = await profile();
        if (responseProfile) {
          setProfileStuden(responseProfile);
        }
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    fetchMatpel();
    fetchProfileStudent();
  }, []);

  return (
    <div className="min-h-screen bg-base-gray p-4">
      {isLoading ? (
        <div className="rounded-xl bg-white p-7">
          <SkeletonLoader rows={6} />
        </div>
      ) : (
        <Container>
          <div className="mb-6">
            <BackNavbar />
          </div>
          <div className="rounded-xl border bg-white p-7">
            <p className="text-start text-2xl font-normal">Daftar Perlombaan</p>
            <p className="mt-2 text-start text-sm font-normal text-neutral-600">Perhatikan bahwa peserta bisa memilih lomba lebih dari satu matpel</p>
            <form onSubmit={handleSubmit}>
              <div className="mt-6 grid grid-cols-1 gap-2">
                <label htmlFor="subject" className="mb-2 block text-sm font-medium text-gray-900">
                  Pilih Mata Pelajaran
                </label>
                <div className="grid grid-cols-1 gap-1">
                  {subjects &&
                    subjects.map((subject, index) => {
                      const isChecked = selectedSubjects.some((s) => s.id === subject.id);
                      return (
                        <div key={index} className="mb-4 flex items-center">
                          <input id={`checkbox-${subject.id}`} type="checkbox" checked={isChecked} onChange={() => handleSelectSubject(subject)} className="h-4 w-4 rounded-sm border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500" />
                          <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-900">
                            {subject.name === "ipa" || subject.name === "ips"
                              ? subject.name.toUpperCase()
                              : subject.name
                                  .split(" ")
                                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                                  .join(" ")}
                          </label>
                        </div>
                      );
                    })}
                </div>
                <button type="submit" className="mt-4 w-full rounded-xl bg-[#5570F1] p-3 text-white">
                  {isLoadingSubmit ? "Loading..." : "Simpan"}
                </button>
              </div>
            </form>
          </div>
        </Container>
      )}
    </div>
  );
};

export default EventCreate;
