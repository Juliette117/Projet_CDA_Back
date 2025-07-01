import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: '.',
  moduleFileExtensions: ['ts', 'js', 'json'],
  testMatch: ['**/*.spec.ts'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.spec.ts',
  ],
  coverageDirectory: '../../coverage/apps/playlist-service',
  moduleNameMapper: {
    '^@app/(.*)$': '<rootDir>/../../libs/shared/src/$1',
  },
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
};

export default config;
