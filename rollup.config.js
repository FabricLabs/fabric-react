// # Rollup Configuration

// Dependencies
import json from '@rollup/plugin-json';
import commonjs from '@rollup/plugin-commonjs';
// import minify from 'rollup-plugin-minify'
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';

export default [{
  input: 'components/index.js',
  output: [
    {
      name: 'FabricReact',
      file: "assets/fabric.react.js",
      format: 'cjs',
      globals: {
        'buffer': 'buffer',
        'crypto': 'crypto',
        'react': 'React',
        'react-dom': 'ReactDOM',
        'semantic-ui-react': 'semanticUIReact',
        'lodash.merge': 'merge',
        'bip39': 'bip39',
        'trezor-connect': 'TrezorConnect'
      },
    }
  ],
  external: [
    'react',
    'bip39',
    'trezor-connect',
    'semantic-ui-react',
    'lodash.merge'
  ],
  plugins: [
    babel({ 
        exclude: 'node_modules/**',
        presets: ['@babel/preset-env', '@babel/preset-react'],
        babelHelpers: 'bundled'
    }),
    resolve({
      // If you have external dependencies installed from
      // npm, you'll most likely need these plugins. In
      // some cases you'll need additional configuration �
      // consult the documentation for details:
      // https://github.com/rollup/rollup-plugin-commonjs
        // preferBuiltins: true		
    }),
    commonjs({
      preferBuiltins: false
    }),
    json()
  ],
  // sourceMap: true
}];
