import '@testing-library/jest-dom';

// Mock console.warn to avoid noise in tests
const originalWarn = console.warn;
beforeEach(() => {
  console.warn = vi.fn();
});

afterEach(() => {
  console.warn = originalWarn;
});
