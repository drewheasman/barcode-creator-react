module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  collectCoverageFrom: ["src/**/*.{ts,tsx}"],
  setupFiles: ["<rootDir>/src/test-polyfills.ts"],
  setupFilesAfterEnv: ["jest-canvas-mock", "<rootDir>/src/setupTests.ts"],
};
