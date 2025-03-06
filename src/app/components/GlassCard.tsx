"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlassCardProps {
  title?: string;
  children: ReactNode;
  delay?: number;
}

const GlassCard = ({ title, children, delay = 0 }: GlassCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    viewport={{ once: true }}
    className="max-w-6xl mx-auto mb-16 p-6 sm:p-8 bg-[var(--glass-background)] backdrop-blur-md border border-[var(--glass-border)] rounded-lg shadow"
  >
    {title && (
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-[var(--foreground)]">
        {title}
      </h2>
    )}
    {children}
  </motion.div>
);

export default GlassCard;
