import React from "react";

interface ResultScreenProps {
  isCorrect: boolean;
  streak: number;
  onRestart: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({
  isCorrect,
  streak,
  onRestart,
}) => {
  return (
    <div style={{ textAlign: "center", marginTop: 80 }}>
      <h2>{isCorrect ? "✅ Doğru Bildin!" : "❌ Yanlış Seçim"}</h2>

      <p>
        🔥 Ardışık Doğru Sayısı: <strong>{streak}</strong>
      </p>

      <button onClick={onRestart} style={{ marginTop: 20 }}>
        Tekrar Oyna
      </button>
    </div>
  );
};

export default ResultScreen;
