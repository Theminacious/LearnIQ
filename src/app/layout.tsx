// src/app/layout.tsx
import "@/app/globals.css";
import "github-markdown-css";

import { RootLayoutClient } from "@/components/Layouts/RootLayoutClient/page";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quiz Sensei",
  description: "Your quiz companion",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  );
}
