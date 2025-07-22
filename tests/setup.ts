import { beforeAll, afterAll } from 'vitest';

beforeAll(() => {
  // Set up global test configuration
  process.env.NODE_ENV = 'test';
});

afterAll(() => {
  // Clean up global test state
  delete process.env.NODE_ENV;
});
