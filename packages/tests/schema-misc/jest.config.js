module.exports = {
  transform: { "^.+\\.tsx?$": "@swc/jest" },
  moduleNameMapper: {
    "^@src/(.*)": "<rootDir>/src/$1",
    "^src/(.*)": "<rootDir>/src/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/src/setupDbTests.ts"],
  testMatch: ["<rootDir>/src/**/*.test.(ts|tsx)"],
  testEnvironment: "node",
  maxConcurrency: 1,
  resetMocks: true,
  reporters: [
    "default",
    [
      "jest-junit",
      { outputDirectory: "../../../artifacts", outputName: "junit-schema-misc.xml", usePathForSuiteName: "true" },
    ],
  ],
};
