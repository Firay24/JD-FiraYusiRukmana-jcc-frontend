"use client";
import ContainerAdmin from "@/components/base/Container-admin/page";
import Sidebar from "@/components/module/Sidebar/page";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import NavbarEventAdmin from "./_component/Navbar";

const EventAdminLayout = ({ children }: { children: React.ReactNode }) => {
  const pathName = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    handleResize();
    handleScroll();

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <ContainerAdmin>
      {isMobile && <NavbarEventAdmin isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} isScrolled={isScrolled} />}
      <div className={`grid bg-white ${isMobile ? "grid-cols-1" : "grid-cols-4 gap-6"}`}>
        {/* Sidebar (Hanya tampil jika bukan mobile) */}
        {!isMobile && (
          <div>
            <Sidebar currentPath={pathName} />
          </div>
        )}

        {/* Konten Utama */}
        <div className={`${isMobile ? "mt-10 px-3" : "col-span-3 mr-6"}`}>{children}</div>
      </div>
    </ContainerAdmin>
  );
};

export default EventAdminLayout;
