"use client";

import { useSnackbar } from "@/hooks/snackbar/useSnackbar";
import { forwardRef, useState } from "react";
import { IconType } from "react-icons";

import { MdAttachFile } from "react-icons/md";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  title: string;
  description: string;
  icon?: IconType;
}

const InputFile = forwardRef<HTMLInputElement, InputProps>(({ label, className, id, title, description, icon: Icon = MdAttachFile, ...props }, ref) => {
  const accept = props.accept ?? ".pdf,.doc,.docx,.txt,.odt,.xls,.xlsx,.ods,.ppt,.pptx,.odp,.jpg,.jpeg,.png,.gif,.bmp,.svg,.mp3,.wav,.aac,.zip,.rar,.7z,.html,.htm,.css,.js,.md";
  const snackbar = useSnackbar();
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    let fileName = "";
    for (let i = 0; i < (event.target.files?.length ?? 0); i++) {
      const file = event.target.files?.[i];
      fileName += file?.name + "-|-";
    }

    if (file) {
      const allowedExtensions = accept.split(",").map((ext) => ext.trim().toLowerCase());
      const fileExtension = `.${file?.name.split(".").pop()}`;
      if (!allowedExtensions.includes(fileExtension.toLowerCase())) {
        snackbar.start("File type not supported", "error", 1500);
        event.target.value = "";
        setFileName(null);
        return;
      }
      setFileName(
        fileName
          .split("-|-")
          .filter((file) => file)
          .join(", "),
      );
    } else {
      setFileName(null);
    }

    if (props.onChange) props.onChange(event);
  };

  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className="mb-1 block">
          <span className="text-neutral-500">{label}</span> {props.required && <span className="text-danger-500">*</span>}
        </label>
      )}
      <label htmlFor={id} className="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-neutral-400 bg-neutral-100 p-4">
        <input {...props} accept={accept} id={id} type="file" className="hidden" ref={ref} onChange={handleFileChange} />
        {Icon && <Icon className="text-[24px] text-neutral-500" />}
        <div className="flex flex-col gap-1">
          <h6 className="text-h6 text-neutral-500">{fileName ?? title}</h6>
          <p className="text-small text-neutral-400">{description}</p>
        </div>
      </label>
    </div>
  );
});

export default InputFile;
