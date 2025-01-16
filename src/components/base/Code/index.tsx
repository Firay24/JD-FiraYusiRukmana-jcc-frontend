"use client";

import { MdCopyAll } from "react-icons/md";
import { useState } from "react";
import Button from "@/components/base/Button";

interface CodeProps {
  children?: React.ReactNode;
  block?: boolean;
  allowCopy?: boolean;
  fileType?: string;
}

export default function Code({ children, block = false, allowCopy = false, fileType = ".ts" }: CodeProps) {
  const removeLeadingWhitespace = (code: string): string => {
    const lines = code.split("\n");
    const minIndentation = lines
      .filter((line) => line.trim().length > 0)
      .map((line) => line.search(/\S/))
      .reduce((min, current) => Math.min(min, current), Infinity);

    return lines
      .map((line) => line.slice(minIndentation))
      .join("\n")
      .trim();
  };

  const processedCode = typeof children === "string" ? removeLeadingWhitespace(children) : children;

  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(processedCode as string);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = processedCode as string;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
          document.execCommand("copy");
          textArea.remove();
        } catch (err) {
          textArea.remove();
          throw new Error("Fallback copy method failed");
        }
      }
      setIsCopied(() => true);
      setTimeout(() => {
        setIsCopied(() => false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return !block ? (
    <code className="inline-block rounded-lg border border-neutral-200 bg-neutral-100 p-1 font-monospace">{processedCode}</code>
  ) : (
    <div className="max-w-full overflow-hidden rounded-lg border border-neutral-200 bg-neutral-100">
      <div className="flex w-full bg-neutral-200 p-2 text-neutral-500">
        <span>{fileType} </span>
        {allowCopy && (
          <Button onClick={handleCopy} variant="custom" className="ml-auto border-0 p-0">
            <MdCopyAll className="text-[16px]" />
            {isCopied && <span>Copied</span>}
          </Button>
        )}
      </div>
      <div className="overflow-auto">
        <pre className="w-full p-2 font-monospace">
          <code className="w-fit whitespace-pre p-0">{processedCode}</code>
        </pre>
      </div>
    </div>
  );
}
