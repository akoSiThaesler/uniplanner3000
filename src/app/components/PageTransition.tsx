// components/PageTransition.tsx
"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const MIN_TRANSITION_TIME = 1000; // Minimum display time in ms

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [showOverlay, setShowOverlay] = useState(false);
  const [showContent, setShowContent] = useState(true);

  useEffect(() => {
    // When the route changes, hide the content and show the overlay
    setShowContent(false);
    setShowOverlay(true);

    // Keep the overlay visible for at least MIN_TRANSITION_TIME
    const timer = setTimeout(() => {
      setShowOverlay(false);
      setShowContent(true);
    }, MIN_TRANSITION_TIME);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      <AnimatePresence>
        {showOverlay && (
          <motion.div
            key="transitionOverlay"
            initial={{ x: "-100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="fixed top-0 left-0 w-full h-full z-50"
            style={{
              background:
                "linear-gradient(135deg, var(--sidebar-bg), var(--background))",
            }}
          />
        )}
      </AnimatePresence>
      <div className={showContent ? "visible" : "invisible"}>{children}</div>
    </>
  );
}
