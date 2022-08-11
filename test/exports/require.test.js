const assert = require('assert');
const { satisfiesSemverSync } = require('node-exec-path');

describe('exports .cjs', function () {
  it('defaults', function () {
    assert.equal(typeof satisfiesSemverSync, 'function');
  });
});
