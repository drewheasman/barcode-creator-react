module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  collectCoverageFrom: ["src/**/*.{ts,tsx}"],
  setupFilesAfterEnv: ["jest-canvas-mock"],
};
