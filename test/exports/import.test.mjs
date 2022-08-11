import assert from 'assert';
import { satisfiesSemverSync } from 'node-exec-path';

describe('exports .mjs', function () {
  it('defaults', function () {
    assert.equal(typeof satisfiesSemverSync, 'function');
  });
});
