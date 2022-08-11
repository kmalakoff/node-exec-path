const assert = require('assert');

const { satisfiesSemverSync } = require('node-exec-path');

describe('satisfiesSemverSync', function () {
  this.timeout(60000);

  describe('happy path', function () {
    it('>=12', function () {
      const execPath = satisfiesSemverSync('>=12');
      assert.ok(execPath);
    });

    it('>=12.0', function () {
      const execPath = satisfiesSemverSync('>=12.0');
      assert.ok(execPath);
    });

    it('>=12.0.0', function () {
      const execPath = satisfiesSemverSync('>=12.0.0');
      assert.ok(execPath);
    });
  });

  describe('unhappy path', function () {
    it('<0.8', function () {
      const execPath = satisfiesSemverSync('<0.8');
      assert.ok(!execPath);
    });
  });
});
