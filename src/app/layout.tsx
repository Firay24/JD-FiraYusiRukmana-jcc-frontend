import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import RootLayout from "@/components/layout/RootLayout";

const inter = localFont({
  // src: "../../public/fonts/inter.ttf",
  src: [
    { path: "../../public/fonts/inter.ttf", style: "normal" },
    { path: "../../public/fonts/inter-italic.ttf", style: "italic" },
  ],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "JCC",
  description: "Junior Championship Center",
};

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <RootLayout font={inter.variable} children={children} />;
}
