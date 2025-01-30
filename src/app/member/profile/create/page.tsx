"use client";
import Container from "@/components/base/Container";
import React, { useState } from "react";
type Stage = "tk" | "sd" | "smp";

const Create = () => {
  const [image, setImage] = useState<string>("");
  const [stage, setStage] = useState<Stage>("tk");
  const classOptions = {
    tk: ["1"],
    sd: ["1", "2", "3", "4", "5", "6"],
    smp: ["1", "2", "3"],
  };

  return (
    <div className="min-h-screen bg-base-gray p-3">
      <Container>
        <div className="rounded-xl border bg-white p-5">
          <p className="text-2xl">Profile</p>
          <div className="mt-6 flex flex-col gap-5">
            {/* Birthday */}
            <div className="w-full rounded-lg border p-1">
              <label htmlFor="birthday" className="block ps-2 text-sm font-medium text-gray-600">
                Birthday
              </label>
              <input type="date" id="birthday" name="birthday" className="mt-0 block w-full rounded-md border-0 p-2" placeholder="Select your birthday" />
            </div>
            {/* Gender */}
            <div className="w-full rounded-lg border p-1">
              <label htmlFor="gender" className="block ps-2 text-sm font-medium text-gray-600">
                Gender
              </label>
              <select name="gender" id="gender" className="mt-0 block w-full rounded-md border-0 p-2">
                <option value="pria">Laki-laki</option>
                <option value="wanita">Perempuan</option>
              </select>
            </div>
            {/* Phone */}
            <div className="w-full rounded-lg border p-1">
              <label htmlFor="phone" className="block ps-2 text-sm font-medium text-gray-600">
                Phone Number
              </label>
              <input type="text" id="phone" name="phone" className="mt-0 block w-full rounded-md border-0 p-2" placeholder="Enter your phone number" />
            </div>
            {/* Email */}
            <div className="w-full rounded-lg border p-1">
              <label htmlFor="email" className="block ps-2 text-sm font-medium text-gray-600">
                Email
              </label>
              <input type="email" id="email" name="email" className="mt-0 block w-full rounded-md border-0 p-2" placeholder="Enter your email" />
            </div>

            <div className="my-4 border-b-2 border-gray-300"></div>

            {/* NIK */}
            <div className="w-full rounded-lg border p-1">
              <label htmlFor="nik" className="block ps-2 text-sm font-medium text-gray-600">
                NIK
              </label>
              <input type="number" id="nik" name="nik" className="mt-0 block w-full rounded-md border-0 p-2" placeholder="365xxxxx" />
            </div>

            {/* Photo */}
            <div className="w-full rounded-lg border p-1">
              <label htmlFor="photo" className="block ps-2 text-sm font-medium text-gray-600">
                Photo
              </label>
              <input
                type="file"
                id="photo"
                name="photo"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setImage(URL.createObjectURL(e.target.files[0]));
                  }
                }}
                className="mt-0 block w-full rounded-md border-0 p-2"
              />
            </div>
            {image !== "" && (
              <div className="w-full rounded-lg border p-1">
                <label htmlFor="photo" className="block ps-2 text-sm font-medium text-gray-600">
                  Image Preview
                </label>
                <img src={image} alt="preview" className="w-full rounded-lg" />
              </div>
            )}

            {/* Stage */}
            <div className="w-full rounded-lg border p-1">
              <label htmlFor="stage" className="block ps-2 text-sm font-medium text-gray-600">
                Stage
              </label>
              <select name="stage" id="stage" className="mt-0 block w-full rounded-md border-0 p-2" onChange={(e) => setStage(e.target.value as Stage)}>
                <option value="tk">TK</option>
                <option value="sd">SD</option>
                <option value="smp">SMP</option>
              </select>
            </div>

            {/* School */}
            <div className="w-full rounded-lg border p-1">
              <label htmlFor="school" className="block ps-2 text-sm font-medium text-gray-600">
                School
              </label>
              <input type="text" id="school" name="school" className="mt-0 block w-full rounded-md border-0 p-2" placeholder="SDN 1 Salero" />
            </div>

            {/* Class */}
            <div className="w-full rounded-lg border p-1">
              <label htmlFor="class" className="block ps-2 text-sm font-medium text-gray-600">
                Class
              </label>
              <select name="class" id="class" className="mt-0 block w-full rounded-md border-0 p-2">
                {classOptions[stage].map((cls) => (
                  <option key={cls} value={cls}>
                    {`Kelas ${cls}`}
                  </option>
                ))}
              </select>
            </div>

            {/* Father Name */}
            <div className="w-full rounded-lg border p-1">
              <label htmlFor="father" className="block ps-2 text-sm font-medium text-gray-600">
                Father Name
              </label>
              <input type="text" id="father" name="father" className="mt-0 block w-full rounded-md border-0 p-2" placeholder="Enter your father name" />
            </div>

            {/* Mother Name */}
            <div className="w-full rounded-lg border p-1">
              <label htmlFor="mother" className="block ps-2 text-sm font-medium text-gray-600">
                Mother Name
              </label>
              <input type="text" id="mother" name="mother" className="mt-0 block w-full rounded-md border-0 p-2" placeholder="Enter your mother name" />
            </div>
          </div>

          <button type="submit" className="mt-4 w-full rounded-xl bg-[#5570F1] px-4 py-4 text-white">
            Simpan
          </button>
        </div>
      </Container>
    </div>
  );
};

export default Create;
