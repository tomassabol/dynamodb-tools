/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/en/configuration.html
 */

module.exports = {
  /**
   * Paths
   */

  // A list of paths to directories that Jest should use to search for files in
  roots: ["./test"],

  // The glob patterns Jest uses to detect test files
  testMatch: ["<rootDir>/test/**/*.test.ts"],

  // Transformers for files
  transform: {
    "^.+\\.tsx?$": [
      "esbuild-jest",
      {
        sourcemap: true,
      },
    ],
  },

  /*
   * Results processing
   */

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // An array of glob patterns indicating a set of files for which coverage information should be collected
  collectCoverageFrom: ["src/**/*.ts"],

  // The directory where Jest should output its coverage files
  coverageDirectory: ".coverage",

  // Export test results fo SonarQube scanner to process test results
  testResultsProcessor: "jest-sonar-reporter",

  /*
   * Test environment
   */

  // The test environment that will be used for testing
  testEnvironment: "node",

  // Run for all tests
  // setupFiles: ["<rootDir>/test/env.ts"],

  /*
   * Mocks
   */

  // Automatically clear mock calls and instances between every test
  clearMocks: true,
}
