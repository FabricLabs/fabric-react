'use strict';

const Actor = require('@fabric/core/types/actor');

const React = require('react');
const ReactDOMServer = require('react-dom/server');

class ReactSPA extends Actor {
  constructor (settings = {}) {
    super(settings);

    this.settings = Object.assign({
      type: 'react'
    }, this.settings, settings);

    return this;
  }

  get JSX () {
    return (
      <div>Sample React SPA (@fabric/react)</div>
    );
  }

  _renderPathWithState (path, state = {}) {
    // TODO: render Jade to JSX, parse JSX string
    // see: templates/spa.jade
    let jsx = null;

    switch (path) {
      default:
      case '/':
        jsx = this.JSX;
        break;
    }

    if (!jsx) throw new Error(`Could not route path: ${path}`);

    // TODO: ensure state passed
    return ReactDOMServer.renderToString(jsx);
  }
}

module.exports = ReactSPA;
