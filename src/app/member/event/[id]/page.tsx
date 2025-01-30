"use client";

import Container from "@/components/base/Container";
import React, { useState } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { LuCalendarDays } from "react-icons/lu";
import { SlClock } from "react-icons/sl";

const ExpandableCard = ({ title, questions }: { title: string; questions: string[] }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`cursor-pointer rounded-lg border p-4 transition-all ${isOpen ? "bg-blue-100" : "bg-white"}`} onClick={() => setIsOpen(!isOpen)}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-lg font-semibold">{title}</p>
          <p className="text-sm text-gray-500">Soal nomer 1 - 5</p>
        </div>
        {isOpen ? <BiChevronUp size={24} /> : <BiChevronDown size={24} />}
      </div>
      {isOpen && (
        <ul className="mt-3 list-decimal pl-5 text-sm text-gray-700">
          {questions.map((q, index) => (
            <li key={index}>{q}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

const DetailEvent = () => {
  const dummyQuestions = ["but also the leap into", "dummy text ever since", "but also the leap into", "dummy text ever since", "but also the leap into"];

  return (
    <div className="min-h-screen bg-base-gray">
      <Container>
        <div className="p-4">
          {/* Header */}
          <div className="flex flex-col gap-2">
            <p className="text-2xl font-bold italic">JCC S1 - SD/Mi sederajat</p>
            <div className="flex flex-row gap-4">
              <div className="flex flex-row gap-2">
                <LuCalendarDays />
                <p className="text-sm text-neutral-600">23 Feb 2025</p>
              </div>
              <div className="flex flex-row gap-2">
                <SlClock />
                <p className="text-sm text-neutral-600">09:00 - 10:00 WIB</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <p className="mt-5 text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae iste voluptas cum, ad distinctio in earum autem. Quae provident fuga, nihil consequuntur porro laboriosam placeat totam aut eos quaerat ab. Tenetur doloribus corporis eligendi quos. Labore vero sapiente amet assumenda, facere rerum, consequuntur molestiae ut adipisci quos modi, mollitia perspiciatis.</p>

          {/* Kisi-kisi */}
          <div className="mt-6 flex flex-col gap-2">
            <div className="mb-3 flex flex-row items-center justify-between gap-2">
              <p className="text-md font-semibold">Kisi-kisi</p>
              <button className="rounded-md bg-base-purple px-3 py-1 text-sm text-white">mulai kuis</button>
            </div>

            {/* Cards */}
            <ExpandableCard title="Bilangan dan deret" questions={dummyQuestions} />
            <ExpandableCard title="Bilangan dan deret" questions={dummyQuestions} />
            <ExpandableCard title="Bilangan dan deret" questions={dummyQuestions} />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default DetailEvent;
