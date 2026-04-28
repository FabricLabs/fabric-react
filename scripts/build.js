'use strict';

// Settings
const settings = {
  NODE_ENV: process.env.NODE_ENV || 'production'
};

// Types
import Compiler from '@fabric/http/types/compiler.js';

// UI
import Interface from '../components/interface.js';

// Program Body
async function main (input = {}) {
  const site = new Interface(input);
  const compiler = new Compiler({
    document: site,
    webpack: {
      mode: 'development',
      experiments: {
        asyncWebAssembly: true
      },
      target: 'web',
      devtool: 'inline-source-map',
      module: {
        rules: [
          {
            test: /\.(js)$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react']
            }
          },
          {
            test: /\.css$/,
            use: [
              {
                loader: 'style-loader'
              },
              {
                loader: 'css-loader',
                options: {
                  modules: true,
                  sourceMap: true
                }
              }
            ]
          }
        ]
      }
    }
  });

  await compiler.compileTo('assets/index.html');

  return {
    site: site.id,
    webpack: compiler.settings.webpack
  };
}

// Run Program
main(settings).catch((exception) => {
  console.error('[BUILD:SITE]', '[EXCEPTION]', exception);
}).then((output) => {
  console.log('[BUILD:SITE]', '[OUTPUT]', output);
});
