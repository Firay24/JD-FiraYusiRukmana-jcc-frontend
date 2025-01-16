"use client";

import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions } from "@headlessui/react";
import clsx from "clsx";
import { forwardRef, useEffect, useState, useCallback } from "react";
import { IconType } from "react-icons";
import { MdKeyboardArrowDown } from "react-icons/md";

export interface AutocompleteOption {
  id: string;
  name: string;
}

interface InputProps {
  id?: string;
  label?: string;
  className?: string;
  required?: boolean;
  placeholder?: string;
  value?: AutocompleteOption | null;
  options?: AutocompleteOption[];
  onChange?: (value: AutocompleteOption) => void;
  icon?: IconType;
}

const InputAutocomplete = forwardRef<HTMLInputElement, InputProps>(({ onChange, value, label, className, options = [], icon: Icon = MdKeyboardArrowDown, id, ...props }, ref) => {
  const [selected, setSelected] = useState<AutocompleteOption | null | undefined>(value);
  const [queryAutocomplete, setQueryAutocomplete] = useState<string>("");

  const filteredOptions = queryAutocomplete === "" ? options : options.filter((item) => item.name.toLowerCase().includes(queryAutocomplete.toLowerCase()));

  const onChangeCombobox = useCallback(
    (value: AutocompleteOption) => {
      setSelected(value);
      onChange && onChange(value);
    },
    [onChange],
  );

  const onChangeComboboxInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setQueryAutocomplete(value);
      const newValue: AutocompleteOption = { id: "", name: value };
      setSelected(newValue);
      onChange && onChange(newValue);
    },
    [onChange],
  );

  useEffect(() => {
    setSelected(value); // Syncs with the `value` prop whenever it changes
  }, [value]);

  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className="mb-1 block">
          <span className="text-neutral-500">{label}</span> {props.required && <span className="text-danger-500">*</span>}
        </label>
      )}
      <Combobox immediate virtual={{ options: filteredOptions }} value={selected} onChange={onChangeCombobox} onClose={() => setQueryAutocomplete("")}>
        <div className="relative flex">
          <ComboboxInput {...props} ref={ref} autoComplete="off" placeholder={props.placeholder} displayValue={(item: AutocompleteOption | null) => item?.name ?? ""} onChange={onChangeComboboxInput} id={id} className="w-full rounded-lg rounded-br-none rounded-tr-none border border-neutral-300 p-3 placeholder:text-neutral-400 focus:outline-none" />
          <ComboboxButton>
            <div className="rounded-lg rounded-bl-none rounded-tl-none border border-l-0 border-neutral-300 p-2 text-neutral-500">
              <Icon className="text-[24px] text-neutral-500" />
            </div>
          </ComboboxButton>
        </div>
        <ComboboxOptions
          portal={true}
          anchor={{ to: "bottom start", gap: 8 }}
          transition
          className={clsx(
            {
              "h-64": filteredOptions.length > 8,
              "h-fit": filteredOptions.length <= 8,
            },
            "z-50 w-[calc(var(--input-width)_+_41px)] rounded-lg border border-neutral-300 bg-white text-black empty:invisible",
            "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0",
          )}
        >
          {({ option: item }) =>
            item && (
              <ComboboxOption key={item?.id} value={item} className="flex w-full cursor-pointer select-none p-2 data-[focus]:bg-neutral-100">
                {item?.name}
              </ComboboxOption>
            )
          }
        </ComboboxOptions>
      </Combobox>
    </div>
  );
});

export default InputAutocomplete;
