export default {
  clearMocks: true,
  coverageProvider: 'v8',
  globals: { 'NODE_ENV': 'test' },
  preset: 'ts-jest',
  slowTestThreshold: 10,
  testEnvironment: 'node',
  testMatch: ['**/__tests__/*.test.ts'],
}
