import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    coverage: {
      enabled: true,
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: [
        'node_modules/**',
        'dist/**',
        'coverage/**',
        '**/*.d.ts',
        '**/*.config.*',
        '**/*.spec.ts',
        '**/*.test.ts',
        '**/tests/**',
        'codegen/**',
        '.github/**',
        'packages/*/dist/**',
        'packages/*/tsup.config.ts',
      ],
      include: ['packages/*/src/**/*.ts'],
    },
    include: [
      'packages/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
      'tests/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
    ],
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.turbo/**',
      '**/coverage/**',
      '**/.github/**',
      '**/codegen/dist/**',
    ],
    setupFiles: ['./tests/setup.ts'],
  },
  resolve: {
    alias: {
      '@space-rock/jsonrpc-types': path.resolve(
        __dirname,
        './packages/types/src',
      ),
      '@space-rock/jsonrpc-client': path.resolve(
        __dirname,
        './packages/client/src',
      ),
    },
  },
});
