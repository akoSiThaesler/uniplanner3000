"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import GlassCard from "../components/GlassCard";

export default function Login() {
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(`${authMode} form submitted.`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--background)] px-4">
      <GlassCard title={authMode === "login" ? "Login" : "Sign Up"}>
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setAuthMode("login")}
            className={`mx-4 pb-1 transition-colors ${
              authMode === "login"
                ? "border-b-2 border-[var(--highlight-color)] text-[var(--foreground)]"
                : "text-gray-500"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setAuthMode("signup")}
            className={`mx-4 pb-1 transition-colors ${
              authMode === "signup"
                ? "border-b-2 border-[var(--highlight-color)] text-[var(--foreground)]"
                : "text-gray-500"
            }`}
          >
            Sign Up
          </button>
        </div>
        <AnimatePresence mode="wait">
          <motion.form
            key={authMode}
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
            initial={{ opacity: 0, x: authMode === "login" ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: authMode === "login" ? 20 : -20 }}
            transition={{ duration: 0.3 }}
          >
            {authMode === "signup" && (
              <motion.input
                type="text"
                placeholder="Full Name"
                required
                className="p-3 border rounded focus:outline-none focus:ring focus:border-[var(--highlight-color)]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            )}
            <motion.input
              type="email"
              placeholder="Email"
              required
              className="p-3 border rounded focus:outline-none focus:ring focus:border-[var(--highlight-color)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.input
              type="password"
              placeholder="Password"
              required
              className="p-3 border rounded focus:outline-none focus:ring focus:border-[var(--highlight-color)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
            {authMode === "signup" && (
              <motion.input
                type="password"
                placeholder="Confirm Password"
                required
                className="p-3 border rounded focus:outline-none focus:ring focus:border-[var(--highlight-color)]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            )}
            <motion.button
              type="submit"
              className="py-3 px-4 bg-[var(--highlight-color)] text-white rounded hover:bg-[var(--highlight-hover)] transition-colors"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {authMode === "login" ? "Login" : "Sign Up"}
            </motion.button>
          </motion.form>
        </AnimatePresence>
      </GlassCard>
      <div className="mt-6">
        <Link href="/webapp">
          <button className="py-3 px-4 bg-[var(--highlight-color)] text-white rounded hover:bg-[var(--highlight-hover)] transition-colors">
            Continue as Demo
          </button>
        </Link>
      </div>
    </div>
  );
}
