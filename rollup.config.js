import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import json from '@rollup/plugin-json';
import tsConfig from './tsconfig.json';
import del from 'rollup-plugin-delete';

const packageJson = require('./package.json');

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [peerDepsExternal(), resolve(), commonjs(), typescript(), json()],
    external: ['react', 'react-dom', '@mui/material', '@mui/material', '@emotion/react', '@emotion/styled'],
  },
  {
    input: 'src/index.ts',
    output: [{ file: 'dist/types.d.ts', format: 'es' }],
    plugins: [
      dts.default({
        compilerOptions: {
          baseUrl: tsConfig.compilerOptions.baseUrl,
          paths: tsConfig.compilerOptions.paths,
        },
      }),
      del({ targets: 'dist/*/types' }),
    ],
  },
];
