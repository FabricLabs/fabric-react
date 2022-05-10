// # Rollup Configuration

// Dependencies
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import minify from 'rollup-plugin-minify'
import resolve from 'rollup-plugin-node-resolve';
import pkg from './package.json';

export default [{
  input: 'module.js',
  output: [
    {
      name: 'FabricReact',
      file: pkg.main,
      format: 'es'
    }
  ],
  plugins: [
    resolve(),
    babel({ 
        exclude: 'node_modules/**',
        presets: ['@babel/env', '@babel/preset-react']
    }),
    commonjs()
  ],
  external: [
    'react',
    'prop-types',
  ],
  globals: {
    react: "React"
  },
  sourceMap: true
}];
