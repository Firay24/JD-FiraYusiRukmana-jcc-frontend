import { LoadingBarContext, LoadingBarContextProps } from "@/hooks/loading-bar/LoadingBarContext";
import { useContext } from "react";

export const useLoadingBar = (): LoadingBarContextProps => {
  const context = useContext(LoadingBarContext);
  if (!context) {
    throw new Error("useLoadingBar must be used within a LoadingBarProvider");
  }
  return context;
};
