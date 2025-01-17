"use client";

import { LoadingBarProvider } from "@/hooks/loading-bar/LoadingBarContext";
import { LoadingPageProvider } from "@/hooks/loading-page/LoadingPageContext";
import { SnackbarProvider } from "@/hooks/snackbar/SnackbarContext";

export default function LayoutRoot({ font, children }: { font: string; children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${font} custom-scrollbar flex justify-center font-inter text-body antialiased`}>
        <SnackbarProvider>
          <LoadingPageProvider>
            <LoadingBarProvider>
              <div className="w-full max-w-7xl bg-white">{children}</div>
            </LoadingBarProvider>
          </LoadingPageProvider>
        </SnackbarProvider>
      </body>
    </html>
  );
}
