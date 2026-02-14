"use client";

import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";

type CelebrationStageProps = {
  onComplete: () => void;
};

export function CelebrationStage({ onComplete }: CelebrationStageProps) {
  const confetti = useMemo(
    () =>
      Array.from({ length: 70 }, (_, index) => ({
        id: index,
        x: Math.random() * 100,
        y: Math.random() * 20,
        rotate: Math.random() * 360,
        size: 8 + Math.random() * 8,
        duration: 1.4 + Math.random() * 1.2,
        delay: Math.random() * 0.35,
      })),
    [],
  );

  useEffect(() => {
    const timer = window.setTimeout(() => onComplete(), 2400);
    return () => window.clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="relative flex min-h-[68vh] w-full items-center justify-center overflow-hidden rounded-2xl bg-white/20">
      {confetti.map((piece) => (
        <motion.span
          key={piece.id}
          className="absolute rounded-full"
          style={{
            left: `${piece.x}%`,
            top: `${piece.y}%`,
            width: `${piece.size}px`,
            height: `${piece.size * 0.6}px`,
            background: piece.id % 2 ? "#ff6fb4" : "#ffd2e8",
          }}
          initial={{ y: -80, opacity: 0, rotate: piece.rotate }}
          animate={{ y: 560, opacity: [0, 1, 1, 0], rotate: piece.rotate + 220 }}
          transition={{ duration: piece.duration, delay: piece.delay, ease: "easeOut" }}
        />
      ))}

      <motion.h3
        initial={{ opacity: 0, scale: 0.75, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 170, damping: 14 }}
        className="relative z-20 text-center text-4xl font-bold text-[#8b2b5a] sm:text-7xl"
      >
        You chose wisely.
      </motion.h3>
    </div>
  );
}