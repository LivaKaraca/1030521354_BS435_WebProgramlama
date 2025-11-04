import React from "react";

interface ResultScreenProps {
  isCorrect: boolean;
  onRestart: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ isCorrect, onRestart }) => {
  return (
    <div className="result-screen">
      {isCorrect ? (
        <h2>🎉 Tebrikler! Doğru tahmin ettin!</h2>
      ) : (
        <h2>❌ Maalesef yanlış tahmin!</h2>
      )}
      <button onClick={onRestart}>Yeni Oyun</button>
    </div>
  );
};

export default ResultScreen;
