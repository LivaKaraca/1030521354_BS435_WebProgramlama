import React, { useState, useEffect } from "react";
import StartScreen from "./components/StartScreen";
import GameScreen from "./components/GameScreen";
import ResultScreen from "./components/ResultScreen";
import "./App.css";

const App: React.FC = () => {
  const [screen, setScreen] = useState<"start" | "game" | "result">("start");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [streak, setStreak] = useState<number>(0);

  // Sonuç geldiğinde streak hesapla
  useEffect(() => {
    if (screen === "result" && isCorrect !== null) {
      if (isCorrect) setStreak(prev => prev + 1);
      else setStreak(0);
    }
  }, [screen, isCorrect]);

  // Oyunu başlat
  const handleStart = () => setScreen("game");

  // Oyun bittiğinde
  const handleGameEnd = (correct: boolean) => {
    setIsCorrect(correct);
    setScreen("result");
  };

  // Yeniden başlat
  const handleRestart = () => {
    setIsCorrect(null);
    setScreen("start");
  };

  return (
    <div className="App">
      {screen === "start" && <StartScreen onStart={handleStart} />}
      {screen === "game" && <GameScreen onResult={handleGameEnd} />}
      {screen === "result" && isCorrect !== null && (
        <ResultScreen
          isCorrect={isCorrect}
          streak={streak}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
};

export default App;
