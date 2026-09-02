import assert from 'assert';

// @ts-ignore
import { satisfiesSemverSync } from 'node-exec-path';

describe('satisfiesSemverSync', () => {
  describe('happy path', () => {
    it('>=12', () => {
      const execPath = satisfiesSemverSync('>=12');
      assert.ok(execPath);
    });

    it('>=12.0', () => {
      const execPath = satisfiesSemverSync('>=12.0');
      assert.ok(execPath);
    });

    it('>=12.0.0', () => {
      const execPath = satisfiesSemverSync('>=12.0.0');
      assert.ok(execPath);
    });
  });

  describe('unhappy path', () => {
    it('<0.8', () => {
      const execPath = satisfiesSemverSync('<0.8');
      assert.ok(!execPath);
    });
  });
});
