module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  // coverageDirectory: 'coverage',
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.ts',
  ],
  // 支持源代码中相同的 `@` -> `src` 别名
  "moduleNameMapper": {
    // "atomic-kit": "<rootDir>/src/main.ts",
    "@/(.*)$": "<rootDir>/src/$1",
  },
}
