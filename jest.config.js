/* eslint-disable no-undef */
/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  coverageReporters: ['text-summary'],
  collectCoverageFrom: ['./src/**'],
  coverageThreshold: {
    global: {
      lines: 25,
    },
  },
}
