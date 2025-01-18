"use client";
import Link from "next/link";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";
import { useEffect, useMemo, useState } from "react";
import Container from "@/components/base/Container";
import { HiOutlineUserGroup } from "react-icons/hi2";
import Image from "next/image";
import mockup from "@public/mockup.png";
import timeLineImage from "@public/design-time-line.png";
import { GoCreditCard, GoPeople } from "react-icons/go";
import { TbHandClick } from "react-icons/tb";

/* =============
  // Types //
===============*/
type TTimeLine = {
  id: number;
  date: number;
  nama_sekolah: string;
  regionals: {
    regional: number;
    address: {
      kota: string;
      provinsi: string;
      kecamatan: string;
      desa: string;
    };
  }[];
};

/* ================
  // Dummy Data //
=================*/
const timeLine: TTimeLine[] = [
  {
    id: 1,
    date: 1737228660,
    nama_sekolah: "SMK Negeri 1 Jakarta",
    regionals: [
      {
        regional: 1,
        address: {
          kota: "Jakarta",
          provinsi: "DKI Jakarta",
          kecamatan: "Kebayoran Baru",
          desa: "Kebayoran Baru",
        },
      },
      {
        regional: 2,
        address: {
          kota: "Jakarta",
          provinsi: "DKI Jakarta",
          kecamatan: "Kebayoran Baru",
          desa: "Kebayoran Baru",
        },
      },
    ],
  },
  {
    id: 2,
    date: 1737228660,
    nama_sekolah: "SMK Negeri 1 Jakarta",
    regionals: [
      {
        regional: 3,
        address: {
          kota: "Jakarta",
          provinsi: "DKI Jakarta",
          kecamatan: "Kebayoran Baru",
          desa: "Kebayoran Baru",
        },
      },
    ],
  },
  {
    id: 3,
    date: 1737228660,
    nama_sekolah: "SMK Negeri 1 Jakarta",
    regionals: [
      {
        regional: 4,
        address: {
          kota: "Jakarta",
          provinsi: "DKI Jakarta",
          kecamatan: "Kebayoran Baru",
          desa: "Kebayoran Baru",
        },
      },
    ],
  },
  {
    id: 4,
    date: 1737228660,
    nama_sekolah: "SMK Negeri 1 Jakarta",
    regionals: [
      {
        regional: 5,
        address: {
          kota: "Jakarta",
          provinsi: "DKI Jakarta",
          kecamatan: "Kebayoran Baru",
          desa: "Kebayoran Baru",
        },
      },
    ],
  },
  {
    id: 5,
    date: 1737228660,
    nama_sekolah: "SMK Negeri 1 Jakarta",
    regionals: [
      {
        regional: 6,
        address: {
          kota: "Jakarta",
          provinsi: "DKI Jakarta",
          kecamatan: "Kebayoran Baru",
          desa: "Kebayoran Baru",
        },
      },
    ],
  },
  {
    id: 6,
    date: 1737228660,
    nama_sekolah: "SMK Negeri 1 Jakarta",
    regionals: [
      {
        regional: 7,
        address: {
          kota: "Jakarta",
          provinsi: "DKI Jakarta",
          kecamatan: "Kebayoran Baru",
          desa: "Kebayoran Baru",
        },
      },
    ],
  },
];

