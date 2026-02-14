"use client";

import { motion } from "framer-motion";

type AmbientBackgroundProps = {
  celebration: boolean;
};

const ambientPieces = Array.from({ length: 14 }, (_, index) => ({
  id: index,
  x: `${Math.random() * 95}%`,
  y: `${Math.random() * 95}%`,
  delay: Math.random() * 2,
  duration: 5 + Math.random() * 4,
  size: 8 + Math.random() * 20,
  shape: index % 3 === 0 ? "heart" : "circle",
}));

export function AmbientBackground({ celebration }: AmbientBackgroundProps) {
  return (
    <div className="pointer-events-none absolute inset-0">
      <motion.div
        className="absolute -left-10 top-8 h-44 w-44 rounded-full bg-pink-300/30 blur-3xl sm:h-60 sm:w-60"
        animate={{ scale: celebration ? [1, 1.2, 1] : [1, 1.08, 1], opacity: [0.4, 0.65, 0.4] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 6, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-6 right-0 h-52 w-52 rounded-full bg-rose-200/40 blur-3xl sm:h-72 sm:w-72"
        animate={{ scale: celebration ? [1, 1.25, 1] : [1, 1.12, 1], opacity: [0.45, 0.7, 0.45] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 7, ease: "easeInOut" }}
      />

      {ambientPieces.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute"
          style={{ left: piece.x, top: piece.y }}
          animate={{
            y: [0, -14, 0],
            opacity: [0.22, 0.7, 0.22],
            scale: [0.95, 1.07, 0.95],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: piece.duration,
            delay: piece.delay,
            ease: "easeInOut",
          }}
        >
          {piece.shape === "heart" ? (
            <span
              className="block text-pink-300/75"
              style={{ fontSize: `${Math.max(piece.size, 14)}px` }}
            >
              ❤
            </span>
          ) : (
            <span
              className="block rounded-full bg-white/55"
              style={{ width: `${piece.size}px`, height: `${piece.size}px` }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
}