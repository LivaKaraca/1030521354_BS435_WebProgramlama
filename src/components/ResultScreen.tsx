import React from "react";

interface Props {
  isCorrect: boolean;
  streak: number;
  onRestart: () => void;
}

const ResultScreen: React.FC<Props> = ({ isCorrect, streak, onRestart }) => {
  return (
    <div className="result-screen">
      <h1>{isCorrect ? "Doğru!" : "Yanlış!"}</h1>

      <p>Ardı ardına doğru cevap: <strong>{streak}</strong></p>

      <button onClick={onRestart}>Tekrar Oyna</button>
    </div>
  );
};

export default ResultScreen;
