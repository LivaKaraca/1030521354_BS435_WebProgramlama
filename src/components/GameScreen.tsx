import React, { useEffect, useState } from "react";
import { ImageOption } from "../types";

interface GameScreenProps {
  onResult: (isCorrect: boolean) => void;
}

const GameScreen: React.FC<GameScreenProps> = ({ onResult }) => {
  const [images, setImages] = useState<ImageOption[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [hint, setHint] = useState<string | null>(null);
  const [attempt, setAttempt] = useState<number>(1);
  const [timeLeft, setTimeLeft] = useState<number>(10); // ⏱️ 10 saniye süre

  // Görselleri rastgele karıştıran fonksiyon
  const shuffleArray = (array: ImageOption[]) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  // Oyunu başlatırken görselleri karıştır
  useEffect(() => {
    const imageSet: ImageOption[] = [
      {
        id: 1,
        src: "https://picsum.photos/id/1011/200/200",
        isAI: false,
        hint: "Arka plandaki doğa detaylarına dikkat et.",
      },
      {
        id: 2,
        src: "https://picsum.photos/id/1025/200/200",
        isAI: false,
        hint: "Yüz simetrisine dikkat et.",
      },
      {
        id: 3,
        src: "https://placehold.co/200x200?text=AI+Generated",
        isAI: true,
        hint: "Renk geçişleri biraz yapay görünüyor olabilir.",
      },
    ];
    setImages(shuffleArray(imageSet)); // 🔀 Rastgele sırala
  }, []);

  // Zamanlayıcı
  useEffect(() => {
    if (timeLeft === 0) {
      onResult(false);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, onResult]);

  // Görsel seçimi
  const handleSelect = (img: ImageOption) => {
    setSelected(img.id);

    if (img.isAI) {
      onResult(true);
    } else {
      if (attempt === 1) {
        setHint(img.hint);
        setAttempt(2);
      } else {
        onResult(false);
      }
    }
  };

  return (
    <div className="game-screen">
      <h2>Hangisi AI tarafından üretildi?</h2>
      <p className="timer">⏱️ Kalan süre: {timeLeft} saniye</p>

      <div className="image-grid">
        {images.map((img) => (
          <img
            key={img.id}
            src={img.src}
            alt={`option-${img.id}`}
            onClick={() => handleSelect(img)}
            className={selected === img.id ? "selected" : ""}
          />
        ))}
      </div>

      {hint && <p className="hint">💡 İpucu: {hint}</p>}
      <p>{attempt === 1 ? "İlk tahmin hakkın!" : "İkinci ve son tahminin!"}</p>
    </div>
  );
};

export default GameScreen;
