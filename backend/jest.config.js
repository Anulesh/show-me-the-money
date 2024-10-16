module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testPathIgnorePatterns: ['<rootDir>/dist/', '<rootDir>/node_modules/'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
};
