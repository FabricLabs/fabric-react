// # Rollup Configuration

// Dependencies
import json from '@rollup/plugin-json';
import commonjs from '@rollup/plugin-commonjs';
// import minify from 'rollup-plugin-minify'
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import nodeGlobals from 'rollup-plugin-node-globals';
import nodePolyfills from 'rollup-plugin-polyfill-node';

export default [{
  input: 'components/index.js',
  output: [
    {
      name: 'FabricReact',
      file: "assets/fabric.react.js",
      format: 'cjs',
      globals: {
        // 'buffer': 'buffer',
        // 'crypto': 'crypto',
        // 'http': 'http',
        'react': 'React',
        'react-dom': 'ReactDOM',
        'fomantic-ui-react': 'fomanticUIReact',
        // 'lodash.merge': 'merge',
        // 'bip39': 'bip39',
        // 'trezor-connect': 'TrezorConnect'
      },
      exports: 'named'
    }
  ],
  external: [
    'react',
    // 'bip39',
    // 'http',
    // 'trezor-connect',
    'fomantic-ui-react',
    // 'lodash.merge'
  ],
  plugins: [
    json(),
    nodeGlobals(),
    nodePolyfills(),
    babel({ 
        exclude: 'node_modules/**',
        presets: ['@babel/preset-env', '@babel/preset-react'],
        babelHelpers: 'bundled'
    }),
    commonjs({
      preferBuiltins: false,
      // transformMixedEsModules: true
    }),
    resolve({
      // If you have external dependencies installed from
      // npm, you'll most likely need these plugins. In
      // some cases you'll need additional configuration �
      // consult the documentation for details:
      // https://github.com/rollup/rollup-plugin-commonjs
        // preferBuiltins: true,	
        browser: true		
    }),
  ],
  // sourceMap: true
}];
