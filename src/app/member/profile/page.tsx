"use client";
import Navbar from "@/components/module/Navbar";
import { navbarMenuMember } from "@/data/navbarMember";
import React, { useEffect, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { PiStudentFill } from "react-icons/pi";
import { BsCalendar2DateFill } from "react-icons/bs";
import { CgGenderFemale } from "react-icons/cg";
import { FaPhone, FaRegUser } from "react-icons/fa";
import Container from "@/components/base/Container";
import { useRouter } from "next/navigation";
import { useStudent } from "@/hooks/student/useStudent";
import { IStudentInfo } from "@/hooks/student/type";
import SkeletonLoader from "@/components/base/SkeletonLoader";
import { FaIdCardClip } from "react-icons/fa6";
import { BiSolidSchool } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { useProfileStore } from "@/hooks/profile/useProfile";

const Profile = () => {
  const { updateUser } = useProfileStore();

  const [isScrolled, setIsScrolled] = useState(false);
  const [dataProfile, setDataProfile] = useState<IStudentInfo>();
  const [isLoading, setIsLoading] = useState(true);
  const [isOpenModalPassword, setIsOpenModalPassword] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [repeatpassword, setRepeatPassword] = useState<string>("");
  const [isLoadingSubmit, setIsLoadingSubmit] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  // const [levelInfo, setLevelInfo] = useState<LevelInfo>();

  // Hooks
  const router = useRouter();
  const { profile } = useStudent();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoadingSubmit(true);
      await updateUser({
        password: password,
      });
    } catch (error) {
      console.error("Failed to update password:", error);
    } finally {
      setIsLoadingSubmit(false);
      setIsOpenModalPassword(false);
    }
  };

  // UseEffect
  // Mengambil data profile saat pertama kali render
  useEffect(() => {
    const handleGetStudentProfile = async () => {
      setIsLoading(true);
      try {
        const res = await profile();
        setDataProfile(res);
      } catch (error) {
        setIsLoading(false);
        console.error("Failed to fetch profile:", error);
      } finally {
        setIsLoading(false);
      }
    };
    handleGetStudentProfile();

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (password === repeatpassword && password && repeatpassword) {
      setIsDisabled(false);
    }
  }, [password, repeatpassword]);

  // useEffect(() => {
  //   if (dataProfile) {
  //     setLevelInfo(getLevelInfo(dataProfile.poin));
  //   }
  // }, [dataProfile]);

  return (
    <div className="min-h-screen bg-base-gray">
      {/* nav */}
      <Navbar menu={navbarMenuMember} isScrolled={isScrolled} isLogged title="Profile" />
      <Container>
        {/* main */}
        <div className="grid grid-cols-1 gap-4 px-4">
          {/* header */}
          {isLoading ? (
            <SkeletonLoader rows={4} />
          ) : (
            <div className="rounded-lg bg-base-green p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div>
                    <img className="h-10 w-10 rounded-full object-cover object-center" src="/img/profileImg.jpeg" alt="avatar" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-white">{`Halo, ${dataProfile?.name?.split(" ")[0] || ""}`}</p>
                    <p className="text-sm text-green-800">{dataProfile?.username}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {/* <div className="mr-2 text-center text-white">
                    <p className="text-lg font-bold">{dataProfile?.poin}</p>
                    <p className="text-sm">poin</p>
                  </div> */}
                  <button
                    type="button"
                    onClick={() => {
                      router.push("/member/profile/edit");
                    }}
                    className="inline-flex h-fit items-center rounded-full bg-white p-3 text-center text-base-green"
                  >
                    <AiFillEdit />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* main */}
          {isLoading ? (
            <SkeletonLoader rows={4} />
          ) : (
            <>
              <div className="rounded-lg bg-white p-4">
                {/* biodata */}
                <div>
                  <p className="mb-4 font-semibold text-neutral-700">Biodata</p>
                  <div className="grid grid-cols-1 gap-5 ps-5">
                    <div className="flex items-center gap-3">
                      <div className="h-fit w-fit rounded-full bg-teal-100 p-3 text-lg text-teal-500">
                        <FaRegUser />
                      </div>
                      <div>
                        <p className="text-sm italic text-gray-400">nama</p>
                        <p className="font-medium text-neutral-700">{dataProfile?.name}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-fit w-fit rounded-full bg-teal-100 p-3 text-lg text-teal-500">
                        <FaIdCardClip />
                      </div>
                      <div>
                        <p className="text-sm italic text-gray-400">nik</p>
                        <p className="font-medium text-neutral-700">{dataProfile?.nik}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-fit w-fit rounded-full bg-teal-100 p-3 text-lg text-teal-500">
                        <BsCalendar2DateFill />
                      </div>
                      <div>
                        <p className="text-sm italic text-gray-400">tanggal lahir</p>
                        <p className="font-medium text-neutral-700">{dataProfile?.birthdate ? new Date(Number(dataProfile.birthdate) * 1000).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) : ""}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-fit w-fit rounded-full bg-teal-100 p-3 text-lg text-teal-500">
                        <BiSolidSchool />
                      </div>
                      <div>
                        <p className="text-sm italic text-gray-400">asal sekolah</p>
                        <p className="font-medium text-neutral-700">{dataProfile?.school}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-fit w-fit rounded-full bg-teal-100 p-3 text-lg text-teal-500">
                        <PiStudentFill />
                      </div>
                      <div>
                        <p className="text-sm italic text-gray-400">kelas</p>
                        <p className="font-medium text-neutral-700">{`Kelas ${dataProfile?.class} ${dataProfile?.stage}`}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-fit w-fit rounded-full bg-teal-100 p-3 text-lg text-teal-500">
                        <CgGenderFemale />
                      </div>
                      <div>
                        <p className="text-sm italic text-gray-400">jenis kelamin</p>
                        <p className="font-medium text-neutral-700">{dataProfile?.gender ? "Laki-laki" : "Perempuan"}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-fit w-fit rounded-full bg-teal-100 p-3 text-lg text-teal-500">
                        <FaPhone />
                      </div>
                      <div>
                        <p className="text-sm italic text-gray-400">nomer hp</p>
                        <p className="font-medium text-neutral-700">{dataProfile?.phoneNumber}</p>
                      </div>
                    </div>
                  </div>
                  <div className="mb-8 mt-12 text-center font-semibold text-blue-500">
                    <p onClick={() => setIsOpenModalPassword(true)}>Reset Password</p>
                  </div>
                </div>
              </div>
              {isOpenModalPassword && (
                <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="relative w-full max-w-2xl p-4">
                    <div className="relative rounded-lg bg-white shadow-lg">
                      <div className="flex items-center justify-between rounded-t border-b border-gray-200 p-4 md:p-5">
                        <h3 className="text-xl font-semibold text-gray-900">Ubah Password</h3>
                        <button onClick={() => setIsOpenModalPassword(false)} className="ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900">
                          <IoClose size={18} />
                        </button>
                      </div>
                      <div className="mt-6 flex px-6 pb-6">
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                          <div className="group relative z-0 mb-5 w-full">
                            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="floating_password" id="floating_password" className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0" placeholder=" " required />
                            <label htmlFor="floating_password" className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 rtl:peer-focus:translate-x-1/4">
                              Password<span className="text-red-500">*</span>
                            </label>
                            <p className="mt-2 text-xs italic text-gray-500">password minimal 8 karakter dan harus mengandung salah satu karakter !@#$%^&*_+\-=</p>
                          </div>
                          <div className="group relative z-0 mb-5 w-full">
                            <input value={repeatpassword} onChange={(e) => setRepeatPassword(e.target.value)} type="password" name="repeat_password" id="floating_repeat_password" className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0" placeholder=" " required />
                            <label htmlFor="floating_repeat_password" className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 rtl:peer-focus:translate-x-1/4">
                              Konfirmasi Password<span className="text-red-500">*</span>
                            </label>
                            {password !== repeatpassword && <p className="mt-2 text-xs text-red-500">password tidak sama</p>}
                          </div>
                          <button type="submit" disabled={isDisabled} className={`mt-2 w-full rounded-xl bg-[#5570F1] p-3 text-white ${isDisabled ? "opacity-50" : ""}`}>
                            {isLoadingSubmit ? "Loading" : "Simpan Perubahan"}
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Profile;
