"use client";
import Container from "@/components/base/Container";
import Link from "next/link";
import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";
import { NavbarProps } from "./type";
import { useLogin } from "@/hooks/auth/useLogin";
import { useModalStore } from "@/state/modalState";
import { TiWarning } from "react-icons/ti";
import { useRouter } from "next/navigation";
import { set } from "react-hook-form";

const Navbar = ({ isScrolled, menu, isLogged, logoPath, title }: NavbarProps) => {
  const router = useRouter();
  const { logout } = useLogin();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { closeModal } = useModalStore();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <>
      <nav className={`${isLogged ? "relative" : "fixed"} z-20 w-full transition-all duration-300 ${isScrolled ? "bg-white/70 shadow-md backdrop-blur-lg" : "bg-transparent"}`}>
        <Container>
          <div className="relative flex w-full items-center justify-between p-4">
            {/* Logo */}
            {title ? (
              <div>
                <h2 className="text-2xl font-semibold italic">{title}</h2>
              </div>
            ) : (
              <div className="flex-shrink-0">
                <img src={logoPath ? logoPath : "/img/logo.png"} alt="Logo" className="h-10 w-auto md:h-14" />
              </div>
            )}

            {/* Hamburger Icon */}
            <div className="flex text-3xl md:hidden">
              <button onClick={toggleMenu} aria-label="Toggle Menu">
                {isMenuOpen ? <IoClose /> : <RxHamburgerMenu />}
              </button>
            </div>

            {/* Desktop Menu */}
            <div className="hidden items-center space-x-6 md:flex">
              {menu.map((item, index) => (
                <a key={index} href={item.path} className="hover:text-gray-400">
                  {item.label}
                </a>
              ))}
              <Link href={isLogged ? "/auth/sign-in" : "/login"} passHref>
                <button type="button" className={`rounded-full ${isLogged ? "bg-red-600 hover:bg-red-800" : "bg-blue-700 hover:bg-blue-800"} px-6 py-2 font-medium text-white focus:outline-none focus:ring-2 focus:ring-blue-300`}>
                  {isLogged ? "Logout" : "Login"}
                </button>
              </Link>
            </div>
          </div>
        </Container>

        {/* Mobile Menu */}
        <div className={`top-19 fixed left-0 z-20 w-full bg-white pb-6 shadow-md transition-all duration-300 ease-in-out ${isMenuOpen ? "max-h-screen opacity-100" : "hidden max-h-0 opacity-0"} md:hidden`}>
          <div className="flex flex-col items-center space-y-6 py-4">
            {menu.map((item, index) => (
              <a key={index} href={item.path} className="hover:text-gray-400">
                {item.label}
              </a>
            ))}
            {isLogged ? (
              <button onClick={() => setIsModalOpen(true)} type="button" className={`rounded-full bg-red-600 px-6 py-2 font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-blue-300`}>
                Logout
              </button>
            ) : (
              <button type="button" className={`rounded-full bg-blue-700 px-6 py-2 font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300`}>
                Login
              </button>
            )}
          </div>
        </div>
      </nav>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
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
    </>
  );
};

export default Navbar;
