import assert from 'node:assert/strict';
import test from 'node:test';
import * as api from '../dist/esm/index.js';
test('CDF counts values at or below query', () => {
  assert.equal(api.empiricalCdf([1, 2, 2, 4], 2), 0.75);
});
test('CDF includes all observations at maximum', () => {
  assert.equal(api.empiricalCdf([1, 2, 3], 3), 1);
});
test('CDF is zero below minimum', () => {
  assert.equal(api.empiricalCdf([1, 2], 0), 0);
});
test('quantile interpolates between ranks', () => {
  assert.equal(api.sampleQuantile([0, 10], 0.25), 2.5);
});
test('quantile handles endpoints', () => {
  assert.equal(api.sampleQuantile([2, 5, 9], 0), 2);
  assert.equal(api.sampleQuantile([2, 5, 9], 1), 9);
});
test('rejects invalid quantile', () => {
  assert.throws(() => api.sampleQuantile([1, 2], 1.1), RangeError);
});
