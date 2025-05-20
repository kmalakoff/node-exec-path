import assert from 'assert';

// @ts-ignore
import { satisfiesSemverSync } from 'node-exec-path';

describe('exports .ts', () => {
  it('defaults', () => {
    assert.equal(typeof satisfiesSemverSync, 'function');
  });
});
