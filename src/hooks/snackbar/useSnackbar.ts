import { SnackbarContext, SnackbarContextProps } from "@/hooks/snackbar/SnackbarContext";
import { useContext } from "react";

export const useSnackbar = (): SnackbarContextProps => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
};
