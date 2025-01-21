import Container from "@/components/base/Container";
import Link from "next/link";
import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";

interface NavbarProps {
  toggleMenu: () => void;
  isScrolled: boolean;
  isMenuOpen: boolean;
}

const NavbarLandingPage = ({ toggleMenu, isScrolled, isMenuOpen }: NavbarProps) => {
  return (
    <nav className={`fixed z-20 w-full transition-all duration-300 ${isScrolled ? "bg-white/70 shadow-md backdrop-blur-lg" : "bg-transparent"}`}>
      <Container>
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
      </Container>

      {/* Mobile Menu */}
      <div className={`top-19 fixed left-0 z-20 w-full bg-white pb-6 shadow-md transition-all duration-300 ease-in-out ${isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"} md:hidden`}>
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
  );
};

export default NavbarLandingPage;
