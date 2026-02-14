"use client";

import { useEffect, useRef } from "react";

type BackgroundMusicProps = {
  src: string;
};

export function BackgroundMusic({ src }: BackgroundMusicProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeTimerRef = useRef<number | null>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || startedRef.current) {
      return;
    }
    startedRef.current = true;

    const targetVolume = 0.3;
    const fadeDurationMs = 1500;
    const fadeStepMs = 50;
    const fadeStep = targetVolume / (fadeDurationMs / fadeStepMs);

    audio.loop = true;
    audio.preload = "auto";
    audio.volume = 0;
    audio.muted = true;
    audio.setAttribute("playsinline", "true");
    audio.setAttribute("webkit-playsinline", "true");
    audio.load();

    const clearFade = () => {
      if (fadeTimerRef.current) {
        window.clearInterval(fadeTimerRef.current);
        fadeTimerRef.current = null;
      }
    };

    const fadeInToTarget = () => {
      clearFade();
      fadeTimerRef.current = window.setInterval(() => {
        if (audio.volume >= targetVolume) {
          clearFade();
          return;
        }
        audio.volume = Math.min(audio.volume + fadeStep, targetVolume);
      }, fadeStepMs);
    };

    const startAudiblePlayback = async () => {
      audio.muted = false;
      try {
        await audio.play();
        fadeInToTarget();
        return true;
      } catch {
        return false;
      }
    };

    const tryAutoplay = async () => {
      try {
        await audio.play();
        return startAudiblePlayback();
      } catch {
        return false;
      }
    };

    const unlockOnInteraction = () => {
      void startAudiblePlayback().then((didStart) => {
        if (didStart) {
          window.removeEventListener("pointerdown", unlockOnInteraction);
          window.removeEventListener("touchstart", unlockOnInteraction);
          window.removeEventListener("keydown", unlockOnInteraction);
        }
      });
    };

    void tryAutoplay().then((didAutoplay) => {
      if (!didAutoplay) {
        window.addEventListener("pointerdown", unlockOnInteraction);
        window.addEventListener("touchstart", unlockOnInteraction);
        window.addEventListener("keydown", unlockOnInteraction);
      }
    });

    return () => {
      window.removeEventListener("pointerdown", unlockOnInteraction);
      window.removeEventListener("touchstart", unlockOnInteraction);
      window.removeEventListener("keydown", unlockOnInteraction);
      clearFade();
      audio.pause();
    };
  }, []);

  return <audio ref={audioRef} src={src} preload="auto" playsInline autoPlay muted loop />;
}