module.exports = {
  testEnvironment: 'node',
  roots: ['<rootDir>/javascript', '<rootDir>/react', '<rootDir>/node'],
  testMatch: ['**/*.test.js', '**/*.test.jsx'],
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
  collectCoverageFrom: [
    '**/*.{js,jsx}',
    '!**/node_modules/**',
    '!**/coverage/**',
    '!jest.config.js',
    '!babel.config.js',
  ],
  coverageDirectory: 'coverage',
  verbose: true,
  projects: [
    {
      displayName: 'javascript',
      testEnvironment: 'node',
      testMatch: ['<rootDir>/javascript/**/*.test.js'],
      transform: {
        '^.+\\.js$': 'babel-jest',
      },
    },
    {
      displayName: 'react',
      testEnvironment: 'jsdom',
      testMatch: ['<rootDir>/react/**/*.test.jsx'],
      transform: {
        '^.+\\.(js|jsx)$': 'babel-jest',
      },
      setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    },
    {
      displayName: 'node',
      testEnvironment: 'node',
      testMatch: ['<rootDir>/node/**/*.test.js'],
      transform: {
        '^.+\\.js$': 'babel-jest',
      },
    },
  ],
};

