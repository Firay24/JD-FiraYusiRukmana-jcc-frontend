"use client";
import Container from "@/components/base/Container";
import BackNavbar from "@/components/module/BackNavbar";
import { TSaveActivity } from "@/hooks/activity/types";
import { useActivity } from "@/hooks/activity/useActivity";
import { useEvent } from "@/hooks/event/useEvent";
import { IGetStudentInfo } from "@/hooks/student/type";
import { useStudent } from "@/hooks/student/useStudent";
import { useSubject } from "@/hooks/subject/useSubject";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { set } from "react-hook-form";

const CreateEvent = () => {
  const { profile } = useStudent();
  const { eventId } = useEvent();
  const { save } = useActivity();
  const { listSubject } = useSubject();
  const router = useRouter();
  const [subjectId, setSubjectId] = useState<string>("");
  const [studentProfile, setStudentProfile] = useState<IGetStudentInfo>();
  const [fields, setFields] = useState([{ level: "", subject: "" }]);
  const [activityId, setActivityId] = useState<string>("");

  const getLevelOptions = (schoolType: string) => {
    if (schoolType === "TK") return [1];
    if (schoolType === "SD") return [1, 2, 3, 4, 5, 6];
    if (schoolType === "SMP") return [1, 2, 3];
    return [];
  };

  const selectedSubjects = fields.map((field) => field.subject);
  const subjects = ["matematika", "ipa", "bahasa inggris", "ips"];

  // Pastikan stage aman untuk diakses
  const stage = studentProfile?.stage || "";
  const filteredSubjects = stage === "TK" ? subjects.filter((subj) => subj !== "ips") : subjects;

  const addField = () => {
    setFields([...fields, { level: "", subject: "" }]);
  };

  const removeField = (index: any) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const updateField = ({ index, key, value }: { index: any; key: any; value: any }) => {
    setFields(fields.map((field, i) => (i === index ? { ...field, [key]: value } : field)));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (studentProfile && subjectId) {
      const competitionId = await eventId({ stage: studentProfile.stage, level: fields[0].level, subjectId: subjectId });
      const payload: TSaveActivity = {
        studentId: studentProfile.id,
        competitionId: competitionId.id,
        attedance: false,
        score: 0,
        incorrect: null,
        correct: null,
        pathAnswer: null,
      };
      try {
        const activity = await save(payload);
        setActivityId(activity.id);
        router.push(`/member/event/invoice/${activity.id}`);
      } catch (error) {
        console.error("Save failed:", error);
      }
    }
  };

  useEffect(() => {
    const fetchStudentProfile = async () => {
      try {
        const response = await profile();
        setStudentProfile(response);
      } catch (error) {
        console.error("Error fetching student profile:", error);
      }
    };

    fetchStudentProfile();
  }, []);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await listSubject();
        const selectedSubjectId = response.find((subject) => subject.name === fields[0].subject)?.id;
        setSubjectId(selectedSubjectId || "");
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };

    fetchSubjects();
  }, [fields[0].subject]);

  return (
    <div className="min-h-screen bg-base-gray p-4">
      <Container>
        <div className="mb-6">
          <BackNavbar />
        </div>
        <div className="rounded-xl border bg-white p-7">
          <p className="text-start text-2xl font-normal">Daftar Perlombaan</p>
          <p className="mt-2 text-start text-sm font-normal text-neutral-600">Perhatikan bahwa setiap perlombaan dalam satu regional hanya dapat memilih satu mata pelajaran saja</p>
          <form onSubmit={handleSubmit}>
            <div className="mt-6 flex flex-col items-center gap-2">
              {fields.map((field, index) => (
                <div key={index} className="flex w-full flex-row items-center gap-2 text-neutral-500">
                  <select value={field.level} onChange={(e) => updateField({ index: index, key: "level", value: e.target.value })} className="w-full rounded-lg border border-neutral-300 p-2">
                    <option value="" disabled className="text-neutral-400">
                      Level
                    </option>
                    {studentProfile &&
                      getLevelOptions(studentProfile?.stage).map((level) => (
                        <option key={level} value={level}>
                          Level {level}
                        </option>
                      ))}
                  </select>

                  <select value={field.subject} onChange={(e) => updateField({ index: index, key: "subject", value: e.target.value })} className="w-full rounded-lg border border-neutral-300 p-2">
                    <option value="" disabled className="text-neutral-400">
                      Mapel
                    </option>
                    {filteredSubjects.map((subject) => (
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
              {/* <CiSquarePlus className="text-[1.8rem]" onClick={addField} /> */}
              {fields[0].subject === "" || fields[0].level === "" ? (
                <button disabled className="bg-primary mt-4 w-full cursor-not-allowed rounded-lg bg-base-purple p-2 text-white opacity-50">
                  Daftar
                </button>
              ) : (
                <button type="submit" className="bg-primary w-full rounded-lg bg-base-purple p-2 text-white">
                  Daftar
                </button>
              )}
            </div>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default CreateEvent;
