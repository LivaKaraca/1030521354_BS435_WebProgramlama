import { render, screen, fireEvent } from "@testing-library/react";
import StartScreen from "./StartScreen";

test("oyun modu butonları render ediliyor", () => {
  render(<StartScreen onStart={() => {}} />);

  expect(screen.getByText(/Klasik Mod/i)).toBeInTheDocument();
  expect(screen.getByText(/Hızlı Mod/i)).toBeInTheDocument();
});

test("klasik mod seçildiğinde onStart çağrılır", () => {
  const mockStart = jest.fn();
  render(<StartScreen onStart={mockStart} />);

  fireEvent.click(screen.getByText(/Klasik Mod/i));
  expect(mockStart).toHaveBeenCalledWith("classic");
});

test("hızlı mod seçildiğinde onStart çağrılır", () => {
  const mockStart = jest.fn();
  render(<StartScreen onStart={mockStart} />);

  fireEvent.click(screen.getByText(/Hızlı Mod/i));
  expect(mockStart).toHaveBeenCalledWith("fast");
});
