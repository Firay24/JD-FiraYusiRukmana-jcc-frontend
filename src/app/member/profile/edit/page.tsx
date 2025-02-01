"use client";
import Container from "@/components/base/Container";
import { TPayloadUpdateProfile } from "@/hooks/profile/type";
import { useProfileStore } from "@/hooks/profile/useProfile";
import { TList } from "@/hooks/school/type";
import { useSchollStore } from "@/hooks/school/useSchool";
import { TPayloadSave, IStudentInfo } from "@/hooks/student/type";
import { useStudent } from "@/hooks/student/useStudent";
import { useAuthStore } from "@/state/auth.state";
import { ILabelValue } from "@/types/global";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const Edit = () => {
  // States
  const [image, setImage] = useState("");
  const [stage, setStage] = useState("TK");
  const classOptions = {
    TK: ["1"],
    SD: ["1", "2", "3", "4", "5", "6"],
    SMP: ["1", "2", "3"],
  };
  const [dataProfile, setDataProfile] = useState<IStudentInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingSchool, setIsLoadingSchool] = useState(false);
  const [listSchool, setListSchool] = useState<ILabelValue[]>([]);

  // Hooks
  const router = useRouter();
  const { profile, save } = useStudent();
  const { update } = useProfileStore();
  const { list } = useSchollStore();
  const { profile: authProfile } = useAuthStore();
  // useForm untuk menangani form
  const { register, handleSubmit, reset, setValue } = useForm<IStudentInfo>();

  // Functions
  const handleGetListSchool = async () => {
    setIsLoadingSchool(true);
    try {
      const res = await list(stage);
      const data = res;
      // Format data to array of object label value
      const formatted = data.map((item) => ({ label: item.name, value: item.id }));
      setListSchool(formatted);
    } catch (error) {
      console.error("Failed to fetch list school:", error);
    } finally {
      setIsLoadingSchool(false);
    }
  };

  // UseEffects

  // Mengambil data profile saat pertama kali render
  useEffect(() => {
    const handleGetStudentProfile = async () => {
      try {
        const res = await profile();
        // setDataProfile(res as TProfile);
        // Konversi class ke number saat menyimpan dataProfile
        setDataProfile({
          ...res,
          class: Number(res.class), // Konversi ke number
        });

        // Reset form dengan data profile yang diambil
        // reset(res);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };

    handleGetStudentProfile();
  }, []);

  // Handler untuk submit form
  const onSubmit = async (data: IStudentInfo) => {
    if (!authProfile) throw new Error("Auth Profile not found");

    setIsLoading(true);
    try {
      // Handle Save Student
      const payload: TPayloadSave = {
        ...(authProfile?.id ? { id: dataProfile?.id } : {}),
        address: data.address,
        stage: data.stage,
        class: data.class.toString(),
        nik: data.nik,
        schoolId: data.school,
        fatherName: data.fatherName,
        motherName: data.motherName,
        idUser: authProfile?.id,
      };

      const responseSaveStudent = await save(payload);

      if (responseSaveStudent.statusCode !== 200) {
        throw new Error(`Gagal menyimpan data student: ${responseSaveStudent.message}`);
      }

      // Handle Update Profile
      const payloadUpdateProfile: TPayloadUpdateProfile = {
        birthdate: new Date(data.birthdate).getTime(),
        name: data.name,
        gender: data.gender,
        phoneNumber: data.phoneNumber,
        username: data.username,
      };

      const responseUpdateProfile = await update(payloadUpdateProfile);

      if (responseUpdateProfile.statusCode !== 200) {
        throw new Error(`Gagal menyimpan data profile: ${responseUpdateProfile.message}`);
      }

      // Success, redirect
      router.push("/member/profile");
    } catch (error) {
      console.error("Failed to save student:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Reset Form
  useEffect(() => {
    if (dataProfile) {
      const epoch = Number(dataProfile.birthdate) * 1000; // Konversi ke milidetik jika masih dalam detik
      const date = new Date(epoch);

      // Format YYYY-MM-DD untuk input date
      const formattedDate = date.toISOString().split("T")[0];

      reset({
        ...dataProfile,
        birthdate: formattedDate,
      });

      setStage(dataProfile.stage);
    }
  }, [dataProfile]);

  useEffect(() => {
    // Cari sekolah berdasarkan ID yang diterima dari server
    const selectedSchool = listSchool.find((item) => item.label === dataProfile?.school);
    setValue("school", selectedSchool ? selectedSchool.value : "", { shouldDirty: true });
  }, [dataProfile, listSchool]);

  // Menyesuaikan kelas berdasarkan stage yang dipilih
  useEffect(() => {
    setValue("class", classOptions[stage][0]); // Atur default kelas
    handleGetListSchool();
  }, [stage, setValue]);

  return (
    <div className="min-h-screen bg-base-gray p-3">
      <Container>
        <div className="rounded-xl border bg-white p-5">
          <p className="text-2xl">Profile</p>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 flex flex-col gap-5">
            {/* Birthday */}
            <div className="w-full rounded-lg border p-1">
              <label htmlFor="birthdate" className="block ps-2 text-sm font-medium text-gray-600">
                Birthday
              </label>
              <input type="date" id="birthdate" {...register("birthdate")} className="mt-0 block w-full rounded-md border-0 p-2" />
            </div>

            {/* Gender */}
            <div className="w-full rounded-lg border p-1">
              <label htmlFor="gender" className="block ps-2 text-sm font-medium text-gray-600">
                Gender
              </label>
              <select id="gender" {...register("gender")} className="mt-0 block w-full rounded-md border-0 p-2">
                <option value="true">Laki-laki</option>
                <option value="false">Perempuan</option>
              </select>
            </div>

            {/* Phone */}
            <div className="w-full rounded-lg border p-1">
              <label htmlFor="phoneNumber" className="block ps-2 text-sm font-medium text-gray-600">
                Phone Number
              </label>
              <input type="text" id="phoneNumber" {...register("phoneNumber")} className="mt-0 block w-full rounded-md border-0 p-2" />
            </div>

            {/* NIK */}
            <div className="w-full rounded-lg border p-1">
              <label htmlFor="nik" className="block ps-2 text-sm font-medium text-gray-600">
                NIK
              </label>
              <input type="text" id="nik" {...register("nik")} className="mt-0 block w-full rounded-md border-0 p-2" />
            </div>

            {/* Photo
            <div className="w-full rounded-lg border p-1">
              <label htmlFor="photoPath" className="block ps-2 text-sm font-medium text-gray-600">
                Photo
              </label>
              <input
                type="file"
                id="photoPath"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setImage(URL.createObjectURL(e.target.files[0]));
                  }
                }}
                className="mt-0 block w-full rounded-md border-0 p-2"
              />
            </div>
            {image && (
              <div className="w-full rounded-lg border p-1">
                <label className="block ps-2 text-sm font-medium text-gray-600">Image Preview</label>
                <img src={image} alt="preview" className="w-full rounded-lg" />
              </div>
            )} */}

            {/* Stage */}
            <div className="w-full rounded-lg border p-1">
              <label htmlFor="stage" className="block ps-2 text-sm font-medium text-gray-600">
                Stage
              </label>
              <select id="stage" {...register("stage")} onChange={(e) => setStage(e.target.value as "tk" | "sd" | "smp")} className="mt-0 block w-full rounded-md border-0 p-2">
                <option value="TK">TK</option>
                <option value="SD">SD</option>
                <option value="SMP">SMP</option>
              </select>
            </div>

            {/* School */}
            <div className="w-full rounded-lg border p-1">
              <label htmlFor="school" className="block ps-2 text-sm font-medium text-gray-600">
                School
              </label>
              {/* <input type="text" id="school" {...register("school")} className="mt-0 block w-full rounded-md border-0 p-2" /> */}
              <select id="school" {...register("school")} defaultValue={dataProfile?.school} className="mt-0 block w-full rounded-md border-0 p-2">
                <option value="" disabled>
                  Pilih Sekolah
                </option>
                {listSchool.map((it, key) => (
                  <option key={key} value={it.value}>
                    {it.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Class */}
            <div className="w-full rounded-lg border p-1">
              <label htmlFor="class" className="block ps-2 text-sm font-medium text-gray-600">
                Class
              </label>
              <select id="class" {...register("class")} className="mt-0 block w-full rounded-md border-0 p-2">
                {classOptions[stage].map((cls) => (
                  <option key={cls} value={cls}>
                    {`Kelas ${cls}`}
                  </option>
                ))}
              </select>
            </div>

            {/* Father Name */}
            <div className="w-full rounded-lg border p-1">
              <label htmlFor="fatherName" className="block ps-2 text-sm font-medium text-gray-600">
                Father Name
              </label>
              <input type="text" id="fatherName" {...register("fatherName")} className="mt-0 block w-full rounded-md border-0 p-2" />
            </div>

            {/* Mother Name */}
            <div className="w-full rounded-lg border p-1">
              <label htmlFor="motherName" className="block ps-2 text-sm font-medium text-gray-600">
                Mother Name
              </label>
              <input type="text" id="motherName" {...register("motherName")} className="mt-0 block w-full rounded-md border-0 p-2" />
            </div>

            <button type="submit" className="mt-4 w-full rounded-xl bg-[#5570F1] px-4 py-4 text-white">
              {isLoading ? "Loading..." : "Simpan"}
            </button>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default Edit;
