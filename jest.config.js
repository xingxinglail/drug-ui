module.exports = {
    verbose: true,
    clearMocks: false,
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
        '\\.(css|scss|sass)$': '<rootDir>/test/__mocks__/object-mock.js',
        '^@drug-ui/core(.*)$': '<rootDir>/packages/drug-ui/src/$1',
        '^@drug-ui/styles(.*)$': '<rootDir>/packages/drug-ui-styles/src/$1',
        '^@drug-ui/icons(.*)$': '<rootDir>/packages/drug-ui-icons/src/$1',
        '^@drug-ui/hooks(.*)$': '<rootDir>/packages/drug-ui-hooks/src/$1'
    },
    testMatch: ['<rootDir>/**/__tests__/**/*.unit.(js|jsx|ts|tsx)'],
    transform: {
        '^.+unit\\.(js|jsx)$': 'babel-jest',
        '^.+\\.(ts|tsx)$': 'ts-jest'
    },
    setupFilesAfterEnv: ['<rootDir>test/setup.js']
};
