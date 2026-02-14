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
  audio.autoplay = true;
    audio.preload = "auto";
    audio.volume = 0;
    audio.muted = true;
    audio.load();

    let fadeTimer: number | null = null;
  let retryTimer: number | null = null;
    let unmuteTimer: number | null = null;

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

    const becomeAudible = () => {
      if (unmuteTimer) {
        window.clearTimeout(unmuteTimer);
      }
      unmuteTimer = window.setTimeout(() => {
        audio.muted = false;
        fadeIn();
      }, 120);
    };

    const tryPlay = async () => {
      try {
        await audio.play();
        becomeAudible();
        if (retryTimer) {
          window.clearInterval(retryTimer);
          retryTimer = null;
        }
      } catch {
        audio.muted = true;
      }
    };

    const handleEnded = () => {
      audio.currentTime = 0;
      void audio.play();
    };

    const handleCanPlay = () => {
      void tryPlay();
    };

    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("canplay", handleCanPlay);

    void tryPlay();
    retryTimer = window.setInterval(() => {
      if (audio.paused) {
        void tryPlay();
      }
    }, 1500);

    return () => {
      if (fadeTimer) {
        window.clearInterval(fadeTimer);
      }
      if (retryTimer) {
        window.clearInterval(retryTimer);
      }
      if (unmuteTimer) {
        window.clearTimeout(unmuteTimer);
      }
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("canplay", handleCanPlay);
      audio.pause();
    };
  }, []);

  return <audio ref={audioRef} src={src} preload="auto" playsInline autoPlay muted />;
}