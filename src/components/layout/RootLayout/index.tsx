"use client";

import { LoadingBarProvider } from "@/hooks/loading-bar/LoadingBarContext";
import { LoadingPageProvider } from "@/hooks/loading-page/LoadingPageContext";
import { SnackbarProvider } from "@/hooks/snackbar/SnackbarContext";

export default function LayoutRoot({ font, children }: { font: string; children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${font} custom-scrollbar text-body flex justify-center font-inter antialiased`}>
        <SnackbarProvider>
          <LoadingPageProvider>
            <LoadingBarProvider>
              <div className="w-full">{children}</div>
            </LoadingBarProvider>
          </LoadingPageProvider>
        </SnackbarProvider>
      </body>
    </html>
  );
}
