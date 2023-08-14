module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  collectCoverageFrom: ["**/*.{ts,tsx}", "!**/node_modules/**"],
  setupFilesAfterEnv: ["jest-canvas-mock"],
};
