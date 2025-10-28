import React from "react";

interface ResultScreenProps {
  isCorrect: boolean | null;
  onRestart: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ isCorrect, onRestart }) => {
  return (
    <div className="screen result-screen">
      {isCorrect ? (
        <h2>🎉 Tebrikler! Doğru tahmin ettin.</h2>
      ) : (
        <h2>❌ Yanlış tahmin! Bir dahaki sefere daha dikkatli bak.</h2>
      )}
      <button onClick={onRestart}>Yeni Oyun</button>
    </div>
  );
};

export default ResultScreen;
