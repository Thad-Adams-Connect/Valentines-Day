"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type IntroSequenceProps = {
  onComplete: () => void;
};

const introName = "Khrystyna Pershuta…";

export function IntroSequence({ onComplete }: IntroSequenceProps) {
  const [typedText, setTypedText] = useState("");
  const [showPrompt, setShowPrompt] = useState(false);

  const isTypingDone = useMemo(() => typedText.length === introName.length, [typedText]);

  useEffect(() => {
    let currentIndex = 0;
    const typingTimer = window.setInterval(() => {
      currentIndex += 1;
      setTypedText(introName.slice(0, currentIndex));
      if (currentIndex >= introName.length) {
        window.clearInterval(typingTimer);
      }
    }, 92);

    return () => window.clearInterval(typingTimer);
  }, []);

  useEffect(() => {
    if (!isTypingDone) {
      return;
    }

    const revealTimer = window.setTimeout(() => {
      setShowPrompt(true);
    }, 700);

    const completeTimer = window.setTimeout(() => {
      onComplete();
    }, 2400);

    return () => {
      window.clearTimeout(revealTimer);
      window.clearTimeout(completeTimer);
    };
  }, [isTypingDone, onComplete]);

  return (
    <div className="flex min-h-[52vh] w-full flex-col items-center justify-center gap-5">
      <h1 className="font-script romantic-glow text-center text-5xl leading-tight text-[#8c3d67] sm:text-7xl">
        {typedText}
        <motion.span
          aria-hidden
          className="ml-1 inline-block"
          animate={{ opacity: [1, 0.2, 1] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.9, ease: "easeInOut" }}
        >
          |
        </motion.span>
      </h1>

      <AnimatePresence>
        {showPrompt && (
          <motion.p
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 120, damping: 17 }}
            className="max-w-xl text-center text-2xl font-medium text-[#6f2d50] sm:text-4xl"
          >
            Will you be my Valentine?
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}