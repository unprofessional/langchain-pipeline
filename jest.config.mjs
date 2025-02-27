/** @type {import('jest').Config} */
const config = {
  preset: 'jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.js$': [
      'babel-jest',
      {
        configFile: './babel.config.json',
      },
    ],
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  coverageThreshold: {
    global: {
      branches: 52,
      functions: 52,
      lines: 52,
      statements: 52,
    },
  },
  coverageReporters: [
    'text',
    'cobertura',
    'html',
  ],
  collectCoverageFrom: [
    'src/**',
  ],
  coveragePathIgnorePatterns: ['/node_modules/'],
};

export default config;
