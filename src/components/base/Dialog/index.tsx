import { Dialog as DialogContainer, DialogPanel } from "@headlessui/react";
import clsx from "clsx";

interface DialogProps {
  isOpen: boolean;
  onClose: (value: boolean) => void;
  width?: string;
  children: React.ReactNode;
  className?: string;
  transition?: boolean;
}

export default function Dialog({ isOpen, onClose, width, children, className, transition = true }: DialogProps) {
  const hasPaddingX = /\bpx-\d+\b/.test(className || "");
  const hasPaddingY = /\bpy-\d+\b/.test(className || "");
  const hasPadding = /\bp-\d+\b/.test(className || "");
  const hasWidthClass = /\bw-(\d+|full)\b/.test(className || "");
  const hasBackgroundClass = /\bbg-[a-zA-Z0-9]+\b/.test(className || "");
  const hasRoundedClass = /\brounded(-[a-zA-Z0-9]+)?\b/.test(className || "");

  return (
    <DialogContainer transition={transition} open={isOpen} onClose={() => onClose(false)} className="relative z-50 transition duration-200 ease-out data-[closed]:opacity-0">
      <div className="fixed inset-0 flex w-screen cursor-pointer items-center justify-center bg-black/[0.75] p-4">
        <DialogPanel
          style={{ maxWidth: width ? width : "600px" }}
          className={clsx(className, "cursor-default", {
            "px-6": !hasPadding && !hasPaddingX,
            "py-6": !hasPadding && !hasPaddingY,
            "bg-white": !hasBackgroundClass,
            "rounded-lg": !hasRoundedClass,
            "w-full": !hasWidthClass,
          })}
        >
          {children}
        </DialogPanel>
      </div>
    </DialogContainer>
  );
}
