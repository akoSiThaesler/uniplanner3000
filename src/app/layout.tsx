"use client";
import "./globals.css";
import { useEffect } from "react";
import { AuthProvider } from "../context/AuthContext";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Footer from "./components/footer";
import { Analytics } from "@vercel/analytics/react";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    localStorage.clear();
    if (savedTheme) {
      localStorage.setItem("theme", savedTheme);
    }
  }, []);

  return (
    <html lang="en">
      <body className={`${jetbrainsMono.variable} antialiased`}>
        <AuthProvider>
          {children}
          <Footer />
        </AuthProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
