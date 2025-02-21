"use client";

import Card from "@/components/base/Card";
import Image from "next/image";
import logo_jcc from "@public/logo-jcc.png";
import { useRegister } from "@/hooks/auth/useSignup";
import { useEffect, useState } from "react";
import { Role } from "@/types/role";
import { useRole } from "@/hooks/role/useRole";
import { removeSpace } from "@/utils/removeSpace";
import { convertDateToEpoch } from "@/utils/convertDateToEpoch";
import SkeletonLoader from "@/components/base/SkeletonLoader";

interface RoleResponse {
  statusCode: number;
  message: string;
  data: Role[];
}

export default function page() {
  const { role } = useRole();
  const { register } = useRegister();

  const [roles, setRoles] = useState<Role[]>([]);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatpassword, setRepeatPassword] = useState<string>("");
  const [roleUser, setRoleUser] = useState<string>("participant");
  const [roleid, setRoleid] = useState<string>("");
  const [birthdate, setBirthdate] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [gender, setGender] = useState<string>("laki-laki");
  const [isLoadingLogged, setIsLoadingLogged] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoadingLogged(true);
      await register({
        username: username,
        name: name,
        email: email,
        password: password,
        roleId: roleid,
        birthdate: convertDateToEpoch(birthdate),
        gender: gender === "laki-laki" ? true : false,
        phoneNumber: phoneNumber,
      });
    } catch (error) {
      console.error("Failed to register:", error);
    } finally {
      setIsLoadingLogged(false);
    }
  };

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        setIsLoadingLogged(true);
        const response = await role();
        setRoles(response);
      } catch (error) {
        console.error("Failed to fetch roles:", error);
      } finally {
        setIsLoadingLogged(false);
      }
    };
    fetchRoles();
  }, []);

  useEffect(() => {
    const roleid = roles.find((role) => role.name.toLocaleLowerCase() === roleUser)?.id;
    setRoleid(roleid || "");
  }, [roles, roleUser]);

  return (
    <>
      {isLoadingLogged ? (
        <div className="p-5">
          <SkeletonLoader />
        </div>
      ) : (
        <main className="flex min-h-dvh items-center justify-center py-12">
          <div className="container max-w-[600px]">
            <div className="grid grid-cols-1 gap-10 pb-3">
              <Image src={logo_jcc} alt="Logo" width={200} height={86} className="mx-auto" />
              <p className="text-gray-600">Buat akun Anda</p>
            </div>
            <Card type="border" className="p-8">
              <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
                <div className="group relative z-0 w-full">
                  <div className="group relative z-0 mb-5 w-full">
                    <input value={name} onChange={(e) => setName(e.target.value)} type="text" name="floating_name" id="floating_name" className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0" placeholder=" " required />
                    <label htmlFor="floating_name" className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4">
                      Nama Lengkap <span className="text-red-500">*</span>
                    </label>
                  </div>
                  <div className="group relative z-0 mb-5 w-full">
                    <input value={username} onChange={(e) => setUsername(removeSpace(e.target.value))} type="text" name="floating_username" id="floating_username" className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0" placeholder=" " required />
                    <label htmlFor="floating_username" className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4">
                      Username<span className="text-red-500">*</span>
                    </label>
                    <p className="mt-2 text-xs italic text-gray-500">nama disertai angka, username harus unik</p>
                  </div>
                  <div className="group relative z-0 mb-5 w-full">
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="floating_password" id="floating_password" className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0" placeholder=" " required />
                    <label htmlFor="floating_password" className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 rtl:peer-focus:translate-x-1/4">
                      Password<span className="text-red-500">*</span>
                    </label>
                  </div>
                  <div className="group relative z-0 mb-5 w-full">
                    <input value={repeatpassword} onChange={(e) => setRepeatPassword(e.target.value)} type="password" name="repeat_password" id="floating_repeat_password" className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0" placeholder=" " required />
                    <label htmlFor="floating_repeat_password" className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 rtl:peer-focus:translate-x-1/4">
                      Konfirmasi Password<span className="text-red-500">*</span>
                    </label>
                    {password !== repeatpassword && <p className="mt-2 text-xs text-red-500">password tidak sama</p>}
                  </div>
                  <div className="group relative z-0 mb-5 w-full">
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="floating_email" id="floating_email" className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0" placeholder=" " />
                    <label htmlFor="floating_email" className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4">
                      Email
                    </label>
                    <p className="mt-2 text-xs text-gray-500">tidak wajib diisi</p>
                  </div>
                  <div className="group relative z-0 mb-8 w-full">
                    <input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} type="text" name="floating_username" id="floating_username" className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0" placeholder=" " required />
                    <label htmlFor="floating_username" className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4">
                      Nomer HP<span className="text-red-500">*</span>
                    </label>
                    <p className="mt-2 text-xs text-gray-500">contoh: 628523162829</p>
                  </div>
                  <div className="group relative z-0 mb-5 w-full">
                    <input value={birthdate} onChange={(e) => setBirthdate(e.target.value)} type="date" name="floating_birthdate" id="floating_birthdate" className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-500 focus:border-blue-600 focus:outline-none focus:ring-0" placeholder=" " required />
                    <label htmlFor="floating_birthdate" className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4">
                      Tanggal lahir<span className="text-red-500">*</span>
                    </label>
                  </div>
                  <div className="group relative z-0 mb-5 w-full">
                    <label htmlFor="gender" className="mb-2 block text-sm text-gray-500">
                      Jenis kelamin <span className="text-red-500">*</span>
                    </label>
                    <select value={gender} onChange={(e) => setGender(e.target.value)} id="gender" className="w-full border-none bg-gray-50 p-2.5 text-sm text-gray-500 focus:border-blue-500 focus:ring-blue-500">
                      <option value="laki-laki">Laki-laki</option>
                      <option value="perempuan">Perempuan</option>
                    </select>
                  </div>
                  <div className="group relative z-0 mb-5 w-full">
                    <label htmlFor="role" className="mb-2 block text-sm text-gray-500">
                      Daftar sebagai <span className="text-red-500">*</span>
                    </label>
                    <select value={roleUser} onChange={(e) => setRoleUser(e.target.value)} id="role" className="w-full border-none bg-gray-50 p-2.5 text-sm text-gray-500 focus:border-blue-500 focus:ring-blue-500">
                      <option value="participant">Peserta</option>
                      <option value="facilitator">Kolektif</option>
                    </select>
                  </div>
                </div>
                <button type="submit" className="w-full max-w-md rounded-full border border-gray-200 bg-[#0575E6] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#0369A1] focus:outline-none focus:ring-4 focus:ring-gray-100">
                  Daftar
                </button>
              </form>
            </Card>
          </div>
        </main>
      )}
    </>
  );
}