export default function Home() {
  // States
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Functions untuk handle menu navbar
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev); // Toggle menu state
    console.log("Menu state:", !isMenuOpen); // Debugging log
  };

  // Fungsi convert epoch ke format hari, tanggal bulan tahun
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

  // UseEffects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Memos
  // const timeLineMemo = useMemo(() => {
  //   return timeLine.map((it) => {
  //     const regionalText = it.regionals
  //       .map((regional, index) => {
  //         const kecamatan = regional.address.kecamatan;
  //         return `Regional ${regional.regional} - ${kecamatan}`;
  //       })
  //       .join(" & ");
  //     return (
  //       <div className="flex flex-row">
  //         <p key={it.date} className="text-base font-normal text-gray-500">
  //           {regionalText}
  //         </p>
  //         <p key={it.date} className="text-base font-normal text-black">
  //           {`| ${it.nama_sekolah}`}
  //         </p>
  //       </div>
  //     );
  //   });
  // }, [timeLine]);

  // console.log(timeLineMemo);

  return (
    <main>
      {/* Navigation Bar */}
      <nav className={`fixed z-20 w-full transition-all duration-300 ${isScrolled ? "bg-white/70 shadow-md backdrop-blur-lg" : "bg-transparent"}`}>
        <Container>
          <div className="relative flex w-full items-center justify-between p-4">
            {/* Logo */}
            <div className="flex-shrink-0">
              <img src="/img/logo.png" alt="Logo" className="h-10 w-auto md:h-14" />
            </div>

            {/* Hamburger Icon */}
            <div className="text-3xl flex md:hidden">
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

      {/* Hero Section */}
      <Container>
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
              <h1 className="bg-base-yellow text-5xl md:text-7xl mb-2 rounded-lg px-2 font-bold text-neutral-800">JUNIO</h1>
              <h2 className="text-3xl md:text-5xl font-bold text-neutral-800">Junior National Olympiad</h2>
              <p className="text-sm mt-4 w-[90%] text-neutral-600 md:max-w-[60%]">JUNIO yang diselenggarakan oleh Junior Championship Center dirancang untuk memberikan ruang bagi peserta didik TK, SD, dan SMP di Kabupaten Banyuwangi guna menyalurkan bakat, mengasah kompetensi, serta membangun karakter juara sejak dini.</p>
              <button type="button" className="text-sm mt-6 rounded-lg bg-blue-700 px-5 py-2.5 font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Daftar
              </button>
            </div>
          </div>
        </div>
      </Container>

      {/* Tujuan Kegiatan Section */}
      <Container style={{ marginTop: "126px" }}>
        <div className="flex flex-col items-center">
          <h2 className="text-3xl md:text-5xl font-bold text-neutral-800">Tujuan Kegiatan</h2>
          <p className="text-sm mt-4 w-[90%] text-center text-black text-neutral-600 md:max-w-[45%]">At EduPlay, we believe in turning “I have to learn” into “I get to play and learn”. a journey filled with games that teach and play that enlightens.</p>
        </div>
      </Container>

      {/* Card Section */}
      <Container style={{ marginTop: "55px" }}>
        <div className="flex items-center justify-center text-white">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-4">
            {/* Card 1 */}
            <div className="flex max-w-sm flex-col items-center justify-center gap-5 rounded-lg border border-gray-200 bg-[#7550F5] p-6 shadow">
              <div className="rounded-full bg-[#EEE4FF] p-4">
                <HiOutlineUserGroup color="black" size={35} />
              </div>
              <h5 className="text-2xl text-center font-bold tracking-tight">Mengembangkan Potensi Peserta Didik</h5>
              <p className="text-sm text-center font-extralight">Our membership management software provides full automation of membership renewals and payments</p>
            </div>
            {/* Card 2 */}
            <div className="flex max-w-sm flex-col items-center justify-center gap-5 rounded-lg border border-gray-200 bg-[#FE655D] p-6 shadow">
              <div className="rounded-full bg-[#EEE4FF] p-4">
                <HiOutlineUserGroup color="black" size={35} />
              </div>
              <h5 className="text-2xl text-center font-bold tracking-tight">Meningkatkan Kompetensi</h5>
              <p className="text-sm text-center font-extralight">Melalui perlombaan yang terstruktur, peserta akan belajar tentang pentingnya persiapan, kerja keras, dan ketekunan</p>
            </div>
            {/* Card 3 */}
            <div className="flex max-w-sm flex-col items-center justify-center gap-5 rounded-lg border border-gray-200 bg-[#FDC54A] p-6 shadow">
              <div className="rounded-full bg-[#EEE4FF] p-4">
                <HiOutlineUserGroup color="black" size={35} />
              </div>
              <h5 className="text-2xl text-center font-bold tracking-tight">Membentuk Karakter Juara</h5>
              <p className="text-sm text-center font-extralight">Menanamkan nilai-nilai sportivitas, kepercayaan diri, disiplin, dan tanggung jawab.</p>
            </div>
            {/* Card 4 */}
            <div className="flex max-w-sm flex-col items-center justify-center gap-5 rounded-lg border border-gray-200 bg-[#55C267] p-6 shadow">
              <div className="rounded-full bg-[#EEE4FF] p-4">
                <HiOutlineUserGroup color="black" size={35} />
              </div>
              <h5 className="text-2xl text-center font-bold tracking-tight">Mengembangkan Potensi Peserta Didik</h5>
              <p className="text-sm text-center font-extralight">Our membership management software provides full automation of membership renewals and payments</p>
            </div>
          </div>
        </div>
      </Container>

      {/* Fitur Unggulan Section */}
      <Container style={{ marginTop: "180px" }}>
        <div className="mx-10 flex flex-col items-center justify-between gap-10 text-black md:mx-5 md:flex-row xl:mx-0">
          {/* Daftar Fitur Unggulan */}
          <div className="flex flex-col gap-6 md:w-1/2">
            <h3 className="text-3xl md:text-3xl font-bold text-neutral-800">Fitur Unggulan</h3>
            <p className="text-sm text-gray-600">Discover the magic of EduPlay in just a few simple steps! Download the app and unlock a world where learning meets play. All designed to captivate young minds and make education an exciting journey.</p>
            <ul className="flex flex-col gap-4">
              {["Tracking skor perkembangan anak", "Transparansi nilai", "Sistem koreksi otomatis menggunakan scan LJK", "Rangkaian lomba", "Analisis statistik performa anak", "Pembahasan soal"].map((feature, index) => (
                <li key={index} className="flex items-center gap-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-500 font-bold text-white">{index + 1}</div>
                  <span className="text-sm font-semibold text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Mockup Fitur Unggulan */}
          <div className="flex items-center justify-center md:w-1/2">
            <Image src={mockup} alt="Mockup Fitur Unggulan" width={400} height={800} className="rounded-lg" />
          </div>
        </div>
      </Container>

      {/* Caption Section */}
      <div className="mt-48 bg-[#F5F7FA] py-20">
        <Container style={{ marginTop: "0px" }}>
          <div className="mx-10 flex flex-col items-center justify-between gap-10 text-black md:mx-5 md:flex-row xl:mx-0">
            {/* Section Kiri */}
            <div className="flex flex-col justify-center gap-3 md:w-1/2">
              <h2 className="text-3xl text-center font-bold text-[#4D4D4D] md:text-start">“Nurturing Young Talents, Building Tomorrow’s Champions”</h2>
              <p className="text-center lg:text-start">We reached here with our hard work and dedication</p>
            </div>

            {/* Section Kanan */}
            <div className="flex items-center justify-center md:w-1/2">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
                {/* item 1 */}
                <div className="flex flex-col items-center gap-5 md:flex-row lg:justify-start">
                  <GoPeople color="#4CAF4F" size={40} />
                  <div className="flex flex-col items-center md:items-start">
                    <h2 className="text-3xl font-bold text-[#4D4D4D]">Matematika</h2>
                    <p className="font-light text-[#717171]">Members</p>
                  </div>
                </div>
                {/* item 2 */}
                <div className="flex flex-col items-center gap-5 md:flex-row lg:justify-start">
                  <GoPeople color="#4CAF4F" size={40} />
                  <div className="flex flex-col items-center md:items-start">
                    <h2 className="text-3xl font-bold text-[#4D4D4D]">IPA</h2>
                    <p className="font-light text-[#717171]">Clubs</p>
                  </div>
                </div>
                {/* item 3 */}
                <div className="flex flex-col items-center gap-5 md:flex-row lg:justify-start">
                  <TbHandClick fontVariant={"Bold"} color="#4CAF4F" size={40} />
                  <div className="flex flex-col items-center md:items-start">
                    <h2 className="text-3xl font-bold text-[#4D4D4D]">Bahasa Inggris</h2>
                    <p className="font-light text-[#717171]">Members</p>
                  </div>
                </div>
                {/* item 4 */}
                <div className="flex flex-col items-center gap-5 md:flex-row lg:justify-start">
                  <GoCreditCard color="#4CAF4F" size={40} />
                  <div className="flex flex-col items-center md:items-start">
                    <h2 className="text-3xl font-bold text-[#4D4D4D]">IPS</h2>
                    <p className="font-light text-[#717171]">Payments</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Section Timeline Kegiatan */}
      <Container style={{ marginTop: "180px" }}>
        <div className="flex flex-col items-center justify-center gap-2">
          <h2 className="text-3xl md:text-5xl font-semibold text-neutral-800">Timeline Kegiatan</h2>
          <p className="text-xl mt-4 w-[90%] text-center text-black text-neutral-600 md:max-w-[60%]">At EduPlay, we believe in turning “I have to learn” into “I get to play and learn”. a journey filled with games that teach and play that enlightens.</p>
        </div>
        <div className="mx-10 mt-20 flex flex-col items-start justify-between gap-10 text-black md:mx-5 md:flex-row xl:mx-0">
          {/* Daftar Timeline */}
          <div className="flex flex-col gap-6 md:w-1/2">
            <ol className="relative border-s-4 border-[#FE655D]">
              {timeLine.map((it, index) => {
                const regionalText = it.regionals
                  .map((regional, index) => {
                    const kecamatan = regional.address.kecamatan;
                    return `Regional ${regional.regional} - ${kecamatan}`;
                  })
                  .join(" & ");
                return (
                  <li key={index} className="mb-10 ms-4">
                    <div className="absolute -start-3 mt-1.5 h-5 w-5 rounded-full border-2 border-[#FE655D] bg-[#FE655D]"></div>
                    <h2 className="text-2xl font-semibold text-neutral-800">{convertEpochToDate(it.date)}</h2>
                    <div className="flex flex-row gap-0">
                      <p className="text-sm font-normal text-gray-500">{regionalText}</p>
                      <p className="text-sm ms-2 font-normal text-black">{`| ${it.nama_sekolah}`}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* Design */}
          <div className="flex items-center justify-center md:w-1/2">
            <Image src={timeLineImage} alt="Mockup Fitur Unggulan" width={800} height={1600} className="rounded-lg" />
          </div>
        </div>
      </Container>

      {/* Footer Section */}
      <Container style={{ marginTop: "180px", marginBottom: "100px" }}>
        <div className="flex w-full flex-col gap-2 border-t border-neutral-300 px-6 xl:px-0">
          <div className="flex flex-col items-center justify-between md:flex-row md:items-end">
            <div className="flex flex-row gap-2 pt-10 md:flex-row">
              <a href="/privacy-policy" className="hover:underline">
                Privacy Policy
              </a>
              <a href="/terms-conditions" className="hover:underline">
                Terms & Conditions
              </a>
              <a href="/support" className="hover:underline">
                Support
              </a>
            </div>
            <div className="mt-4 md:mt-0">
              <p className="text-center md:text-left">© Copyright 2024, All Rights Reserved</p>
            </div>
          </div>
        </div>
      </Container>

      {/* Space kosong untuk jarak bawah */}
      <Container>
        <></>
      </Container>
    </main>
  );
}
