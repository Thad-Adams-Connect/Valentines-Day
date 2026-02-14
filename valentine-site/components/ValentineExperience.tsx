"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AmbientBackground } from "./AmbientBackground";
import { BackgroundMusic } from "./BackgroundMusic";
import { IntroSequence } from "./IntroSequence";
import { QuestionStage } from "./QuestionStage";
import { CelebrationStage } from "./CelebrationStage";
import { EnvelopeStage } from "./EnvelopeStage";

export type ExperienceStage = "intro" | "question" | "celebration" | "envelope";

const smirkyRemarks = [
  "That was cute. Try again, sweetheart.",
  "Bold move. I still know your final answer.",
  "Negotiation denied. Destiny has better plans.",
  "Wow. Rejected? I am dramatically offended.",
  "This is getting theatrical, and I love it.",
  "The universe has spoken. You are choosing YES.",
];

const gifPool = [
  "/gifs/starting.gif",
  "/gifs/1no.gif",
  "/gifs/2no.gif",
  "/gifs/3no.gif",
  "/gifs/4no.gif",
  "/gifs/5no.gif",
  "/gifs/6no.gif",
];

export function ValentineExperience() {
  const [stage, setStage] = useState<ExperienceStage>("intro");
  const [noClicks, setNoClicks] = useState(0);
  const [gifIndex, setGifIndex] = useState(0);
  const [letterReady, setLetterReady] = useState(false);

  const currentRemark = noClicks > 0 ? smirkyRemarks[Math.min(noClicks - 1, 5)] : "";

  const yesScale = useMemo(() => {
    const growth = [1, 1.13, 1.32, 1.56, 1.9, 2.35, 5.2];
    return growth[Math.min(noClicks, growth.length - 1)];
  }, [noClicks]);

  const onNoClick = () => {
    setNoClicks((prev) => {
      if (prev >= 6) {
        return prev;
      }
      const next = prev + 1;
      setGifIndex(next);
      return next;
    });
  };

  const onYesClick = () => {
    setStage("celebration");
  };

  const onCelebrationDone = () => {
    setStage("envelope");
    setLetterReady(true);
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-4 py-8 sm:px-6">
      <AmbientBackground celebration={stage === "celebration" || stage === "envelope"} />
      <BackgroundMusic src="/audio/romantic.mp3" />

      <AnimatePresence mode="wait">
        {stage === "intro" && (
          <motion.main
            key="intro"
            initial={{ opacity: 0, scale: 0.98, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -12 }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            className="glass-card relative z-10 flex w-full max-w-4xl flex-col items-center gap-8 rounded-2xl px-6 py-10 text-center sm:px-10"
          >
            <IntroSequence onComplete={() => setStage("question")} />
          </motion.main>
        )}

        {stage === "question" && (
          <motion.main
            key="question"
            initial={{ opacity: 0, y: 12, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -14, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
            className="glass-card relative z-10 flex w-full max-w-4xl flex-col items-center gap-7 rounded-2xl px-5 py-7 sm:px-10 sm:py-10"
          >
            <QuestionStage
              noClicks={noClicks}
              yesScale={yesScale}
              onNoClick={onNoClick}
              onYesClick={onYesClick}
              remark={currentRemark}
              gif={gifPool[gifIndex]}
            />
          </motion.main>
        )}

        {stage === "celebration" && (
          <motion.main
            key="celebration"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="relative z-10 flex min-h-[70vh] w-full max-w-4xl items-center justify-center rounded-2xl"
          >
            <CelebrationStage onComplete={onCelebrationDone} />
          </motion.main>
        )}

        {stage === "envelope" && (
          <motion.main
            key="envelope"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            className="glass-card relative z-10 w-full max-w-4xl rounded-2xl px-5 py-8 sm:px-10 sm:py-10"
          >
            <EnvelopeStage ready={letterReady} />
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}