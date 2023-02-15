import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';

import clear from 'rollup-plugin-clear';
import filesize from 'rollup-plugin-filesize';
import postcss from 'rollup-plugin-postcss';
import typescript from 'rollup-plugin-typescript2';
// import { terser } from "rollup-plugin-terser"

import { DEFAULT_EXTENSIONS } from '@babel/core';

const fs = require('fs');
const path = require('path');

const srcFiles = fs.readdirSync(path.join(__dirname, './src'));
const components = srcFiles.filter((f) => f !== '.umi' && f !== 'index.ts');
console.log('components:------- ', components);

const external = [
  'react',
  'react-router-dom',
  'react-dom',
  'react-lazyload',
  'react-tiny-virtual-list',
  'react-transition-group',
];

let globals = {};

external.forEach((e) => {
  const arr = e.split('-');
  const str = arr.reduce(
    (t, v) => `${t}${v.replace(/^\S/, (s) => s.toUpperCase())}`,
    '',
  );
  globals[e] = str;
});

console.log('globals: ', globals);

const distPlugins = [
  clear({
    targets: ['dist'],
  }),
  typescript(),
  nodeResolve({ browser: true }),
  commonjs(),
  json(),
  postcss({
    extensions: ['.scss', '.css'],
    extract: true,
  }),
  babel({
    exclude: 'node_modules/**',
    extensions: [...DEFAULT_EXTENSIONS, '.ts', '.tsx'],
    babelHelpers: 'runtime',
  }),
  // terser(),
  filesize(),
];

const libConfig = components.map((componentName) => ({
  input: `src/${componentName}/index.tsx`,
  output: {
    format: 'umd',
    file: `lib/${componentName}/index.js`,
    name: componentName,
    globals,
  },
  external,
  plugins: [
    clear({
      targets: [`lib/${componentName}`],
    }),
    typescript({
      tsconfigOverride: {
        compilerOptions: {
          declarationDir: `lib/${componentName}`,
        },
        include: [`./src/${componentName}`, './typings.d.ts'],
      },
    }),
    nodeResolve({ browser: true }),
    commonjs(),
    json(),
    postcss({
      extensions: ['.scss', '.css'],
      extract: true,
    }),
    babel({
      exclude: 'node_modules/**',
      extensions: [...DEFAULT_EXTENSIONS, '.ts', '.tsx'],
      babelHelpers: 'runtime',
    }),
  ],
}));

export default [
  ...libConfig,
  {
    input: 'src/index.ts',
    output: {
      name: 'ace-ui',
      format: 'umd',
      file: 'dist/index.js',
      globals,
    },
    external,
    plugins: distPlugins,
  },
];
