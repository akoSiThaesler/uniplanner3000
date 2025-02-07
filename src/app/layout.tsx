import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Analytics>
      <SpeedInsights>
        <html lang="en">
          <body className={`${jetbrainsMono.variable} antialiased`}>
            {children}
          </body>
        </html>
      </SpeedInsights>
    </Analytics>
  );
}
