export default {
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
    transform: {
        "^.+\\.js$": "babel-jest",
    },
    testMatch: ["**/__tests__/**/*.js?(x)", "**/?(*.)+(spec|test).js?(x)"],
    moduleFileExtensions: ["js", "json", "node"],
    moduleNameMapper: {
        "\\.(css|less|scss|sass)$": "identity-obj-proxy",
        "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/__mocks__/fileMock.js",
        "^@assets/(.*)$": "<rootDir>/assets/js/$1",
        "^@classes/(.*)$": "<rootDir>/assets/js/classes/$1",
        "^@forms/(.*)$": "<rootDir>/assets/js/forms/$1",
        "^@utils/(.*)$": "<rootDir>/assets/js/utils/$1",
    },
    collectCoverage: true,
    coverageDirectory: "coverage",
};
