import test from 'node:test';
import assert from 'node:assert/strict';
import { emptyStats, initialState } from '../src/insights/engine.mjs';
import { stateSchema } from '../src/insights/projection.ts';

test('restored model rows keep their effort tag', () => {
  const base = initialState({ id: 's' });
  const row = { ...emptyStats(), provider: 'p', model: 'm', effort: 'high' };
  const parsed = stateSchema.parse({ ...base, models: [row] });
  assert.equal(parsed.models[0].effort, 'high');
  assert.equal(parsed.models[0].model, 'm');
});

test('restored rows without effort stay effort-free', () => {
  const base = initialState({ id: 's' });
  const parsed = stateSchema.parse({ ...base, models: [{ ...emptyStats(), provider: 'p', model: 'm' }] });
  assert.equal('effort' in parsed.models[0], false);
});
