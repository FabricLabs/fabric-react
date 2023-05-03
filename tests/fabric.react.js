'use strict';

const assert = require('assert');
const overview = require('../package');
// const FabricBridge = require('../components/FabricBridge');

describe('@fabric/react', function () {
  describe('NPM Package', function () {
    it('exists', function () {
      assert.ok(overview);
    });
  });
});
