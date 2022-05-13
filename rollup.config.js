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
      format: 'cjs'
    }
  ],
  plugins: [
    resolve({

      // If you have external dependencies installed from
      // npm, you'll most likely need these plugins. In
      // some cases you'll need additional configuration �
      // consult the documentation for details:
      // https://github.com/rollup/rollup-plugin-commonjs
        preferBuiltins: true		
    }),
    babel({ 
        exclude: 'node_modules/**',
        presets: ['@babel/env', '@babel/preset-react']
    }),
    commonjs({
      preferBuiltins: false
    })
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
