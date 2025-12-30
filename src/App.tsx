import React, { useState } from "react";
import StartScreen from "./components/StartScreen";
import GameScreen from "./components/GameScreen";
import ResultScreen from "./components/ResultScreen";

type Mode = "classic" | "fast";

const App: React.FC = () => {
  const [screen, setScreen] = useState<"start" | "game" | "result">("start");
  const [mode, setMode] = useState<Mode>("classic");
  const [streak, setStreak] = useState<number>(0);

  const handleResult = (correct: boolean) => {
    if (correct) {
      // ✅ doğru → streak artar, oyun devam eder
      setStreak((prev) => prev + 1);
    } else {
      // ❌ yanlış → oyun biter
      setScreen("result");
    }
  };

  const handleStart = (selectedMode: Mode) => {
    setMode(selectedMode);
    setStreak(0);
    setScreen("game");
  };

  const handleRestart = () => {
    setStreak(0);
    setScreen("start");
  };

  return (
    <>
      {screen === "start" && <StartScreen onStart={handleStart} />}

      {screen === "game" && (
        <GameScreen
          mode={mode}
          onResult={handleResult}
        />
      )}

      {screen === "result" && (
        <ResultScreen
          streak={streak}
          onRestart={handleRestart}
        />
      )}
    </>
  );
};

export default App;
