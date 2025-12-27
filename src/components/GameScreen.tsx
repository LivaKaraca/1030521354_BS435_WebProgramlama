import React, { useEffect, useRef, useState } from "react";
import { ImageOption } from "../types";

interface GameScreenProps {
  onResult: (isCorrect: boolean) => void;
}

const GameScreen: React.FC<GameScreenProps> = ({ onResult }) => {
  const [images, setImages] = useState<ImageOption[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [hint, setHint] = useState<string | null>(null);
  const [attempt, setAttempt] = useState<number>(1);
  const [timeLeft, setTimeLeft] = useState<number>(10);

  const correctSound = useRef<HTMLAudioElement | null>(null);
  const wrongSound = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    correctSound.current = new Audio("/sounds/correct.mp3");
    wrongSound.current = new Audio("/sounds/wrong.mp3");
    startGame();
  }, []);

  // 🔀 Karıştırma
  const shuffleArray = <T,>(array: T[]): T[] =>
    [...array].sort(() => Math.random() - 0.5);

  // 🧠 Oyun başlat
  const startGame = () => {
    setSelected(null);
    setHint(null);
    setAttempt(1);
    setTimeLeft(10);

    const realImages: ImageOption[] = [
      {
        id: 1,
        src: "https://picsum.photos/id/1011/200/200",
        isAI: false,
        hint: "Doğal ışık ve detaylara dikkat et.",
      },
      {
        id: 2,
        src: "https://picsum.photos/id/1015/200/200",
        isAI: false,
        hint: "Bulutlar çok doğal görünüyor.",
      },
      {
        id: 3,
        src: "https://picsum.photos/id/1020/200/200",
        isAI: false,
        hint: "Derinlik hissi güçlü.",
      },
      {
        id: 4,
        src: "https://picsum.photos/id/1039/200/200",
        isAI: false,
        hint: "Renk geçişleri yumuşak.",
      },
      {
        id: 5,
        src: "https://picsum.photos/id/1043/200/200",
        isAI: false,
        hint: "Doğal perspektif var.",
      },
    ];

    const aiImages: ImageOption[] = [
      {
        id: 100,
        src: "https://placehold.co/200x200?text=AI+Landscape+1",
        isAI: true,
        hint: "Detaylar fazla kusursuz olabilir.",
      },
      {
        id: 101,
        src: "https://placehold.co/200x200?text=AI+Landscape+2",
        isAI: true,
        hint: "Doku tekrarlarına dikkat et.",
      },
      {
        id: 102,
        src: "https://placehold.co/200x200?text=AI+Landscape+3",
        isAI: true,
        hint: "Işık yönü tutarsız olabilir.",
      },
    ];

    const selectedAI = shuffleArray(aiImages)[0];
    const selectedReal = shuffleArray(realImages).slice(0, 4);

    setImages(shuffleArray([selectedAI, ...selectedReal]));
  };

  // ⏱️ Zamanlayıcı
  useEffect(() => {
    if (timeLeft === 0) {
      wrongSound.current?.play();
      onResult(false);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, onResult]);

  const handleSelect = (img: ImageOption) => {
    if (selected !== null) return;

    setSelected(img.id);

    if (img.isAI) {
      correctSound.current?.play();
      onResult(true);
    } else {
      if (attempt === 1) {
        wrongSound.current?.play();
        setHint(img.hint);
        setAttempt(2);
      } else {
        wrongSound.current?.play();
        onResult(false);
      }
    }
  };

  return (
    <div className="game-screen">
      <h2>Hangisi AI tarafından üretildi?</h2>
      <p>⏱️ Kalan süre: {timeLeft} saniye</p>

      <div className="image-grid">
        {images.map(img => (
          <img
            key={img.id}
            src={img.src}
            onClick={() => handleSelect(img)}
            className={selected === img.id ? "selected" : ""}
            alt="option"
          />
        ))}
      </div>

      {hint && <p className="hint">💡 İpucu: {hint}</p>}
    </div>
  );
};

export default GameScreen;
