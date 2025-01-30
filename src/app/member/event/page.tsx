"use client";
import Container from "@/components/base/Container";
import Navbar from "@/components/module/Navbar";
import { navbarMenuMember } from "@/data/navbarMember";
import React, { useEffect, useState } from "react";
import { eventsDummy } from "./data";
import { useRouter } from "next/navigation";

const tabs = [
  { id: "all", label: "All" },
  { id: "invoice", label: "Invoice" },
  { id: "my-event", label: "My Event" },
];

const Event = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [isScrolled, setIsScrolled] = useState(false);

  // Hooks
  const router = useRouter();

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
    <div className="min-h-screen bg-base-gray">
      {/* nav */}
      <Navbar menu={navbarMenuMember} isScrolled={isScrolled} isLogged title="Events" />
      <Container>
        <div className="p-4">
          {/* Tabs */}
          <div className="flex space-x-2 rounded-lg bg-gray-100 p-1">
            {tabs.map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`md: w-full rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300 focus:outline-none sm:w-max ${activeTab === tab.id ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-200"}`}>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Event List */}
          <div className="mt-4 space-y-4">
            {eventsDummy
              .filter((event) => event.category === activeTab || activeTab === "all")
              .map((event) => (
                <div
                  key={event.id}
                  className="flex rounded-lg bg-white p-4 shadow-md"
                  onClick={(e) => {
                    router.push(`/member/event/${event.id}`);
                  }}
                >
                  <div className={`mr-4 w-1 ${event.color} rounded-full`} />
                  <div className="flex flex-col space-y-2">
                    <h3 className="text-lg font-semibold text-gray-800">{event.title}</h3>
                    <p className="text-sm text-gray-600">{event.description}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div>
                        <p className="font-semibold">{event.date}</p>
                        <p>{event.time}</p>
                      </div>
                      <button className={`${event.color} rounded-lg px-4 py-2 text-sm text-white`} onClick={() => router.push("/member/event/create")}>
                        Daftar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Event;
