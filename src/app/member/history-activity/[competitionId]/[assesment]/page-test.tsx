import Container from "@/components/base/Container";
import React from "react";

const Evaluation = () => {
  return (
    <div className="min-h-screen bg-base-gray px-4">
      <Container>
        <div className="mt-[30px] flex flex-row justify-between gap-4">
          <div className="flex flex-row gap-4">
            <p className="text-md w-max rounded-full bg-base-green p-4 text-end font-semibold text-white">90</p>
            <div className="flex flex-col">
              <p className="text-xl font-bold italic">Math</p>
              <p className="text-sm text-neutral-600">1 Jan 2025</p>
            </div>
          </div>
          <div className="flex flex-col">
            <p className="text-[12px] italic text-base-pink">Jawaban salah</p>
            <p className="text-end text-[10px] text-neutral-600">2 soal</p>
          </div>
        </div>

        {/* Penanggalan */}
        <div className="mt-[40px] grid grid-cols-7 gap-2 text-center text-gray-700">
          {[...Array(31).keys()].map((day) => (
            <div key={day} className={`flex h-10 w-10 items-center justify-center rounded-full text-sm ${day + 1 === 10 ? "bg-red-400 text-white" : ""} ${day + 1 === 20 ? "bg-yellow-400 text-white" : ""}`}>
              {day + 1}
            </div>
          ))}
        </div>

        {/* Rincian */}
        <div className="mt-[20px] overflow-x-auto rounded-2xl bg-white p-3">
          {/* Soal */}
          <div className="flex flex-col gap-2 p-2">
            <p className="text-[1.2rem] font-bold">Soal</p>
            <p className="text-[0.8rem]">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquid, dignissimos.</p>
          </div>

          {/* Pembahasan */}
          <div className="flex flex-col gap-2 p-2">
            <p className="text-[1.2rem] font-bold">Pembahasan</p>
            <p className="text-[0.8rem]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi ipsum nisi quisquam eaque qui a eligendi, ad laborum culpa quo et, animi error praesentium quod vel quia modi libero neque fuga. Vel, harum veniam nobis ipsa sint fugit ad soluta, laborum omnis accusamus adipisci, odit iusto facilis provident totam perspiciatis.</p>
          </div>

          {/* iFrame Video */}
          <div className="flex flex-col gap-2 p-2">
            <iframe className="h-[300px] w-full rounded-2xl" src="https://www.youtube.com/embed/ci06S-jNn8U?si=kOBNSi9ksqmjfwNt" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Evaluation;
