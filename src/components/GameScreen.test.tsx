import { render, screen } from "@testing-library/react";
import GameScreen from "./GameScreen";

// Audio.play'i mockluyoruz
beforeAll(() => {
  jest.spyOn(window.HTMLMediaElement.prototype, "play").mockImplementation(() => Promise.resolve());
});

describe("GameScreen", () => {
  test("oyun başlığı render edilir", () => {
    render(<GameScreen mode="classic" onResult={() => {}} />);
    expect(
      screen.getByText(/Hangisi AI tarafından üretildi/i)
    ).toBeInTheDocument();
  });

  test("resimler ekranda gösterilir", async () => {
    render(<GameScreen mode="classic" onResult={() => {}} />);
    const images = await screen.findAllByRole("img");
    expect(images.length).toBeGreaterThan(0);
  });

  test("fast modda 5 saniye bilgisi gösterilir", () => {
    render(<GameScreen mode="fast" onResult={() => {}} />);
    const texts = screen.getAllByText(/5 saniye/i);
    expect(texts.length).toBeGreaterThan(0);
  });
});
