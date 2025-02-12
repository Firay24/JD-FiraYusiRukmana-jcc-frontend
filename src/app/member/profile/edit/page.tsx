"use client";
import Container from "@/components/base/Container";
import SkeletonLoader from "@/components/base/SkeletonLoader";
import BackNavbar from "@/components/module/BackNavbar";
import { useProfileStore } from "@/hooks/profile/useProfile";
import { useSchollStore } from "@/hooks/school/useSchool";
import { useStudent } from "@/hooks/student/useStudent";
import { ISelectReactForm, ProfileStudent } from "@/types/global";
import { convertDateToEpoch } from "@/utils/convertDateToEpoch";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ActionMeta, InputActionMeta, SingleValue } from "react-select";
import Select from "react-select";

const page = () => {
  const router = useRouter();
  const { list } = useSchollStore();
  const { profile, save } = useStudent();
  const { update, user } = useProfileStore();

  const [formData, setFormData] = useState<ProfileStudent>({
    id: "",
    idUser: "",
    username: "",
    name: "",
    email: "",
    birthdate: 0,
    gender: false,
    phoneNumber: "",
    address: "",
    photoPath: "",
    idSchool: "",
    school: "",
    stage: undefined,
    class: "",
    nik: "",
    fatherName: "",
    motherName: "",
  });
  const [schools, setSchools] = useState<ISelectReactForm[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingSubmit, setIsLoadingSubmit] = useState<boolean>(false);
  const classOptions = {
    TK: ["1"],
    SD: ["1", "2", "3", "4", "5", "6"],
    SMP: ["1", "2", "3"],
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoadingSubmit(true);
      console.log(formData);
      await update({
        username: formData.username,
        name: formData.name,
        email: formData.email,
        birthdate: formData.birthdate,
        gender: formData.gender,
        phoneNumber: formData.phoneNumber,
      });
      await save({
        id: formData.id ?? "",
        address: formData.address,
        class: formData.class,
        nik: formData.nik,
        stage: formData.stage as "TK" | "SD" | "SMP",
        schoolId: formData.idSchool,
        fatherName: formData.fatherName,
        motherName: formData.motherName,
        idUser: formData.idUser ?? "",
      });
    } catch (error) {
      console.error("Update failed:", error);
    } finally {
      setIsLoadingSubmit(false);
      router.replace("/member/profile");
    }
  };

  useEffect(() => {
    const fetchDataUser = async () => {
      try {
        setIsLoading(true);
        const responseUser = await user();
        const responsestudent = await profile();

        if (responseUser) {
          setFormData({
            id: responsestudent?.id || "",
            idUser: responseUser.id,
            username: responseUser.username,
            name: responseUser.name,
            email: responseUser.email,
            birthdate: responseUser.birthday,
            gender: responseUser.gender,
            phoneNumber: responseUser.phoneNumber,
            address: responsestudent?.address || "",
            photoPath: responsestudent?.photoPath || "",
            idSchool: responsestudent?.idSchool || "",
            school: responsestudent?.school || "",
            stage: (responsestudent?.stage as "TK" | "SD" | "SMP") || "TK",
            class: responsestudent?.class || "",
            nik: responsestudent?.nik || "",
            fatherName: responsestudent?.fatherName || "",
            motherName: responsestudent?.motherName || "",
          });
        }
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    fetchDataUser();
  }, []);

  useEffect(() => {
    const fetchDataSchool = async (stage: string) => {
      try {
        const responseSchools = await list(stage);
        if (responseSchools) {
          const schoolOption = responseSchools.map((item) => ({
            label: item.name,
            value: item.id,
          }));
          setSchools(schoolOption);
        }
      } catch (error) {
        console.error(error);
      }
    };
    if (formData?.stage) {
      fetchDataSchool(formData?.stage);
    }
  }, [formData?.stage]);

  return (
    <div className="min-h-screen bg-base-gray p-3">
      <Container>
        <div className="mb-6">
          <BackNavbar href="/member/profile" />
        </div>
        {isLoading ? (
          <SkeletonLoader rows={4} />
        ) : (
          <div className="rounded-xl border bg-white p-5 pb-16">
            <p className="text-2xl">Profile</p>
            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-5">
              <div className="group relative z-0 mb-5 w-full">
                <input value={formData?.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} type="text" name="floating_name" id="floating_name" className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0" placeholder=" " required />
                <label htmlFor="floating_name" className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4">
                  Name <span className="text-red-500">*</span>
                </label>
              </div>
              <div className="group relative z-0 mb-5 w-full">
                <input value={formData?.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} type="text" name="floating_username" id="floating_username" className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0" placeholder=" " required />
                <label htmlFor="floating_username" className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4">
                  Username <span className="text-red-500">*</span>
                </label>
              </div>
              <div className="group relative z-0 mb-5 w-full">
                <input value={formData?.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} type="email" name="floating_email" id="floating_email" className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0" placeholder=" " />
                <label htmlFor="floating_email" className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4">
                  Email
                </label>
              </div>
              <div className="group relative z-0 mb-5 w-full">
                <label htmlFor="stage" className="mb-2 block text-sm text-gray-500">
                  Jenjang <span className="text-red-500">*</span>
                </label>
                <select value={formData?.stage} onChange={(e) => setFormData({ ...formData, stage: e.target.value as "TK" | "SD" | "SMP" })} id="stage" className="w-full border-none bg-gray-50 p-2.5 text-sm text-gray-500 focus:border-blue-500 focus:ring-blue-500">
                  <option value="TK">TK</option>
                  <option value="SD">SD</option>
                  <option value="SMP">SMP</option>
                </select>
              </div>
              <div className="group relative z-0 mb-5 w-full">
                <label htmlFor="classes" className="mb-2 block text-sm text-gray-500">
                  Kelas <span className="text-red-500">*</span>
                </label>
                <select value={formData?.class} onChange={(e) => setFormData({ ...formData, class: e.target.value })} id="classes" className="w-full border-none bg-gray-50 p-2.5 text-sm text-gray-500 focus:border-blue-500 focus:ring-blue-500">
                  {classOptions[formData.stage as "TK" | "SD" | "SMP"]?.map((option, index) => (
                    <option key={index} value={option}>
                      {`Kelas ${option}`}
                    </option>
                  ))}
                </select>
              </div>
              <div className="group relative z-10 mb-5 w-full">
                <label htmlFor="school" className="mb-2 block text-sm text-gray-500">
                  Asal Sekolah <span className="text-red-500">*</span>
                </label>
                <Select
                  styles={{
                    input: (base) => ({
                      ...base,
                      "input:focus": {
                        boxShadow: "none",
                      },
                    }),
                    control: (provided) => ({
                      ...provided,
                      border: "none",
                      boxShadow: "none",
                    }),
                  }}
                  className="basic-single"
                  classNamePrefix="select"
                  value={schools.find((s) => s.value === formData?.idSchool) ?? null}
                  isSearchable={true}
                  name="school"
                  id="shool"
                  options={schools}
                  onChange={(e) => setFormData({ ...formData, idSchool: e?.value ?? "" })}
                />
              </div>
              <div className="group relative z-0 mb-5 w-full">
                <input value={formData.birthdate ? new Date(formData.birthdate * 1000).toISOString().split("T")[0] : ""} onChange={(e) => setFormData({ ...formData, birthdate: convertDateToEpoch(e.target.value) })} type="date" name="floating_birthdate" id="floating_birthdate" className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0" placeholder=" " required />
                <label htmlFor="floating_birthdate" className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4">
                  Birthdate <span className="text-red-500">*</span>
                </label>
              </div>
              <div className="group relative z-0 mb-5 w-full">
                <label htmlFor="gender" className="mb-2 block text-sm text-gray-500">
                  Jenis kelamin <span className="text-red-500">*</span>
                </label>
                <select value={formData?.gender ? "laki-laki" : "perempuan"} onChange={(e) => setFormData({ ...formData, gender: e.target.value === "laki-laki" ? true : false })} id="gender" className="w-full border-none bg-gray-50 p-2.5 text-sm text-gray-500 focus:border-blue-500 focus:ring-blue-500">
                  <option value="laki-laki">Laki-laki</option>
                  <option value="perempuan">Perempuan</option>
                </select>
              </div>
              <div className="group relative z-0 mb-5 w-full">
                <input value={formData?.phoneNumber} onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value.toString() })} type="number" name="floating_phonenumber" id="floating_phonenumber" className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0" placeholder=" " required />
                <label htmlFor="floating_phonenumber" className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4">
                  Nomer HP <span className="text-red-500">*</span>
                </label>
              </div>
              <div className="group relative z-0 mb-5 w-full">
                <input value={formData?.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} type="text" name="floating_name" id="floating_name" className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0" placeholder=" " required />
                <label htmlFor="floating_name" className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4">
                  Alamat <span className="text-red-500">*</span>
                </label>
              </div>
              <div className="group relative z-0 mb-5 w-full">
                <input value={formData?.nik} onChange={(e) => setFormData({ ...formData, nik: e.target.value.toString() })} type="number" name="floating_nik" id="floating_nik" className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0" placeholder=" " required />
                <label htmlFor="floating_nik" className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4">
                  NIK <span className="text-red-500">*</span>
                </label>
              </div>
              <div className="group relative z-0 mb-5 w-full">
                <input value={formData?.fatherName} onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })} type="text" name="floating_fatherName" id="floating_fatherName" className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0" placeholder=" " required />
                <label htmlFor="floating_fatherName" className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4">
                  Nama Ayah <span className="text-red-500">*</span>
                </label>
              </div>
              <div className="group relative z-0 mb-5 w-full">
                <input value={formData?.motherName} onChange={(e) => setFormData({ ...formData, motherName: e.target.value })} type="text" name="floating_mother" id="floating_mother" className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0" placeholder=" " required />
                <label htmlFor="floating_mother" className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4">
                  Nama Ibu <span className="text-red-500">*</span>
                </label>
              </div>
              <button type="submit" className="mt-2 w-full rounded-xl bg-[#5570F1] p-3 text-white">
                {isLoadingSubmit ? "Loading" : "Simpan"}
              </button>
            </form>
          </div>
        )}
      </Container>
    </div>
  );
};

export default page;
