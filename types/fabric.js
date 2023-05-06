'use strict';

// Types
import Component from './component.js';
// import SPA from './spa';

// Components
// import * as Sample from './components/Sample.js';
// import * as FabricBridge from './components/FabricBridge';
// import * as FabricIdentity from './components/FabricIdentity';
// import * as FabricIdentityManager from './components/FabricIdentityManager';

const state = {};

class Fabric {
  constructor (settings = {}) {
    this.settings = Object.assign({
      alias: '@fabric/react'
    }, settings);
  }

  static Component () {
    return Component;
  }

  static SPA () {
    return SPA;
  }

  get state () {
    return state;
  }
}

export default Fabric;
