import React from "react";
import "./ResultScreen.css";

interface Props {
  streak: number;
  onRestart: () => void;
}

const ResultScreen: React.FC<Props> = ({ streak, onRestart }) => {
  return (
    <div className="result-screen">
      <h2>❌ Oyun Bitti</h2>

      <div className="streak-box">
        🔥 Ardışık Doğru
        <span>{streak}</span>
      </div>

      <button className="restart-btn" onClick={onRestart}>
        🔄 Tekrar Oyna
      </button>
    </div>
  );
};

export default ResultScreen;
