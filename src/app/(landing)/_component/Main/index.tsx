"use client";
import Container from "@/components/base/Container";
import React, { useState } from "react";
import timeLine from "@/data/timeline";

import maskot from "@public/maskot.png";
import schoolImg from "@public/school.png";

import { HiOutlineUserGroup } from "react-icons/hi2";
import Image from "next/image";
import { BiMath } from "react-icons/bi";
import { FaCalendarAlt, FaTree, FaWhatsapp } from "react-icons/fa";
import { IoLanguage } from "react-icons/io5";
import { MdGroups2, MdMyLocation, MdOutlineMyLocation } from "react-icons/md";
import Section from "@/components/layout/Section";
import Link from "next/link";
import { regionalTimeline } from "@/data/regional";
import { convertEpochToDateLong } from "@/utils/convertEpochToDate";
import { IoIosArrowDown, IoMdDownload } from "react-icons/io";

interface MainLandingProps {
  convertEpochToDate: (epoch: number) => string;
}

const MainLandingPage = ({ convertEpochToDate }: MainLandingProps) => {
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedPath, setSelectedPath] = useState<string>("");

  const handleDownload = () => {
    if (selectedPath) {
      const link = document.createElement("a");
      link.href = selectedPath;
      link.download = selectedPath.split("/").pop() || `kisi-kisi ${selectedSubject}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div>
      <Section id="home">
        <Container>
          <div id="home" className="relative h-screen w-full px-4">
            {/* Background Div */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: "url('/img/bg.png')",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            />

            {/* Content */}
            <div className="absolute left-0 top-[20%] z-10 flex h-full flex-col items-center text-center">
              <div className="flex flex-col items-center px-4 md:px-0">
                <h1 className="mb-2 rounded-lg bg-base-yellow px-2 text-5xl font-bold text-neutral-800 md:text-7xl">JUNIO</h1>
                <h2 className="text-3xl font-bold text-neutral-800 md:text-5xl">Junior National Olympiad</h2>
                <p className="mt-4 w-[90%] text-sm text-neutral-600 md:max-w-[60%]">JUNIO yang diselenggarakan oleh Junior Championship Center dirancang untuk memberikan ruang bagi peserta didik TK, SD, dan SMP di Kabupaten Banyuwangi guna menyalurkan bakat, mengasah kompetensi, serta membangun karakter juara sejak dini.</p>
                <div className="mt-5">
                  <Link href="https://tally.so/r/mDx0Ol" passHref>
                    <button type="button" className="rounded-full bg-base-pink px-8 py-2.5 text-xl font-medium text-white hover:bg-red-500 focus:outline-none focus:ring-4 focus:ring-blue-300">
                      Daftar
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
      {/* Tujuan Kegiatan Section */}
      {/* <Container style={{ marginTop: "126px" }}>
        <div className="flex flex-col items-center">
          <h2 className="text-3xl font-bold text-neutral-800 md:text-5xl">Tujuan Kegiatan</h2>
          <p className="mt-4 w-[90%] text-center text-sm text-black text-neutral-600 md:max-w-[45%]">At EduPlay, we believe in turning “I have to learn” into “I get to play and learn”. a journey filled with games that teach and play that enlightens.</p>
        </div>
      </Container> */}
      {/* Card Section */}
      {/* <Container style={{ marginTop: "55px" }}>
        <div className="flex items-center justify-center text-white">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-4">
            <div className="flex max-w-sm flex-col items-center justify-center gap-5 rounded-lg border border-gray-200 bg-[#7550F5] p-6 shadow">
              <div className="rounded-full bg-[#EEE4FF] p-4">
                <HiOutlineUserGroup color="black" size={35} />
              </div>
              <h5 className="text-center text-2xl font-bold tracking-tight">Mengembangkan Potensi Peserta Didik</h5>
              <p className="text-center text-sm font-extralight">Our membership management software provides full automation of membership renewals and payments</p>
            </div>
            <div className="flex max-w-sm flex-col items-center justify-center gap-5 rounded-lg border border-gray-200 bg-[#FE655D] p-6 shadow">
              <div className="rounded-full bg-[#EEE4FF] p-4">
                <HiOutlineUserGroup color="black" size={35} />
              </div>
              <h5 className="text-center text-2xl font-bold tracking-tight">Meningkatkan Kompetensi</h5>
              <p className="text-center text-sm font-extralight">Melalui perlombaan yang terstruktur, peserta akan belajar tentang pentingnya persiapan, kerja keras, dan ketekunan</p>
            </div>
            <div className="flex max-w-sm flex-col items-center justify-center gap-5 rounded-lg border border-gray-200 bg-[#FDC54A] p-6 shadow">
              <div className="rounded-full bg-[#EEE4FF] p-4">
                <HiOutlineUserGroup color="black" size={35} />
              </div>
              <h5 className="text-center text-2xl font-bold tracking-tight">Membentuk Karakter Juara</h5>
              <p className="text-center text-sm font-extralight">Menanamkan nilai-nilai sportivitas, kepercayaan diri, disiplin, dan tanggung jawab.</p>
            </div>
            <div className="flex max-w-sm flex-col items-center justify-center gap-5 rounded-lg border border-gray-200 bg-[#55C267] p-6 shadow">
              <div className="rounded-full bg-[#EEE4FF] p-4">
                <HiOutlineUserGroup color="black" size={35} />
              </div>
              <h5 className="text-center text-2xl font-bold tracking-tight">Mengembangkan Potensi Peserta Didik</h5>
              <p className="text-center text-sm font-extralight">Our membership management software provides full automation of membership renewals and payments</p>
            </div>
          </div>
        </div>
      </Container> */}
      {/* Fitur Unggulan Section */}
      {/* <Section id="about">
        <Container style={{ marginTop: "180px" }}>
          <div id="about" className="mx-10 flex flex-col items-center justify-between gap-10 text-black md:mx-5 md:flex-row xl:mx-0">
            <div className="flex flex-col gap-6 md:w-1/2">
              <h2 className="text-3xl font-bold text-neutral-800 md:text-5xl">Fitur Unggulan</h2>
              <p className="text-sm text-gray-600">Kami menghadirkan teknologi canggih dengan layanan yang berorientasi pada kepuasan pelanggan. Setiap fitur dirancang untuk memberikan pengalaman terbaik, memastikan kemudahan, kecepatan, dan keamanan dalam setiap penggunaan.</p>
              <ul className="flex flex-col gap-4">
                {["Soal berstandar OSN (Olimpiade Sains Nasional) dan HOTS (Higher Order Thinking Skills)", "Soal dirancang khusus untuk TK, SD dan SMP sesuai tingkat kesulitan", "Sistem scan LJK memastikan penilaian cepat dan akurat", "Hasil nilai dan LJK yang dapat diakses di via website", "Pembahasan soal di akhir batch", "Hadiah dan doorprize menarik"].map((feature, index) => (
                  <li key={index} className="flex items-center gap-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-500 font-bold text-white">{index + 1}</div>
                    <span className="text-sm font-semibold text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-center justify-center md:w-1/2">
              <Image src={maskot} alt="maskot Fitur Unggulan" width={400} height={800} className="rounded-lg" />
            </div>
          </div>
        </Container>
      </Section> */}
      {/* Caption Section */}
      {/* <div className="mt-48 bg-[#E6EBFE] py-20">
        <Container style={{ marginTop: "0px" }}>
          <div className="mx-10 flex flex-col items-center justify-between gap-10 text-black md:mx-5 md:flex-row xl:mx-0">
            <div className="flex flex-col justify-center gap-3 md:w-1/2">
              <h2 className="text-center text-3xl font-bold text-[#4D4D4D] md:text-start">“Nurturing Young Talents, Building Tomorrow’s Champions”</h2>
              <p className="text-center lg:text-start">Memupuk Bakat Muda, Membangun Juara Masa Depan</p>
            </div>

            <div className="flex items-center justify-center md:w-1/2">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
                <div className="flex flex-col items-center gap-5 md:flex-row lg:justify-start">
                  <BiMath color="#4CAF4F" size={40} />
                  <div className="flex flex-col items-center md:items-start">
                    <h2 className="text-3xl font-bold text-[#4D4D4D]">Matematika</h2>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-5 md:flex-row lg:justify-start">
                  <FaTree color="#4CAF4F" size={40} />
                  <div className="flex flex-col items-center md:items-start">
                    <h2 className="text-3xl font-bold text-[#4D4D4D]">IPA</h2>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-5 md:flex-row lg:justify-start">
                  <IoLanguage fontVariant={"Bold"} color="#4CAF4F" size={40} />
                  <div className="flex flex-col items-center md:items-start">
                    <h2 className="text-3xl font-bold text-[#4D4D4D]">Bahasa Inggris</h2>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-5 md:flex-row lg:justify-start">
                  <MdGroups2 color="#4CAF4F" size={40} />
                  <div className="flex flex-col items-center md:items-start">
                    <h2 className="text-3xl font-bold text-[#4D4D4D]">IPS</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div> */}
      {/* Section Timeline Kegiatan */}
      <Container style={{ marginTop: "180px" }}>
        <div id="timeline" className="flex flex-col items-center justify-center gap-2">
          <h2 className="text-3xl font-semibold text-neutral-800 md:text-5xl">Timeline Kegiatan</h2>
          <p className="mt-4 w-[90%] text-center text-xl text-black text-neutral-600 md:max-w-[60%]">Setiap peserta hanya boleh mengikuti perlombaan di 1 (satu) regional. Namun, bisa leluasa untuk mendaftar di tanggal dan regional ternyaman manapun sesuai jadwal yang tersedia.</p>
        </div>
        <div className="relative mx-10 mt-10 grid max-w-full grid-cols-1 gap-x-20 md:mx-20 md:grid-cols-3">
          <ol className="relative col-span-1 ml-0 border-s border-gray-200 md:col-span-2 md:ml-4">
            {regionalTimeline.slice(0, 5).map((item, index) => (
              <li key={index} className="mb-10 ms-6">
                <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-base-navy ring-8 ring-white">
                  <MdOutlineMyLocation />
                </span>
                <h3 className="mb-1 flex items-center text-lg font-semibold text-gray-900">
                  {`Regional ${item.regional.toString()}`} {item.status ? <span className="me-2 ms-3 rounded-sm bg-blue-100 px-2.5 py-0.5 text-sm font-medium text-blue-800">Pendaftaran Dibuka</span> : null}
                </h3>
                <time className="mb-2 block text-sm font-normal leading-none text-gray-400">{item.location}</time>
                <div className="flex items-center gap-2 text-base font-normal text-gray-500">
                  <FaCalendarAlt />
                  <p>{convertEpochToDateLong(item.date)}</p>
                </div>
                {item.description ? <p className="mb-4 text-base font-normal text-gray-500">{item.description}</p> : null}
                {item.status ? (
                  <div className="flex flex-col gap-3 md:flex-row">
                    <a href={item.path} download="PosterJunio-Regional1.png" className="inline-flex w-fit items-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:outline-none focus:ring-4 focus:ring-gray-100">
                      <svg className="me-2.5 h-3.5 w-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z" />
                        <path d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />
                      </svg>{" "}
                      Download poster
                    </a>
                    <a href={item.juknis} download="juknis-regional1.pdf" className="inline-flex w-fit items-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:outline-none focus:ring-4 focus:ring-gray-100">
                      <svg className="me-2.5 h-3.5 w-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z" />
                        <path d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />
                      </svg>{" "}
                      Download Juknis
                    </a>
                    <div className="flex w-72 items-center gap-3">
                      <div className="relative w-full">
                        <button className="flex w-full items-center justify-between rounded-lg border p-2 focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
                          {selectedSubject || "Pilih Mata Pelajaran"}
                          <IoIosArrowDown className="h-5 w-5" />
                        </button>
                        {isOpen && (
                          <ul className="absolute z-10 mt-1 w-full rounded-lg border bg-white shadow-md">
                            {item.kisikisi &&
                              item.kisikisi.map(({ label, path }) => (
                                <li
                                  key={label}
                                  className="cursor-pointer p-2 hover:bg-gray-100"
                                  onClick={() => {
                                    setSelectedSubject(label);
                                    setSelectedPath(path);
                                    setIsOpen(false);
                                  }}
                                >
                                  {label}
                                </li>
                              ))}
                          </ul>
                        )}
                      </div>
                      <button className={`w-fit rounded-md p-2 text-white transition ${selectedPath ? "bg-blue-500 hover:bg-blue-600" : "cursor-not-allowed bg-gray-400"}`} onClick={handleDownload} disabled={!selectedPath}>
                        <IoMdDownload />
                      </button>
                    </div>
                  </div>
                ) : null}
              </li>
            ))}
          </ol>
          <ol className="relative border-s border-gray-200">
            {regionalTimeline.slice(5, 11).map((item, index) => (
              <li key={index} className="mb-10 ms-6">
                <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-base-navy ring-8 ring-white">
                  <MdOutlineMyLocation />
                </span>
                <h3 className="mb-1 flex items-center text-lg font-semibold text-gray-900">
                  {`Regional ${item.regional.toString()}`} {item.status ? <span className="me-2 ms-3 rounded-sm bg-blue-100 px-2.5 py-0.5 text-sm font-medium text-blue-800">Pendaftaran Dibuka</span> : null}
                </h3>
                <time className="mb-2 block text-sm font-normal leading-none text-gray-400">{item.location}</time>
                <div className="flex items-center gap-2 text-base font-normal text-gray-500">
                  <FaCalendarAlt />
                  <p>{convertEpochToDateLong(item.date)}</p>
                </div>
                {item.description ? <p className="mb-4 text-base font-normal text-gray-500">{item.description}</p> : null}
                {item.status ? (
                  <a href="#" className="inline-flex items-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:outline-none focus:ring-4 focus:ring-gray-100">
                    <svg className="me-2.5 h-3.5 w-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z" />
                      <path d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />
                    </svg>{" "}
                    Download poster
                  </a>
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      </Container>
      {/* <Section id="timeline">
        <Container style={{ marginTop: "180px" }}>
          <div id="timeline" className="flex flex-col items-center justify-center gap-2">
            <h2 className="text-3xl font-semibold text-neutral-800 md:text-5xl">Timeline Kegiatan</h2>
            <p className="mt-4 w-[90%] text-center text-xl text-black text-neutral-600 md:max-w-[60%]">Setiap regional hanya dapat mengikuti satu jenis lomba, tetapi peserta bebas menjelajahi tantangan di regional lainnya. Siapkan strategi terbaik dan raih kemenangan di berbagai arena!</p>
          </div>
          <div className="mx-10 mt-20 flex flex-col items-start justify-between gap-10 text-black md:mx-5 md:flex-row xl:mx-0">
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
                      <div className="flex items-center gap-1 text-gray-600">
                        <p className="text-sm font-normal">{regionalText}</p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
            <div className="flex items-center justify-center md:w-1/2">
              <Image src={schoolImg} alt="image timeline" width={800} height={1600} className="rounded-lg" />
            </div>
          </div>
        </Container>
      </Section> */}
      <a href="https://wa.me/6285190079298?text=Halo%20admin%20Junio%2C%20Kak%20Gita%20ada%20yang%20perlu%20saya%20tanyakan%20lebih%20lanjut%20perihal%20Junio.%20Terima%20kasih%20kak%20Gita" target="_blank" rel="noopener noreferrer" className="fixed bottom-5 right-5 rounded-full bg-green-500 p-4 text-white shadow-lg transition duration-300 hover:bg-green-600">
        <FaWhatsapp size={32} />
      </a>
    </div>
  );
};

export default MainLandingPage;
