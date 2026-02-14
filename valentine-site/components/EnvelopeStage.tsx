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

      <div className="relative h-[33rem] w-full max-w-2xl">
        <AnimatePresence>
          {open && (
            <motion.article
              initial={{ opacity: 0, y: 72, scale: 0.96 }}
              animate={{ opacity: 1, y: -14, scale: 1 }}
              exit={{ opacity: 0, y: 38, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 130, damping: 18 }}
              className="paper-texture absolute left-1/2 top-10 z-30 w-[92%] -translate-x-1/2 rounded-2xl border border-white/80 px-6 py-7 shadow-[0_16px_36px_rgba(111,45,80,0.14)] sm:px-9"
            >
              <p className="text-center text-lg text-[#754160] sm:text-xl">
                To my dearest <span className="font-script text-3xl text-[#8a2b58]">Khrystyna</span>,
              </p>
              <p className="font-serif mt-4 text-base leading-8 text-[#5e3350] sm:text-xl">
                Khrystyna… you are actually dangerous. The way you sit there looking all sweet and innocent,
                knowing full well you’re about to distract me for the rest of the night? That’s not an accident.
                You tilt your head a certain way, give me that slow little smile, and suddenly I forget what I was
                saying. And don’t even get me started on that look you give me when you’re pretending you’re not
                teasing me. You love it. I see it. The quiet confidence, the soft voice, and then that spark in
                your eyes that says, “what are you going to do about it?” My серце beats faster every time you
                lean a little closer to the camera, every time you laugh and bite your lip like you don’t realize
                what that does to me. You’re sweet, but you’re also trouble. The best kind. And the fact that
                you’re thousands of miles away only makes it worse, because if you were any closer, I wouldn’t be
                this well behaved. So keep playing your little game, my beautiful Ukrainian firecracker. Keep
                acting innocent. Just know I’m counting down the days until I can whisper all of this in your ear
                instead of typing it… and trust me, I won’t be nearly this calm about it.
              </p>
            </motion.article>
          )}
        </AnimatePresence>

        <motion.button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: visible ? 0 : 120, opacity: visible ? 1 : 0 }}
          transition={{ type: "spring", stiffness: 130, damping: 18 }}
          className="absolute bottom-0 left-1/2 z-20 h-52 w-full max-w-xl -translate-x-1/2 rounded-2xl bg-[#f7d2e5]/80 p-3 shadow-[0_20px_48px_rgba(165,61,117,0.18)]"
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
      </div>
    </div>
  );
}