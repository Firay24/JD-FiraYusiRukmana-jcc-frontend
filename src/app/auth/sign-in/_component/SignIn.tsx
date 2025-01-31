"use client";

import { useLogin } from "@/hooks/auth/useLogin";
import logo_jcc from "@public/logo-jcc.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();
  const { login, logged } = useLogin();
  const [islogged, setIslogged] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(username, password);
      console.log("login success");
    } catch (error) {
      console.log("login failed");
    }
  };

  useEffect(() => {
    const checkLogged = async () => {
      try {
        const response = await logged();
        if (response) {
          setIslogged(true);
        } else {
          setIslogged(false);
        }
      } catch (error) {
        setIslogged(false);
      }
    };

    checkLogged();
  }, []);

  useEffect(() => {
    if (islogged) {
      router.push("/member");
    }
  }, [islogged]);

  return (
    <>
      <main className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="container flex max-w-screen-lg flex-col items-center justify-center space-y-10 md:flex-row md:space-x-10 md:space-y-0 lg:flex-row lg:space-x-20">
          {/* Logo */}
          <div className="flex flex-col items-center">
            <Image src={logo_jcc} alt="Logo" width={200} height={86} className="mx-auto" />

            {/* Form */}
            <form className="mx-auto mt-11 w-full max-w-md" onSubmit={handleSubmit}>
              <div className="relative mb-4 rounded-full border border-gray-300 bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500">
                {/* Ikon Username */}
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <input onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Username" className="w-full border-none bg-transparent p-2.5 pl-10 text-gray-900 focus:outline-none focus:ring-0" />
              </div>

              <div className="relative mb-4 rounded-full border border-gray-300 bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500">
                {/* Ikon Gembok */}
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" d="M12 2a4 4 0 00-4 4v4H7a2 2 0 00-2 2v8a2 2 0 002 2h10a2 2 0 002-2v-8a2 2 0 00-2-2h-1V6a4 4 0 00-4-4zm-2 4a2 2 0 114 0v4h-4V6zm-2 8a1 1 0 112 0v2a1 1 0 11-2 0v-2z" clipRule="evenodd" />
                  </svg>
                </div>
                <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="w-full border-none bg-transparent p-2.5 pl-10 text-gray-900 focus:outline-none focus:ring-0" />
              </div>
              {/* Button */}
              <button type="submit" className="w-full max-w-md rounded-full border border-gray-200 bg-[#0575E6] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#0369A1] focus:outline-none focus:ring-4 focus:ring-gray-100">
                Login
              </button>
            </form>
            <div className="mt-4">
              <a href="/" className="text-sm text-blue-500 hover:text-blue-600 dark:text-blue-500">
                kembali ke halaman utama
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
