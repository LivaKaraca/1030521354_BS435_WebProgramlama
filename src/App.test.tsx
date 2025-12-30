import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

describe("App integration test", () => {
  test("uygulama start ekranı ile başlar", () => {
    render(<App />);

    expect(
      screen.getByText(/AI Tahmin Oyunu/i)
    ).toBeInTheDocument();
  });

  test("klasik mod seçilince oyun ekranına geçer", () => {
    render(<App />);

    fireEvent.click(screen.getByText(/Klasik Mod/i));

    expect(
      screen.getByText(/Hangisi AI tarafından üretildi/i)
    ).toBeInTheDocument();
  });

  test("oyun bitince sonuç ekranı gösterilir", () => {
    render(<App />);

    fireEvent.click(screen.getByText(/Klasik Mod/i));

    // iki yanlış tıklama → klasik mod biter
    const images = screen.getAllByRole("img");
    fireEvent.click(images[0]);
    fireEvent.click(images[0]);

    expect(
      screen.getByText(/Oyun Bitti/i)
    ).toBeInTheDocument();
  });
});
