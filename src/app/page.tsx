"use client";
import Link from "next/link";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";
import { useState } from "react";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev); // Toggle menu state
    console.log("Menu state:", !isMenuOpen); // Debugging log
  };

  return (
    <main>
      <nav className="fixed z-20 w-full max-w-7xl bg-white">
        <div className="relative flex w-full items-center justify-between p-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img src="/img/logo.png" alt="Logo" className="h-10 w-auto md:h-14" />
          </div>

          {/* Hamburger Icon */}
          <div className="flex text-3xl md:hidden">
            <button onClick={toggleMenu} aria-label="Toggle Menu">
              {isMenuOpen ? <IoClose /> : <RxHamburgerMenu />}
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden items-center space-x-6 md:flex">
            <a href="#home" className="hover:text-gray-400">
              Home
            </a>
            <a href="#about" className="hover:text-gray-400">
              About
            </a>
            <a href="#timeline" className="hover:text-gray-400">
              Timeline
            </a>
            <a href="#contact" className="hover:text-gray-400">
              Contact
            </a>
            <Link href="/login" passHref>
              <button type="button" className="rounded-full bg-blue-700 px-6 py-2 font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300">
                Login
              </button>
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`fixed left-0 top-20 z-20 w-full bg-white pb-6 shadow-md transition-all duration-300 ease-in-out ${isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"} md:hidden`}>
          <div className="flex flex-col items-center space-y-6 py-4">
            <a href="#home" className="hover:text-gray-400">
              Home
            </a>
            <a href="#about" className="hover:text-gray-400">
              About
            </a>
            <a href="#timeline" className="hover:text-gray-400">
              Timeline
            </a>
            <a href="#contact" className="hover:text-gray-400">
              Contact
            </a>
            <Link href="/login" passHref>
              <button type="button" className="rounded-full bg-blue-700 px-6 py-2 font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300">
                Login
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div
        className="relative h-screen w-full bg-cover bg-center px-4"
        style={{
          backgroundImage: "url('/img/bg.png')",
          backgroundSize: "cover", // Ensures the background image covers the full width and height
          backgroundRepeat: "no-repeat", // Avoids repeating the background image
        }}
      >
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
          <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold text-neutral-800 md:text-5xl">Junior National Intelectual Olympic</h1>
            <p className="mt-4 w-[90%] text-sm text-neutral-600 md:max-w-[60%]">JUNIO yang diselenggarakan oleh Junior Championship Center dirancang untuk memberikan ruang bagi peserta didik TK, SD, dan SMP di Kabupaten Banyuwangi guna menyalurkan bakat, mengasah kompetensi, serta membangun karakter juara sejak dini.</p>
            <button type="button" className="mt-6 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Daftar
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
