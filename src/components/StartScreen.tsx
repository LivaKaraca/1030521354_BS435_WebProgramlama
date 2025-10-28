import React from "react";

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div className="screen start-screen">
      <h1>AI Guess Game</h1>
      <p>Üç görselden hangisinin yapay zekâ tarafından üretildiğini tahmin et!</p>
      <button onClick={onStart}>Başla</button>
    </div>
  );
};

export default StartScreen;
