"use client";

import { forwardRef, useState } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

interface InputPasswordProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const InputPassword = forwardRef<HTMLInputElement, InputPasswordProps>(({ label, className, id, ...props }, ref) => {
  const [type, setType] = useState<"password" | "text">("password");

  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className="mb-1 block">
          <span className="text-neutral-500">{label}</span> {props.required && <span className="text-danger-500">*</span>}
        </label>
      )}
      <div className="relative">
        <input {...props} id={id} ref={ref} type={type} className="relative w-full rounded-lg border border-neutral-300 py-3 pl-3 pr-10 placeholder:text-neutral-400 focus:outline-none" />
        {type === "password" ? (
          //
          <MdVisibility onClick={() => setType("text")} className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-[20px] text-neutral-300" />
        ) : (
          <MdVisibilityOff onClick={() => setType("password")} className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-[20px] text-neutral-300" />
        )}
      </div>
    </div>
  );
});

export default InputPassword;
