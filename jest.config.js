module.exports = {
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/html/*',
    '!src/database/*',
  ],
  coverageThreshold: {
    global: {
      statements: 25,
      branches: 25,
      functions: 25,
      lines: 25,
    },
  },
  modulePathIgnorePatterns: [
    '<rootDir>/dist/',
    '<rootDir>/.history',
    '<rootDir>/.vscode',
  ],
};
