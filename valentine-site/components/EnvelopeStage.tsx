"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type EnvelopeStageProps = {
  ready: boolean;
};

export function EnvelopeStage({ ready }: EnvelopeStageProps) {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ready) {
      return;
    }
    const timer = window.setTimeout(() => setVisible(true), 260);
    return () => window.clearTimeout(timer);
  }, [ready]);

  return (
    <div className="flex min-h-[70vh] w-full flex-col items-center justify-center gap-8 overflow-hidden rounded-2xl">
      <motion.h4
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 14 }}
        transition={{ type: "spring", stiffness: 120, damping: 19 }}
        className="text-center text-xl font-medium text-[#6f2d50] sm:text-2xl"
      >
        A letter for you
      </motion.h4>

      <motion.button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        initial={{ y: 120, opacity: 0 }}
        animate={{ y: visible ? 0 : 120, opacity: visible ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 130, damping: 18 }}
        className="relative h-52 w-full max-w-xl rounded-2xl bg-[#f7d2e5]/80 p-3 shadow-[0_20px_48px_rgba(165,61,117,0.18)]"
      >
        <motion.div
          className="absolute inset-x-3 top-3 h-24 origin-top rounded-2xl bg-[#f3bfd8]"
          animate={{ rotateX: open ? -170 : 0 }}
          style={{ transformStyle: "preserve-3d" }}
          transition={{ type: "spring", stiffness: 180, damping: 18 }}
        />
        <div className="absolute inset-3 rounded-2xl bg-[#ffddeb]/90" />
        <p className="font-script relative z-10 pt-24 text-center text-4xl text-[#8a2b58] sm:text-5xl">Khrystyna</p>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.article
            initial={{ opacity: 0, y: 60, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 130, damping: 18 }}
            className="paper-texture w-full max-w-2xl rounded-2xl border border-white/80 px-6 py-7 shadow-[0_16px_36px_rgba(111,45,80,0.14)] sm:px-9"
          >
            <p className="text-center text-lg text-[#754160] sm:text-xl">
              To my dearest <span className="font-script text-3xl text-[#8a2b58]">Khrystyna</span>,
            </p>
            <p className="font-serif mt-4 text-base leading-8 text-[#5e3350] sm:text-xl">
              This is your placeholder letter text. Replace it with your final romantic message. Keep it warm,
              sincere, and timeless. Let every sentence feel like a soft smile and a promise of beautiful
              moments together.
            </p>
          </motion.article>
        )}
      </AnimatePresence>
    </div>
  );
}