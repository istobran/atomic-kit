import { defineConfig } from 'rollup';
import typescript from '@rollup/plugin-typescript';
import nodeResolve from '@rollup/plugin-node-resolve';
import alias from '@rollup/plugin-alias';
import { resolve } from 'path';

export default defineConfig({
  input: 'src/main.ts',
  output: [
    {
      file: 'dist/atomic-kit.umd.js',
      name: 'AtomicKit',
      format: "umd",
    },
    {
      file: 'dist/atomic-kit.esm.js',
      format: 'esm',
    }
  ],
  plugins: [
    alias({
      entries: [
        { find: '@', replacement: resolve(__dirname, 'src') },
      ]
    }),
    typescript({
      tsconfig: './tsconfig.json',
      declarationDir: 'types'
    }),
    nodeResolve(),
  ]
})
