import "@testing-library/jest-dom";

// play()
Object.defineProperty(HTMLMediaElement.prototype, "play", {
  configurable: true,
  value: jest.fn(),
});

// pause() (bazı ortamlarda gerekir)
Object.defineProperty(HTMLMediaElement.prototype, "pause", {
  configurable: true,
  value: jest.fn(),
});
