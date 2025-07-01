import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: '.',
  moduleFileExtensions: ['ts', 'js', 'json'],
  testMatch: ['**/*.spec.ts'],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts', '!src/**/*.spec.ts'],
  coverageDirectory: '../../coverage/apps/media-service',
  moduleNameMapper: {
    '^@app/(.*)$': '<rootDir>/../../libs/shared/src/$1',
    '^@wpl/(.*)$': '<rootDir>/../../libs/shared/src/$1',
  },
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
};

export default config;
