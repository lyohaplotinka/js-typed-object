import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import pkg from './package.json';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';

export default [
  {
    input: './lib/main.js',
    output: {
      name: 'jsTypedObject',
      file: pkg.browser,
      format: 'umd'
    },
    plugins: [resolve(), commonjs(), babel(), terser()]
  },

  {
    input: './lib/main.js',
    output: [
      { file: pkg.main, format: 'cjs', name: 'jsTypedObject' },
      { file: pkg.module, format: 'es', name: 'jsTypedObject' }
    ]
  }
];
