"use client";
import Container from "@/components/base/Container";
import { useLogin } from "@/hooks/auth/useLogin";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaPowerOff } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { TiWarning } from "react-icons/ti";

interface NavbarProps {
  toggleMenu: () => void;
  isScrolled: boolean;
  isMenuOpen: boolean;
}

const NavbarEventAdmin = ({ toggleMenu, isScrolled, isMenuOpen }: NavbarProps) => {
  const { logout } = useLogin();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  return (
    <nav className={`fixed right-4 top-4 z-20 w-full bg-white transition-all duration-300 ${isScrolled ? "bg-white" : "bg-transparent"}`}>
      <Container>
        <div className={`relative flex w-full items-center justify-between p-4`}>
          <div className="pl-4">
            <p>Portal Data</p>
          </div>
          {/* Hamburger Icon */}
          <div className="flex text-3xl md:hidden">
            <button onClick={toggleMenu} aria-label="Toggle Menu">
              {isMenuOpen ? <IoClose /> : <RxHamburgerMenu />}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className={`top-19 relative left-0 z-20 w-full bg-white pb-6 shadow-md transition-all duration-300 ease-in-out ${isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"} md:hidden`}>
          <div className="flex flex-col items-center space-y-6 py-4">
            <a href="/event-admin/dashboard" className="hover:text-gray-400">
              Dashboard
            </a>
            <a href="/event-admin/participants" className="hover:text-gray-400">
              Peserta
            </a>
            <a href="/event-admin/schools" className="hover:text-gray-400">
              Sekolah
            </a>
            <div onClick={() => setIsModalOpen(true)} className="flex cursor-pointer items-center gap-3 rounded-lg px-4 py-2 text-red-400 hover:bg-neutral-100 hover:text-neutral-800">
              <FaPowerOff />
              <p>Keluar</p>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-full max-w-2xl p-4">
            <div className="relative rounded-lg bg-white shadow-lg">
              <div className="flex items-center justify-between rounded-t border-b border-gray-200 p-4 md:p-5">
                <h3 className="text-xl font-semibold text-gray-900">Apa Anda yakin?</h3>
                <button onClick={() => setIsModalOpen(false)} className="ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900">
                  <IoClose size={18} />
                </button>
              </div>
              <div className="grid grid-cols-1 space-y-4 p-4 text-center md:p-5">
                <div className="flex justify-center text-8xl text-red-500">
                  <TiWarning />
                </div>

                <p>Anda akan logout dari akun Anda. Lanjutkan?</p>
              </div>
              <div className="flex items-center justify-center gap-3 rounded-b border-t border-gray-200 p-4 md:p-5">
                <button onClick={() => setIsModalOpen(false)} className="ms-3 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700">
                  Batal
                </button>
                <button
                  onClick={() => {
                    logout();
                    setIsModalOpen(false);
                    localStorage.setItem("isLogged", "false");
                    router.push("/auth/sign-in");
                  }}
                  className="rounded-lg bg-red-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-800"
                >
                  Yakin
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavbarEventAdmin;
