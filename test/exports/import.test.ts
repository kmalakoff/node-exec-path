const assert = require('assert');
const { satisfiesSemverSync } = require('node-exec-path');

describe('exports .ts', function () {
  it('defaults', function () {
    assert.equal(typeof satisfiesSemverSync, 'function');
  });
});
