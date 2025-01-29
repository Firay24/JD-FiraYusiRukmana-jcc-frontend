import React from "react";
import { TCardProps } from "./type";

const CardHistoryActivity = ({ bgColor = "bg-white", title, count, textColor = "text-white" }: TCardProps) => {
  return (
    <div className={`${bgColor} flex flex-col items-center gap-1 rounded-lg p-4 ${textColor}`}>
      {count && <p className="text-2xl font-bold">{count}</p>}
      {title && <p className="text-center text-[0.6rem] font-medium">{title}</p>}
    </div>
  );
};

export default CardHistoryActivity;
