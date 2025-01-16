"use client";

import { generateId } from "@/utils/generateId";
import { slugify } from "@/utils/slugify";
import { forwardRef, useEffect, useState } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

const InputTextArea = forwardRef<HTMLTextAreaElement, InputProps>(({ label, className, ...props }, ref) => {
  const [id, setId] = useState("");
  useEffect(() => {
    setId(() => slugify((props.id ?? "") + (label ?? "") + generateId()));
  }, []);

  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className="mb-1 block">
          <span className="text-neutral-500">{label}</span> {props.required && <span className="text-danger-500">*</span>}
        </label>
      )}
      <textarea {...props} id={id} ref={ref} className="min-h-[42px] w-full rounded-lg border border-neutral-300 p-3 placeholder:text-neutral-400 focus:outline-none" />
    </div>
  );
});

export default InputTextArea;
