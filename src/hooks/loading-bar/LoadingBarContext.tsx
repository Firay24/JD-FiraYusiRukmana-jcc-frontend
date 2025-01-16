"use client";
import React, { createContext, useContext, useRef, useCallback } from "react";
import LoadingBar, { LoadingBarRef } from "react-top-loading-bar";

export interface LoadingBarContextProps {
  start: () => void;
  end: () => void;
}

export const LoadingBarContext = createContext<LoadingBarContextProps | undefined>(undefined);

export const LoadingBarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const ref = useRef<LoadingBarRef>(null);

  const start = useCallback(() => {
    ref.current?.continuousStart();
  }, []);

  const end = useCallback(() => {
    ref.current?.complete();
  }, []);

  return (
    <LoadingBarContext.Provider value={{ start, end }}>
      <LoadingBar color="rgb(var(--color-primary-500) / 1)" height={4} ref={ref} />
      {children}
    </LoadingBarContext.Provider>
  );
};
