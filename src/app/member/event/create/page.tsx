"use client";
import Container from "@/components/base/Container";
import { useStudent } from "@/hooks/student/useStudent";
import { IStudentInfo } from "@/types/student";
import React, { useEffect, useState } from "react";

const CreateEvent = () => {
  const { student } = useStudent();
  const [studentProfile, setStudentProfile] = useState<IStudentInfo>();
  const [fields, setFields] = useState([{ level: "", subject: "" }]);
  const selectedSubjects = fields.map((field) => field.subject);

  const getLevelOptions = (schoolType: string) => {
    if (schoolType === "tk") return [1];
    if (schoolType === "sd") return [1, 2, 3, 4, 5, 6];
    if (schoolType === "smp") return [1, 2, 3];
    return [];
  };

  const addField = () => {
    setFields([...fields, { level: "", subject: "" }]);
  };

  const removeField = (index: any) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const updateField = ({ index, key, value }: { index: any; key: any; value: any }) => {
    setFields(fields.map((field, i) => (i === index ? { ...field, [key]: value } : field)));
  };

  useEffect(() => {
    const fetchStudentProfile = async () => {
      try {
        const response = await student();
        setStudentProfile(response);
      } catch (error) {
        console.error("Error fetching student profile:", error);
      }
    };

    fetchStudentProfile();
  }, []);

  return (
    <div className="min-h-screen bg-base-gray p-4">
      <Container>
        <div className="rounded-xl border bg-white p-7">
          <p className="text-start text-2xl font-normal">Daftar Perlombaan</p>
          <p className="mt-2 text-start text-sm font-normal text-neutral-600">Perhatikan bahwa setiap perlombaan dalam satu regional hanya dapat memilih satu mata pelajaran saja</p>
          <div className="mt-6 flex flex-col items-center gap-2">
            {fields.map((field, index) => (
              <div key={index} className="flex w-full flex-row items-center gap-2 text-neutral-500">
                <select value={field.level} onChange={(e) => updateField({ index: index, key: "level", value: e.target.value })} className="w-full rounded-lg border border-neutral-300 p-2">
                  <option value="" disabled className="text-neutral-400">
                    Level
                  </option>
                  {studentProfile &&
                    getLevelOptions(studentProfile?.stage?.toLocaleLowerCase()).map((level) => (
                      <option key={level} value={level}>
                        Level {level}
                      </option>
                    ))}
                </select>

                <select value={field.subject} onChange={(e) => updateField({ index: index, key: "subject", value: e.target.value })} className="w-full rounded-lg border border-neutral-300 p-2">
                  <option value="" disabled className="text-neutral-400">
                    Mapel
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
            {/* <CiSquarePlus className="text-[1.8rem]" onClick={addField} /> */}
            {fields[0].subject === "" || fields[0].level === "" ? (
              <button disabled className="bg-primary mt-4 w-full cursor-not-allowed rounded-lg bg-base-purple p-2 text-white opacity-50">
                Daftar
              </button>
            ) : (
              <button className="bg-primary w-full rounded-lg bg-base-purple p-2 text-white">Daftar</button>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CreateEvent;
