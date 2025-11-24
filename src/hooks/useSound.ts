export const useSound = () => {
  const playCorrect = () => {
    const audio = new Audio("/sounds/correct.mp3");
    audio.volume = 0.4;
    audio.play();
  };

  const playWrong = () => {
    const audio = new Audio("/sounds/wrong.mp3");
    audio.volume = 0.4;
    audio.play();
  };

  return { playCorrect, playWrong };
};
