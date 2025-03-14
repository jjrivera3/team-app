module.exports = function (wallaby) {
  process.env.NODE_OPTIONS = "--experimental-vm-modules"; // ✅ Ensure Jest runs in ESM mode

  return {
    files: ["src/**/*.{js,jsx}", "!src/**/__tests__/**/*.{test,spec}.{js,jsx}"],
    tests: ["src/**/__tests__/**/*.{test,spec}.{js,jsx}"],

    env: {
      type: "node",
      runner: "node",
    },

    testFramework: "jest",

    setup: function (wallaby) {
      const jestConfig = require("./jest.config.mjs"); // ✅ Load Jest config
      wallaby.testFramework.configure(jestConfig);
    },

    reportConsoleErrorAsError: true, // ✅ Ensure errors show up properly
    debug: true, // ✅ Enable debug mode
  };
};
