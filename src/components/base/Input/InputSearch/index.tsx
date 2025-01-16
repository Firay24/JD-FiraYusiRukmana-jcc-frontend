"use client";

import { debounce } from "@/utils/debounce";
import { forwardRef, useMemo } from "react";
import { MdSearch } from "react-icons/md";

interface InputSearchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  debounceDelay?: number;
}

const InputSearch = forwardRef<HTMLInputElement, InputSearchProps>(({ label, className, onChange, debounceDelay = 500, id, ...props }, ref) => {
  const debouncedOnChange = useMemo(() => {
    return debounce((e: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) onChange(e);
    }, debounceDelay);
  }, [onChange, debounceDelay]);

  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className="mb-1 block">
          <span className="text-neutral-500">{label}</span>
        </label>
      )}
      <div className="relative">
        <input {...props} id={id} ref={ref} onChange={debouncedOnChange} className="relative w-full rounded-lg border border-neutral-300 py-3 pl-10 pr-3 placeholder:text-neutral-400 focus:outline-none" />
        <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[20px] text-neutral-300" />
      </div>
    </div>
  );
});

export default InputSearch;
