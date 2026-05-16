module.exports = {
  testEnvironment: 'jest-environment-jsdom', // Explicitly use the modern jsdom package name
  
  // Maps your Vite-style absolute imports (e.g., '@/components/Button' maps to 'src/components/Button')
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    // Handles static assets so Jest doesn't crash trying to parse CSS/images
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|webp|svg)$': 'identity-obj-proxy',
  },

  // Tells Jest to use Babel to compile your JS and JSX files
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },

  // Points to your test setup file (make sure this file exists at src/setupTests.js)
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],

  // Forces Jest to compile Axios (which uses modern ES Modules) instead of ignoring it
  transformIgnorePatterns: [
    '/node_modules/(?!(axios)/)',
  ],
};