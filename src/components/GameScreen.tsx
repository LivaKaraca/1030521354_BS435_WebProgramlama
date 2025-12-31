import React, { useEffect, useRef, useState } from "react";
import { ImageOption } from "../types";
import "./GameScreen.css";

interface GameScreenProps {
  onResult: (correct: boolean) => void;
  mode: "classic" | "fast";
}

const realImages = [
  "https://picsum.photos/id/1011/300/300",
  "https://picsum.photos/id/1015/300/300",
  "https://picsum.photos/id/1020/300/300",
  "https://picsum.photos/id/1024/300/300",
  "https://picsum.photos/id/1025/300/300",
  "https://picsum.photos/id/1036/300/300",
];

const aiImages = [
  "https://picsum.photos/seed/ai1/300/300",
  "https://picsum.photos/seed/ai2/300/300",
  "https://picsum.photos/seed/ai3/300/300",
  "https://picsum.photos/seed/ai4/300/300",
  "https://picsum.photos/seed/ai5/300/300",
];

const shuffle = <T,>(arr: T[]) => [...arr].sort(() => Math.random() - 0.5);

const GameScreen: React.FC<GameScreenProps> = ({ onResult, mode }) => {
  const [images, setImages] = useState<ImageOption[]>([]);
  const [attempt, setAttempt] = useState(1);
  const [hint, setHint] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(mode === "fast" ? 5 : 10);

  // 🔊 SES AÇ / KAPA
  const [soundOn, setSoundOn] = useState(true);

  const correctSound = useRef<HTMLAudioElement | null>(null);
  const wrongSound = useRef<HTMLAudioElement | null>(null);

  /** 🔊 Güvenli ses çalma (toggle + browser + jest uyumlu) */
  const playSound = (audio: HTMLAudioElement | null) => {
    if (!soundOn || !audio) return;

    audio.pause();
    audio.currentTime = 0;

    const result = audio.play();
    if (result && typeof result.catch === "function") {
      result.catch(() => {});
    }
  };

  const generateRound = () => {
    const real = shuffle(realImages).slice(0, 2);
    const ai = shuffle(aiImages)[0];

    setImages(
      shuffle([
        { id: 1, src: real[0], isAI: false, hint: "Işık ve gölgeler doğal mı?" },
        { id: 2, src: real[1], isAI: false, hint: "Detaylar aşırı kusursuz mu?" },
        { id: 3, src: ai, isAI: true, hint: "Kenarlar yapay duruyor olabilir." },
      ])
    );

    setAttempt(1);
    setHint(null);
    setTimeLeft(mode === "fast" ? 5 : 10);
  };

  useEffect(() => {
    correctSound.current = new Audio("/sounds/correct.mp3");
    wrongSound.current = new Audio("/sounds/wrong.mp3");
    generateRound();
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      playSound(wrongSound.current);
      onResult(false);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleSelect = (img: ImageOption) => {
    if (img.isAI) {
      playSound(correctSound.current);
      onResult(true);
      generateRound();
      return;
    }

    playSound(wrongSound.current);

    if (mode === "fast") {
      onResult(false);
      return;
    }

    if (attempt === 1) {
      setHint(img.hint);
      setAttempt(2);
    } else {
      onResult(false);
    }
  };

  return (
    <div className="game-screen">
      <header className="game-header">
        <h2>🤖 Hangisi AI tarafından üretildi?</h2>

        <div className="header-right">
          <span className={`mode-badge ${mode}`}>
            {mode === "fast" ? "⚡ Hızlı Mod" : "🎯 Klasik Mod"}
          </span>

          {/* 🔊 SES TOGGLE */}
          <button
            className="sound-toggle"
            onClick={() => setSoundOn((prev) => !prev)}
            title={soundOn ? "Sesi Kapat" : "Sesi Aç"}
          >
            {soundOn ? "🔊" : "🔇"}
          </button>
        </div>
      </header>

      <div className="timer-box">
        <p>⏱️ {timeLeft} saniye</p>
        <div className="time-bar">
          <div
            className="time-progress"
            style={{
              width: `${(timeLeft / (mode === "fast" ? 5 : 10)) * 100}%`,
            }}
          />
        </div>
      </div>

      <div className="image-grid">
        {images.map((img) => (
          <div
            key={img.id}
            className="image-card"
            onClick={() => handleSelect(img)}
          >
            <img src={img.src} alt="choice" />
          </div>
        ))}
      </div>

      <div className="info-area">
        {mode === "classic" && hint && (
          <p className="hint">💡 İpucu: {hint}</p>
        )}

        {mode === "classic" && (
          <p className="attempt">
            {attempt === 1
              ? "İlk tahmin hakkın"
              : "İkinci ve son tahminin"}
          </p>
        )}

        {mode === "fast" && (
          <p className="fast-info">
            ⚡ Bu modda süren yalnızca <b>5 saniye</b>
          </p>
        )}
      </div>
    </div>
  );
};

export default GameScreen;
