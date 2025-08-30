"use client";
import "@/utils/chartConfig";
import "flowbite";
import { useEffect } from "react";
import { Flowbite } from "flowbite-react";
import { LoadingBarProvider } from "@/hooks/loading-bar/LoadingBarContext";
import { LoadingPageProvider } from "@/hooks/loading-page/LoadingPageContext";
import { SnackbarProvider } from "@/hooks/snackbar/SnackbarContext";
import { Toaster } from "react-hot-toast";

export default function LayoutRoot({ font, children }: { font: string; children: React.ReactNode }) {
  useEffect(() => {
    import("flowbite");
  }, []);
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${font} custom-scrollbar text-body flex justify-center font-inter antialiased`}>
        <SnackbarProvider>
          <LoadingPageProvider>
            <LoadingBarProvider>
              <Flowbite>
                <div className="w-full">
                  {children}
                  <Toaster position="top-right" reverseOrder={false} />
                </div>
              </Flowbite>
            </LoadingBarProvider>
          </LoadingPageProvider>
        </SnackbarProvider>
      </body>
    </html>
  );
}
