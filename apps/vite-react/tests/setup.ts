import "@testing-library/jest-dom";
import { expect } from "vitest";

expect.extend({
  ...require("@testing-library/jest-dom/matchers").default,
});

// Mock ResizeObserver for Radix UI components
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Mock HTMLElement methods for Radix UI
Object.defineProperty(HTMLElement.prototype, "scrollIntoView", {
  writable: true,
  value: vi.fn(),
});

Object.defineProperty(HTMLElement.prototype, "getBoundingClientRect", {
  writable: true,
  value: () => ({
    width: 100,
    height: 100,
    top: 0,
    left: 0,
    bottom: 100,
    right: 100,
    x: 0,
    y: 0,
    toJSON: () => ({}),
  }),
});

Object.defineProperty(HTMLElement.prototype, "getComputedStyle", {
  writable: true,
  value: () => ({
    getPropertyValue: () => "100px",
  }),
});
