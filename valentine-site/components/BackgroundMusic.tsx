"use client";

import { useEffect, useRef } from "react";

type BackgroundMusicProps = {
  src: string;
};

export function BackgroundMusic({ src }: BackgroundMusicProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    const targetVolume = 0.05;
    const fadeDurationMs = 1500;
    const fadeStepMs = 50;
    const fadeStep = targetVolume / (fadeDurationMs / fadeStepMs);

    audio.loop = true;
    audio.autoplay = true;
    audio.preload = "auto";
    audio.volume = 0;
    audio.setAttribute("playsinline", "true");
    audio.setAttribute("webkit-playsinline", "true");

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

    const playAndFade = async () => {
      try {
        await audio.play();
        fadeInToTarget();
        return true;
      } catch {
        return false;
      }
    };

    const onFirstPointerDown = () => {
      window.removeEventListener("pointerdown", onFirstPointerDown);
      void playAndFade();
    };

    void playAndFade().then((didAutoplay) => {
      if (!didAutoplay) {
        window.addEventListener("pointerdown", onFirstPointerDown, { once: true });
      }
    });

    return () => {
      window.removeEventListener("pointerdown", onFirstPointerDown);
      clearFade();
      audio.pause();
    };
  }, []);

  return <audio ref={audioRef} src={src} preload="auto" playsInline loop autoPlay />;
}
