import React, { useState } from "react";

interface GameScreenProps {
  onGameEnd: (correct: boolean) => void;
}

const GameScreen: React.FC<GameScreenProps> = ({ onGameEnd }) => {
  const [selected, setSelected] = useState<number | null>(null);
  const correctIndex = 1; // Geçici olarak 2. görseli doğru kabul edelim

  const handleSelect = (index: number) => {
    setSelected(index);
    const isCorrect = index === correctIndex;
    onGameEnd(isCorrect);
  };

  return (
    <div className="screen game-screen">
      <h2>Hangisi yapay zekâ üretimi?</h2>
      <div className="images">
        {[1, 2, 3].map((num) => (
          <img
            key={num}
            src={`https://placehold.co/200x200?text=Image+${num}`}
            alt={`Option ${num}`}
            onClick={() => handleSelect(num - 1)}
          />
        ))}
      </div>
    </div>
  );
};

export default GameScreen;
