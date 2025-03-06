"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import GlassCard from "../components/GlassCard";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (authMode === "login") {
      const success = await login(email, password);
      if (success) {
        router.push("/webapp");
      } else {
        setError("Invalid credentials");
      }
    } else {
      // For a prototype sign-up we could simply log the user in as a student.
      // (In a real app you would handle registration differently.)
      await login(email, password);
      router.push("/webapp");
    }
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            {error && <p className="text-red-500">{error}</p>}
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
