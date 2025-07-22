import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/mappings.ts', 'src/schemas.ts', 'src/types.ts'],
  splitting: true,
  sourcemap: true,
  clean: true,
  minify: true,
  treeshake: true,
  dts: {
    entry: [
      'src/index.ts',
      'src/mappings.ts',
      'src/schemas.ts',
      'src/types.ts',
    ],
    compilerOptions: {
      composite: false,
      isolatedModules: false,
    },
  },
  format: ['esm', 'cjs'],
  target: 'es2022',
});
