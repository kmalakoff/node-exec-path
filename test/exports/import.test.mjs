import assert from 'assert';
import { satisfiesSemverSync } from 'node-exec-path';

describe('exports .mjs', () => {
  it('defaults', () => {
    assert.equal(typeof satisfiesSemverSync, 'function');
  });
});
