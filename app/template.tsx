"use client";

import { motion, useReducedMotion } from "framer-motion";

// app/template.tsx remounts on every navigation, so this gives each page a
// quick, tasteful enter transition without needing AnimatePresence.
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, y: reduce ? 0 : 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
