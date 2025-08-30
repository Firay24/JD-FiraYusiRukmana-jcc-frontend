"use client";
import { IClass, useClasses } from "@/hooks/classes/useClasses";
import { IEventName, useEvent } from "@/hooks/event/useEvent";
import { useRegional } from "@/hooks/regional/useRegional";
import { useStudent } from "@/hooks/student/useStudent";
import { IRegional } from "@/types/global";
import React, { useEffect, useState } from "react";
import { TbPointFilled } from "react-icons/tb";
import { IParticipantsClasses } from "../exportClassToExcel";
import { IParticipantByIdCompetition } from "@/hooks/student/type";

const CreateClasses = () => {
  const { listClasses } = useClasses();
  const { listRegional } = useRegional();
  const { listEventName } = useEvent();
  const { listParticipantByIdCompetition } = useStudent();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showParticipants, setShowParticipants] = useState<boolean>(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [participants, setParticipants] = useState<IParticipantByIdCompetition[]>([]);
  const [method, setMethod] = useState<string>("all");
  const [range, setRange] = useState({ from: "", to: "" });
  const [isAddingClass, setIsAddingClass] = useState<boolean>(false);
  const [newClass, setNewClass] = useState<string>("");
  const [classes, setClasses] = useState<IClass[]>([]);
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [regional, setRegional] = useState<IRegional[]>([]);
  const [selectedRegional, setSelectedRegional] = useState<string>("");
  const [events, setEvents] = useState<IEventName[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<string>("");

  const fetchParticipants = async () => {
    try {
      setIsLoading(true);
      const response = await listParticipantByIdCompetition(selectedEvent);
      setParticipants(response);
    } catch (error) {
      console.error("Failed to fetch roles:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchClasses = async () => {
    try {
      setIsLoading(true);
      const classes = await listClasses();
      setClasses(classes);
    } catch (error) {
      console.error("Failed to fetch classes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchRegional = async () => {
    try {
      setIsLoading(true);
      const response = await listRegional();
      setRegional(response);

      const regionCurrent = response.find((item) => item.region === 5);
      if (regionCurrent) {
        setSelectedRegional(regionCurrent.id);
      }
    } catch (error) {
      console.error("Failed to fetch roles:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchEvents = async () => {
    try {
      setIsLoading(true);
      const response = await listEventName(selectedRegional);
      setEvents(response);
      setSelectedEvent(response[0].id);
    } catch (error) {
      console.error("Failed to fetch roles:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckboxChange = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedIds((prev) => [...prev, id]);
    } else {
      setSelectedIds((prev) => prev.filter((pid) => pid !== id));
    }
  };

  useEffect(() => {
    fetchClasses();
    fetchRegional();
  }, []);

  useEffect(() => {
    if (selectedRegional) {
      fetchEvents();
    }
  }, [selectedRegional]);

  useEffect(() => {
    if (showParticipants && selectedEvent) {
      fetchParticipants();
    }
  }, [showParticipants]);

  console.log(selectedIds);
  return (
    <div className="mb-16">
      <h1 className="text-2xl font-semibold">Pembagian Kelas</h1>
      <div className="mt-3 grid grid-cols-4 gap-5">
        {/* FORM */}
        <div className="col-span-3">
          {/* Question 1 */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="regional" className="mb-2 block text-gray-900">
                Regional
              </label>
              <select value={selectedRegional} onChange={(e) => setSelectedRegional(e.target.value)} id="regional" className="w-full rounded-lg border-gray-200 bg-gray-50 p-2.5 text-sm text-gray-500 focus:border-blue-500 focus:ring-blue-500">
                {regional &&
                  regional.length > 0 &&
                  regional.map((regional) => (
                    <option key={regional.id} value={regional.id}>
                      {regional.name}
                    </option>
                  ))}
              </select>
            </div>
            <div>
              <label htmlFor="event" className="mb-2 block text-gray-900">
                Jenis Lomba
              </label>
              <select value={selectedEvent} onChange={(e) => setSelectedEvent(e.target.value)} id="event" className="w-full rounded-lg border-gray-200 bg-gray-50 p-2.5 text-sm text-gray-500 focus:border-blue-500 focus:ring-blue-500">
                {events &&
                  events.length > 0 &&
                  events.map((event) => (
                    <option key={event.id} value={event.id}>
                      {event.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          {/* Question 2 */}
          <div className="mt-2">
            <label htmlFor="classes" className="mb-2 block text-gray-900">
              Pilihan Kelas
            </label>
            <select value={selectedClass} disabled={isAddingClass} onChange={(e) => setSelectedClass(e.target.value)} id="classes" className="w-full rounded-lg border-gray-200 bg-gray-50 p-2.5 text-sm text-gray-500 focus:border-blue-500 focus:ring-blue-500">
              {classes &&
                classes.length > 0 &&
                classes.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
            </select>
            {isAddingClass ? (
              <div className="mt-2">
                <input type="text" value={newClass} onChange={(e) => setNewClass(e.target.value)} placeholder="Masukkan nama kelas baru" className="w-full rounded-lg border-gray-200 bg-white p-2.5 text-sm text-gray-700 focus:border-blue-500 focus:ring-blue-500" />
                <p
                  onClick={() => {
                    setIsAddingClass(false);
                    setNewClass("");
                  }}
                  className="mt-2 cursor-pointer text-sm text-red-500 hover:underline"
                >
                  Batal
                </p>
              </div>
            ) : (
              <p onClick={() => setIsAddingClass(true)} className="mt-2 cursor-pointer text-sm text-blue-600 hover:underline">
                Tambah kelas lainnya
              </p>
            )}
          </div>

          {/* Question 3 */}
          <div className="mt-2">
            <label htmlFor="method" className="mb-2 block text-gray-900">
              Pilih Metode
            </label>

            {/* Radio */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <input type="radio" id="all" name="method" value="all" checked={method === "all"} onChange={(e) => setMethod(e.target.value)} className="h-4 w-4 text-blue-600 focus:ring-blue-500" />
                <label htmlFor="all" className="text-gray-700">
                  Semua
                </label>
              </div>

              <div className="flex items-center gap-2">
                <input type="radio" id="custom" name="method" value="custom" checked={method === "custom"} onChange={(e) => setMethod(e.target.value)} className="h-4 w-4 text-blue-600 focus:ring-blue-500" />
                <label htmlFor="custom" className="text-gray-700">
                  Custom
                </label>
              </div>
            </div>

            {/* Custom */}
            {method === "custom" && (
              <>
                <div className="mt-3 flex items-center gap-6">
                  <div className="flex items-center gap-3">
                    <label htmlFor="from" className="block text-gray-500">
                      Urut dari
                    </label>
                    <input type="number" id="from" value={range.from} onChange={(e) => setRange({ ...range, from: e.target.value })} className="w-24 rounded-lg border-gray-200 bg-white p-2 text-sm focus:border-blue-500 focus:ring-blue-500" />
                  </div>
                  <div className="flex items-center gap-3">
                    <label htmlFor="to" className="block text-gray-500">
                      Sampai
                    </label>
                    <input type="number" id="to" value={range.to} onChange={(e) => setRange({ ...range, to: e.target.value })} className="w-24 rounded-lg border-gray-200 bg-white p-2 text-sm focus:border-blue-500 focus:ring-blue-500" />
                  </div>
                </div>

                {/* Checkbox */}
                <label className="mt-3 flex items-center gap-2 text-neutral-700">
                  <input checked={showParticipants} type="checkbox" onChange={(e) => setShowParticipants(e.target.checked)} value="" className="h-4 w-4 rounded-sm border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"></input>
                  <span>Tampilkan Peserta</span>
                </label>

                {/* DATA PARTICIPANT */}
                {showParticipants && participants && participants.length > 0 && (
                  <div className="mt-3 grid grid-cols-2 text-neutral-500">
                    {participants.map((p) => (
                      <label key={p.idMember} className="flex items-center gap-2">
                        <input type="checkbox" checked={selectedIds.includes(p.idMember)} onChange={(e) => handleCheckboxChange(p.idMember, e.target.checked)} className="h-4 w-4 rounded-sm border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500" />
                        <span>{p.name}</span>
                      </label>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>

          {/* Submit */}
          <div className="mt-7">
            <button type="submit" className="rounded-lg bg-blue-600 px-9 py-2 text-sm font-semibold text-white hover:bg-blue-700">
              Simpan
            </button>
          </div>
        </div>

        {/* KELAS PESERTA */}
        <div>
          <h4>Kelas</h4>
          <div className="mt-1 grid grid-cols-2 text-neutral-500">
            {classes &&
              classes.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <p>
                    <TbPointFilled />
                  </p>
                  <p>{item.name}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateClasses;
