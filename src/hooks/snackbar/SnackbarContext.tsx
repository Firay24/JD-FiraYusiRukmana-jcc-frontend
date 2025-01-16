"use client";

import React, { createContext, forwardRef, useCallback } from "react";
import { CustomContentProps, SnackbarContent, useSnackbar } from "notistack";
import { SnackbarProvider as SnackbarProviderNotistack, enqueueSnackbar } from "notistack";

import { MdClose } from "react-icons/md";

import clsx from "clsx";

export interface SnackbarContextProps {
  start: (message: React.ReactNode, type: "success" | "error", duration?: number) => void;
}

export const SnackbarContext = createContext<SnackbarContextProps | undefined>(undefined);

export const SnackbarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const start = useCallback((message: React.ReactNode, type: "success" | "error", duration?: number) => {
    try {
      enqueueSnackbar(message, {
        variant: type,
        autoHideDuration: duration ?? 3000,
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <SnackbarContext.Provider value={{ start }}>
      <SnackbarProviderNotistack Components={{ success: Custom, error: Custom }} anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
        {children}
      </SnackbarProviderNotistack>
    </SnackbarContext.Provider>
  );
};

const Custom = forwardRef<HTMLDivElement, CustomContentProps>((props, ref) => {
  const { closeSnackbar } = useSnackbar();

  return (
    <SnackbarContent ref={ref}>
      <div className={clsx({ "bg-danger-500": props.variant === "error", "bg-success-500": props.variant === "success" }, "ml-auto flex items-center gap-2 rounded px-4 py-3 text-h6 text-white")}>
        <span className="block">{props.message}</span>
        <MdClose className="cursor-pointer" onClick={() => closeSnackbar(props.id)} />
      </div>
    </SnackbarContent>
  );
});
