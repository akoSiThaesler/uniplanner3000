// app/layout.tsx (or wherever your RootLayout is located)
import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
/* import PageTransition from "./components/PageTransition"; */

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Uniplanner",
  description: "Plan your university courses and schedule",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${jetbrainsMono.variable} antialiased`}>
        {/*   <PageTransition> */}
        {children}
        {/* </PageTransition> */}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
