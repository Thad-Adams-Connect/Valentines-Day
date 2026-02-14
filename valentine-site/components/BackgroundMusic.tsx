"use client";

import { useEffect, useRef } from "react";

type BackgroundMusicProps = {
  src: string;
};

export function BackgroundMusic({ src }: BackgroundMusicProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    audio.loop = true;
    audio.preload = "auto";
    audio.volume = 0;
    audio.load();

    let fadeTimer: number | null = null;

    const fadeIn = () => {
      if (fadeTimer) {
        window.clearInterval(fadeTimer);
      }
      fadeTimer = window.setInterval(() => {
        if (!audio) {
          return;
        }
        if (audio.volume >= 0.16) {
          window.clearInterval(fadeTimer as number);
          return;
        }
        audio.volume = Math.min(audio.volume + 0.012, 0.16);
      }, 130);
    };

    const tryPlay = async () => {
      try {
        await audio.play();
        fadeIn();
      } catch {
        const unlock = async () => {
          try {
            await audio.play();
            fadeIn();
          } finally {
            window.removeEventListener("pointerdown", unlock);
            window.removeEventListener("touchstart", unlock);
            window.removeEventListener("keydown", unlock);
          }
        };

        window.addEventListener("pointerdown", unlock, { once: true });
        window.addEventListener("touchstart", unlock, { once: true });
        window.addEventListener("keydown", unlock, { once: true });
      }
    };

    void tryPlay();

    return () => {
      if (fadeTimer) {
        window.clearInterval(fadeTimer);
      }
      audio.pause();
    };
  }, []);

  return <audio ref={audioRef} src={src} preload="auto" playsInline />;
}