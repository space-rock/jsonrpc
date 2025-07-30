import path from 'path';
import { defineConfig } from 'rollup';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import analyze from 'rollup-plugin-analyzer';

const entries = [
  'src/index.ts',
  'src/mappings.ts',
  'src/schemas.ts',
  'src/types.ts',
];

const createConfig = format => ({
  input: entries,
  output: entries.map(() => {
    const entryFileNames = format === 'cjs' ? `[name].cjs` : `[name].js`;

    return {
      dir: 'dist',
      format,
      sourcemap: true,
      exports: 'auto',
      entryFileNames,
      preserveModules: true,
      preserveModulesRoot: 'src',
    };
  }),
  plugins: [
    resolve(),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
      sourceMap: false,
    }),
    analyze({ summaryOnly: true }),
    // terser()
  ],
});

export default defineConfig([createConfig('esm'), createConfig('cjs')]);
