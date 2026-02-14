"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type QuestionStageProps = {
  noClicks: number;
  yesScale: number;
  onNoClick: () => void;
  onYesClick: () => void;
  remark: string;
  gif: string;
};

type Position = {
  x: number;
  y: number;
};

const NO_BUTTON_WIDTH = 104;
const NO_BUTTON_HEIGHT = 52;

export function QuestionStage({ noClicks, yesScale, onNoClick, onYesClick, remark, gif }: QuestionStageProps) {
  const areaRef = useRef<HTMLDivElement | null>(null);
  const [bounds, setBounds] = useState({ width: 280, height: 180 });
  const [noPosition, setNoPosition] = useState<Position>({ x: 0, y: 0 });

  useEffect(() => {
    if (!areaRef.current) {
      return;
    }

    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) {
        return;
      }
      const { width, height } = entry.contentRect;
      setBounds({ width, height });
    });

    resizeObserver.observe(areaRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  const finalNoState = noClicks >= 6;

  const randomPosition = () => {
    const maxX = Math.max(bounds.width - NO_BUTTON_WIDTH - 16, 12);
    const maxY = Math.max(bounds.height - NO_BUTTON_HEIGHT - 16, 10);
    return {
      x: Math.round(Math.random() * maxX),
      y: Math.round(Math.random() * maxY),
    };
  };

  const nudgePosition = () => {
    const nudgeX = (Math.random() - 0.5) * 42;
    const nudgeY = (Math.random() - 0.5) * 28;

    const nextX = Math.max(0, Math.min(noPosition.x + nudgeX, bounds.width - NO_BUTTON_WIDTH));
    const nextY = Math.max(0, Math.min(noPosition.y + nudgeY, bounds.height - NO_BUTTON_HEIGHT));
    setNoPosition({ x: nextX, y: nextY });
  };

  const moveNoButton = (clickTarget: number) => {
    if (clickTarget <= 2) {
      nudgePosition();
      return;
    }
    if (clickTarget <= 5) {
      setNoPosition(randomPosition());
      return;
    }
    setNoPosition({
      x: Math.max(bounds.width - NO_BUTTON_WIDTH - 4, 4),
      y: Math.max(bounds.height - NO_BUTTON_HEIGHT - 4, 4),
    });
  };

  const handleNoClick = () => {
    if (finalNoState) {
      return;
    }
    const nextCount = Math.min(noClicks + 1, 6);
    moveNoButton(nextCount);
    onNoClick();
  };

  const noScale = useMemo(() => {
    if (noClicks < 5) {
      return 1;
    }
    if (noClicks === 5) {
      return 0.82;
    }
    return 0.45;
  }, [noClicks]);

  const onNoHover = () => {
    if (noClicks >= 3 && noClicks < 6) {
      setNoPosition(randomPosition());
    }
  };

  const gifSize = noClicks > 3 ? "62.5%" : "50%";

  return (
    <div className="flex w-full flex-col items-center gap-6">
      <h2 className="text-center text-2xl font-semibold text-[#6f2d50] sm:text-4xl">Will you be my Valentine?</h2>

      <div className="relative h-52 w-full max-w-[420px] overflow-hidden rounded-2xl bg-white/45 p-2 shadow-[0_12px_28px_rgba(165,61,117,0.16)] sm:h-64">
        <AnimatePresence mode="wait">
          <motion.img
            key={`${gif}-${noClicks}`}
            src={gif}
            alt="Bear reaction"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl object-contain"
            style={{ width: gifSize, height: gifSize }}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          />
        </AnimatePresence>
      </div>

      <div
        ref={areaRef}
        className="relative flex h-44 w-full max-w-[480px] items-center justify-center rounded-2xl bg-white/35 px-4 py-5"
      >
        <motion.button
          type="button"
          onClick={onYesClick}
          whileTap={{ scale: Math.max(yesScale - 0.05, 1) }}
          animate={{ scale: yesScale }}
          transition={{ type: "spring", stiffness: 220, damping: 18 }}
          className="relative z-20 rounded-full bg-[#ff4f9f] px-8 py-3 text-base font-semibold tracking-wide text-white shadow-[0_12px_24px_rgba(255,79,159,0.34)] sm:text-lg"
        >
          YES
        </motion.button>

        <motion.button
          type="button"
          onMouseEnter={onNoHover}
          onClick={handleNoClick}
          animate={{ x: noPosition.x, y: noPosition.y, scale: noScale }}
          transition={{ type: "spring", stiffness: 280, damping: 22 }}
          className="absolute left-2 top-2 z-30 rounded-full bg-white/95 px-7 py-3 text-sm font-semibold text-[#6f2d50] shadow-[0_8px_22px_rgba(165,61,117,0.2)] sm:text-base"
          style={{
            pointerEvents: finalNoState ? "none" : "auto",
            opacity: finalNoState ? 0.4 : 1,
          }}
        >
          NO
        </motion.button>
      </div>

      <AnimatePresence mode="wait">
        {remark && (
          <motion.p
            key={remark}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ type: "spring", stiffness: 130, damping: 20 }}
            className="min-h-8 px-2 text-center text-base font-medium text-[#7e3860] sm:text-lg"
          >
            {remark}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}