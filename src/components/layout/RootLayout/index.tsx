"use client";

import { LoadingBarProvider } from "@/hooks/loading-bar/LoadingBarContext";
import { LoadingPageProvider } from "@/hooks/loading-page/LoadingPageContext";
import { SnackbarProvider } from "@/hooks/snackbar/SnackbarContext";

export default function LayoutRoot({ font, children }: { font: string; children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${font} custom-scrollbar font-inter text-body antialiased`}>
        <SnackbarProvider>
          <LoadingPageProvider>
            <LoadingBarProvider>{children}</LoadingBarProvider>
          </LoadingPageProvider>
        </SnackbarProvider>
      </body>
    </html>
  );
}
