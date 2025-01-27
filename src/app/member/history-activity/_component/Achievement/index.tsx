import React from "react";
import CardHistoryActivity from "../CardActivity";
import goldStar from "@public/img/star-1.png";
import silverStar from "@public/img/star-2.png";

const Achievement = () => {
  return (
    <div className="flex-col gap-1 p-3">
      <p className="text-sm font-semibold">Achievement</p>
      <div className="mt-3 flex flex-row gap-2">
        {[1, 2, 3, 4].map((_, i) => {
          const bgColors = ["bg-[#FFF1E6]", "bg-[#EEE4FF]", "bg-[#E6EBFE]", "bg-[#FBE2E3]"];
          const textColors = ["text-[#FF9C4F]", "text-[#A16AFF]", "text-[#718FFF]", "text-[#F75E64]"];
          const title = ["juara 1", "juara 2", "juara 3", "partisipan"];
          return (
            <div key={i} className="w-full">
              <CardHistoryActivity title={title[i % title.length]} count={10} bgColor={bgColors[i % bgColors.length]} textColor={textColors[i % textColors.length]} />
            </div>
          );
        })}
      </div>

      {/* List */}
      <div className="mt-[45px] flex flex-col gap-5">
        <div className="flex flex-row gap-2 border-b border-neutral-300 pb-5">
          <img src={goldStar.src} alt="" />
          <div className="flex w-full flex-col gap-1">
            <div className="flex flex-row items-center justify-between gap-2">
              <p className="text-md font-semibold">Sains</p>
              <p className="text-md w-max rounded-full bg-base-green px-3 py-1 text-end font-semibold text-white">90</p>
            </div>

            <div className="flex flex-row items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <p className="text-xs text-neutral-600">JJC Season 1</p>
              </div>
              <p className="text-xs italic text-neutral-600">rata-rata 80</p>
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-2">
          <img src={silverStar.src} alt="" />
          <div className="flex w-full flex-col gap-1">
            <div className="flex flex-row items-center justify-between gap-2">
              <p className="text-md font-semibold">Math</p>
              <p className="text-md w-max rounded-full bg-base-green px-3 py-1 text-end font-semibold text-white">90</p>
            </div>

            <div className="flex flex-row items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <p className="text-xs text-neutral-600">JJC Season 1</p>
              </div>
              <p className="text-xs italic text-neutral-600">rata-rata 80</p>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="mt-[45px] flex flex-col gap-2">
        <div className="flex flex-row items-center justify-between gap-2">
          <div className="flex flex-row items-center gap-2">
            <img src={goldStar.src} alt="" />
            <div className="flex flex-col gap-1">
              <p className="text-md font-semibold">Sains</p>
              <p className="text-xs text-neutral-600">JJC Season 1</p>
            </div>
          </div>

          <div>
            <div className="flex flex-col items-end gap-1">
              <p className="text-md w-max rounded-full bg-base-green px-3 py-1 text-end font-semibold text-white">90</p>
              <p className="text-xs italic text-neutral-600">rata-rata 80</p>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Achievement;
