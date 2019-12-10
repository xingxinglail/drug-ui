const base = require('./jest.config');

module.exports = Object.assign({}, base, {
    reporters: ['jest-junit'],
    collectCoverage: true,
    collectCoverageFrom: ['packages/drug-ui/src/**/*.{ts,tsx}', '!index.ts', '!**/node_modules/**'],
    coverageDirectory: 'coverage',
    coverageReporters: ['text', 'lcov']
});
