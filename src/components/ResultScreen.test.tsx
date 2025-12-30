import { render, screen, fireEvent } from "@testing-library/react";
import ResultScreen from "./ResultScreen";

describe("ResultScreen", () => {
  test("oyun bitti başlığı gösterilir", () => {
    render(
      <ResultScreen
        streak={3}
        onRestart={() => {}}
      />
    );

    expect(screen.getByText(/Oyun Bitti/i)).toBeInTheDocument();
  });

  test("ardışık doğru sayısı gösterilir", () => {
    render(
      <ResultScreen
        streak={5}
        onRestart={() => {}}
      />
    );

    expect(screen.getByText(/Ardışık Doğru/i)).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  test("tekrar oyna butonu çalışır", () => {
    const mockRestart = jest.fn();

    render(
      <ResultScreen
        streak={1}
        onRestart={mockRestart}
      />
    );

    fireEvent.click(screen.getByText(/Tekrar Oyna/i));
    expect(mockRestart).toHaveBeenCalledTimes(1);
  });
});
