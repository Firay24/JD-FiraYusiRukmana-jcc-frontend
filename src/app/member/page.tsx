"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/module/Navbar";
import { navbarMenuMember } from "@/data/navbarMember";

const HomeMember = () => {
  const [isScrolled, setIsScrolled] = useState(false);

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
    <div className="bg-base-gray min-h-screen">
      {/* nav */}
      <div>
        <Navbar isScrolled={isScrolled} menu={navbarMenuMember} isLogged logoPath="/only-logo.png" />
      </div>

      {/* static */}
      <div></div>

      {/* graph */}
      <div></div>

      {/* upcoming event */}
      <div></div>
    </div>
  );
};

export default HomeMember;
