export default {
  testEnvironment: "jest-fixed-jsdom",
  testEnvironmentOptions: {
    customExportConditions: [""],
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"], // Runs setup before tests
};
