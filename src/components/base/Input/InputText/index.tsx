"use client";

import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const InputText = forwardRef<HTMLInputElement, InputProps>(({ label, className, id, ...props }, ref) => {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className="mb-1 block">
          <span className="text-neutral-500">{label}</span> {props.required && <span className="text-danger-500">*</span>}
        </label>
      )}
      <input {...props} id={id} ref={ref} className="w-full rounded-lg border border-neutral-300 p-3 placeholder:text-neutral-400 focus:outline-none" />
    </div>
  );
});

export default InputText;
