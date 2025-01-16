import { LoadingPageContext, LoadingPageContextProps } from "@/hooks/loading-page/LoadingPageContext";
import { useContext } from "react";

export const useLoadingPage = (): LoadingPageContextProps => {
  const context = useContext(LoadingPageContext);
  if (!context) {
    throw new Error("useLoadingPage must be used within a LoadingPageProvider");
  }
  return context;
};
