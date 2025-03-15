/** @type {import('jest').Config} */
const config = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  testMatch: ['**/__tests__/**/*.js', '**/?(*.)+(spec|test|integration|e2e).js'],
  coverageThreshold: {
    global: {
      branches: 52,
      functions: 52,
      lines: 52,
      statements: 52,
    },
  },
  coverageReporters: ['text', 'cobertura', 'html'],
  collectCoverageFrom: ['src/**'],
  coveragePathIgnorePatterns: ['/node_modules/'],
};

export default config;
