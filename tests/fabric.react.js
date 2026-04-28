'use strict';

import assert from 'assert';
import * as overview from '../package.json' with { type: 'json' };
// const FabricBridge = require('../components/FabricBridge');

describe('@fabric/react', function () {
  describe('NPM Package', function () {
    it('exists', function () {
      assert.ok(overview);
    });
  });
});
