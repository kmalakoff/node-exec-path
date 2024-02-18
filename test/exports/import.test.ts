const assert = require('assert');
const { satisfiesSemverSync } = require('node-exec-path');

describe('exports .ts', () => {
  it('defaults', () => {
    assert.equal(typeof satisfiesSemverSync, 'function');
  });
});
