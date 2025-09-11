// src/app/page.tsx
import { LandingPage } from "@/components/LandingPage/page";
import localFont from "next/font/local";

const geistSans = localFont({
  src: "../styles/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "../styles/fonts/GeistMonoVF.woff", 
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Page() {
  return (
    <div className={`${geistSans.variable} ${geistMono.variable}`}>
      <LandingPage />
    </div>
  );
}
