module.exports = {
    verbose: true,
    clearMocks: false,
    collectCoverage: true,
    collectCoverageFrom: ['components/**/*.{ts,tsx}', '!**/node_modules/**'],
    coverageDirectory: 'coverage',
    coverageReporters: ['text', 'lcov'],
    reporters: ['default'],
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
    moduleDirectories: ['node_modules'],
    globals: {
        'ts-jest': {
            tsConfig: 'tsconfig.test.json'
        }
    },
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/test/__mocks__/file-mock.js',
        '\\.(css|scss|sass)$': '<rootDir>/test/__mocks__/object-mock.js'
    },
    testMatch: ['<rootDir>/**/__tests__/**/*.unit.(js|jsx|ts|tsx)'],
    transform: {
        '^.+unit\\.(js|jsx)$': 'babel-jest',
        '^.+\\.(ts|tsx)$': 'ts-jest'
    },
    setupFilesAfterEnv: ['<rootDir>test/setup.js']
};
