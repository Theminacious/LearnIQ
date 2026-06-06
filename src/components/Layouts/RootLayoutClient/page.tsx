"use client";

import HydrationZustand from "@/components/_helpers/HydrationZustand/page";
import { ThemeProvider } from "@/components/ThemeProvider/page";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/react";
import { AnimatePresence, motion } from "framer-motion";
import NextNProgress from "nextjs-progressbar";
import { GoogleAnalytics } from "@next/third-parties/google";

type RootLayoutClientProps = {
  children: React.ReactNode;
};

export const RootLayoutClient = ({ children }: RootLayoutClientProps) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <HydrationZustand>
        <AnimatePresence mode="wait">
          <GoogleAnalytics gaId="G-ZEYTJFB4TN" />

          <NextNProgress />
          <Analytics />

          <motion.div
            className="theme-dark"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Toaster />
            {children}
          </motion.div>
        </AnimatePresence>
      </HydrationZustand>
    </ThemeProvider>
  );
};
