"use client";
import { useEffect, useState } from "react";

import Container from "@/components/base/Container";

import Navbar from "./_component/Navbar";
import Main from "./_component/Main";
import Footer from "./_component/Footer";

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const convertEpochToDate = (epoch: number) => {
    const date = new Date(epoch * 1000);

    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    return date.toLocaleDateString("id-ID", options);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <main>
      {/* Navigation Bar */}
      <Navbar isMenuOpen={isMenuOpen} isScrolled={isScrolled} toggleMenu={toggleMenu} />

      {/* Hero Section */}
      <Main convertEpochToDate={convertEpochToDate} />

      {/* Footer Section */}
      <Footer />

      {/* Space kosong untuk jarak bawah */}
      <Container>
        <></>
      </Container>
    </main>
  );
}
