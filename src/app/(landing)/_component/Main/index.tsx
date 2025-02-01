import Container from "@/components/base/Container";
import React from "react";
import timeLine from "@/data/timeline";

import maskot from "@public/maskot.png";
import schoolImg from "@public/school.png";

import { HiOutlineUserGroup } from "react-icons/hi2";
import Image from "next/image";
import { BiMath } from "react-icons/bi";
import { FaTree } from "react-icons/fa";
import { IoLanguage } from "react-icons/io5";
import { MdGroups2, MdMyLocation } from "react-icons/md";
import Section from "@/components/layout/Section";
import Link from "next/link";

interface MainLandingProps {
  convertEpochToDate: (epoch: number) => string;
}

const MainLandingPage = ({ convertEpochToDate }: MainLandingProps) => {
  return (
    <div>
      <Section id="home">
        <Container>
          <div
            id="home"
            className="relative h-screen w-full bg-cover bg-center px-4"
            style={{
              backgroundImage: "url('/img/bg.png')",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
              <div className="flex flex-col items-center">
                <h1 className="mb-2 rounded-lg bg-base-yellow px-2 text-5xl font-bold text-neutral-800 md:text-7xl">JUNIO</h1>
                <h2 className="text-3xl font-bold text-neutral-800 md:text-5xl">Junior National Olympiad</h2>
                <p className="mt-4 w-[90%] text-sm text-neutral-600 md:max-w-[60%]">JUNIO yang diselenggarakan oleh Junior Championship Center dirancang untuk memberikan ruang bagi peserta didik TK, SD, dan SMP di Kabupaten Banyuwangi guna menyalurkan bakat, mengasah kompetensi, serta membangun karakter juara sejak dini.</p>
                <Link href="/auth/sign-up" passHref>
                  <button type="button" className="mt-6 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Daftar
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </Section>
      {/* Tujuan Kegiatan Section */}
      <Container style={{ marginTop: "126px" }}>
        <div className="flex flex-col items-center">
          <h2 className="text-3xl font-bold text-neutral-800 md:text-5xl">Tujuan Kegiatan</h2>
          <p className="mt-4 w-[90%] text-center text-sm text-black text-neutral-600 md:max-w-[45%]">At EduPlay, we believe in turning “I have to learn” into “I get to play and learn”. a journey filled with games that teach and play that enlightens.</p>
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
              <h5 className="text-center text-2xl font-bold tracking-tight">Mengembangkan Potensi Peserta Didik</h5>
              <p className="text-center text-sm font-extralight">Our membership management software provides full automation of membership renewals and payments</p>
            </div>
            {/* Card 2 */}
            <div className="flex max-w-sm flex-col items-center justify-center gap-5 rounded-lg border border-gray-200 bg-[#FE655D] p-6 shadow">
              <div className="rounded-full bg-[#EEE4FF] p-4">
                <HiOutlineUserGroup color="black" size={35} />
              </div>
              <h5 className="text-center text-2xl font-bold tracking-tight">Meningkatkan Kompetensi</h5>
              <p className="text-center text-sm font-extralight">Melalui perlombaan yang terstruktur, peserta akan belajar tentang pentingnya persiapan, kerja keras, dan ketekunan</p>
            </div>
            {/* Card 3 */}
            <div className="flex max-w-sm flex-col items-center justify-center gap-5 rounded-lg border border-gray-200 bg-[#FDC54A] p-6 shadow">
              <div className="rounded-full bg-[#EEE4FF] p-4">
                <HiOutlineUserGroup color="black" size={35} />
              </div>
              <h5 className="text-center text-2xl font-bold tracking-tight">Membentuk Karakter Juara</h5>
              <p className="text-center text-sm font-extralight">Menanamkan nilai-nilai sportivitas, kepercayaan diri, disiplin, dan tanggung jawab.</p>
            </div>
            {/* Card 4 */}
            <div className="flex max-w-sm flex-col items-center justify-center gap-5 rounded-lg border border-gray-200 bg-[#55C267] p-6 shadow">
              <div className="rounded-full bg-[#EEE4FF] p-4">
                <HiOutlineUserGroup color="black" size={35} />
              </div>
              <h5 className="text-center text-2xl font-bold tracking-tight">Mengembangkan Potensi Peserta Didik</h5>
              <p className="text-center text-sm font-extralight">Our membership management software provides full automation of membership renewals and payments</p>
            </div>
          </div>
        </div>
      </Container>
      {/* Fitur Unggulan Section */}
      <Section id="about">
        <Container style={{ marginTop: "180px" }}>
          <div id="about" className="mx-10 flex flex-col items-center justify-between gap-10 text-black md:mx-5 md:flex-row xl:mx-0">
            {/* Daftar Fitur Unggulan */}
            <div className="flex flex-col gap-6 md:w-1/2">
              {/* <h3 className="text-3xl font-bold text-neutral-800 md:text-3xl">Fitur Unggulan</h3> */}
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
            {/* Mockup Fitur Unggulan */}
            <div className="flex items-center justify-center md:w-1/2">
              <Image src={maskot} alt="maskot Fitur Unggulan" width={400} height={800} className="rounded-lg" />
            </div>
          </div>
        </Container>
      </Section>
      {/* Caption Section */}
      <div className="mt-48 bg-[#E6EBFE] py-20">
        <Container style={{ marginTop: "0px" }}>
          <div className="mx-10 flex flex-col items-center justify-between gap-10 text-black md:mx-5 md:flex-row xl:mx-0">
            {/* Section Kiri */}
            <div className="flex flex-col justify-center gap-3 md:w-1/2">
              <h2 className="text-center text-3xl font-bold text-[#4D4D4D] md:text-start">“Nurturing Young Talents, Building Tomorrow’s Champions”</h2>
              <p className="text-center lg:text-start">Memupuk Bakat Muda, Membangun Juara Masa Depan</p>
            </div>

            {/* Section Kanan */}
            <div className="flex items-center justify-center md:w-1/2">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
                {/* item 1 */}
                <div className="flex flex-col items-center gap-5 md:flex-row lg:justify-start">
                  <BiMath color="#4CAF4F" size={40} />
                  <div className="flex flex-col items-center md:items-start">
                    <h2 className="text-3xl font-bold text-[#4D4D4D]">Matematika</h2>
                    {/* <p className="font-light text-[#717171]">Members</p> */}
                  </div>
                </div>
                {/* item 2 */}
                <div className="flex flex-col items-center gap-5 md:flex-row lg:justify-start">
                  <FaTree color="#4CAF4F" size={40} />
                  <div className="flex flex-col items-center md:items-start">
                    <h2 className="text-3xl font-bold text-[#4D4D4D]">IPA</h2>
                    {/* <p className="font-light text-[#717171]">Clubs</p> */}
                  </div>
                </div>
                {/* item 3 */}
                <div className="flex flex-col items-center gap-5 md:flex-row lg:justify-start">
                  <IoLanguage fontVariant={"Bold"} color="#4CAF4F" size={40} />
                  <div className="flex flex-col items-center md:items-start">
                    <h2 className="text-3xl font-bold text-[#4D4D4D]">Bahasa Inggris</h2>
                    {/* <p className="font-light text-[#717171]">Members</p> */}
                  </div>
                </div>
                {/* item 4 */}
                <div className="flex flex-col items-center gap-5 md:flex-row lg:justify-start">
                  <MdGroups2 color="#4CAF4F" size={40} />
                  <div className="flex flex-col items-center md:items-start">
                    <h2 className="text-3xl font-bold text-[#4D4D4D]">IPS</h2>
                    {/* <p className="font-light text-[#717171]">Payments</p> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
      {/* Section Timeline Kegiatan */}
      <Section id="timeline">
        <Container style={{ marginTop: "180px" }}>
          <div id="timeline" className="flex flex-col items-center justify-center gap-2">
            <h2 className="text-3xl font-semibold text-neutral-800 md:text-5xl">Timeline Kegiatan</h2>
            <p className="mt-4 w-[90%] text-center text-xl text-black text-neutral-600 md:max-w-[60%]">At EduPlay, we believe in turning “I have to learn” into “I get to play and learn”. a journey filled with games that teach and play that enlightens.</p>
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
                      <div className="flex items-center gap-1 text-gray-600">
                        <p className="text-sm font-normal">{regionalText}</p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>

            {/* Design */}
            <div className="flex items-center justify-center md:w-1/2">
              <Image src={schoolImg} alt="image timeline" width={800} height={1600} className="rounded-lg" />
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
};

export default MainLandingPage;
