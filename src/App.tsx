import React, { useState } from "react";
import StartScreen from "./components/StartScreen";
import GameScreen from "./components/GameScreen";
import ResultScreen from "./components/ResultScreen";
import "./App.css";

const App: React.FC = () => {
  const [screen, setScreen] = useState<"start" | "game" | "result">("start");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleStart = () => setScreen("game");

  const handleGameEnd = (correct: boolean) => {
    setIsCorrect(correct);
    setScreen("result");
  };

  const handleRestart = () => {
    setIsCorrect(null);
    setScreen("start");
  };

  return (
    <div className="App">
      {screen === "start" && <StartScreen onStart={handleStart} />}
      {screen === "game" && <GameScreen onGameEnd={handleGameEnd} />}
      {screen === "result" && (
        <ResultScreen isCorrect={isCorrect} onRestart={handleRestart} />
      )}
    </div>
  );
};

export default App;
