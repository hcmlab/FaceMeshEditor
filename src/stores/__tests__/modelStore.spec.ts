import { test, expect, beforeEach } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { MediapipeModel } from '../../model/mediapipe';
import { useModelStore } from '@/stores/modelStore';

beforeEach(() => {
  setActivePinia(createPinia());
});

test('Store starts with default state', () => {
  const store = useModelStore();
  expect(store.model).toBeInstanceOf(MediapipeModel);
});

test('Check if model is present in the state', () => {
  const store = useModelStore();
  expect('model' in store.$state).toBe(true);
});

test('Check no additional keys in state', () => {
  const store = useModelStore();
  const expectedKeys = ['model'];
  const actualKeys = Object.keys(store.$state);

  expect(actualKeys.length).toBe(expectedKeys.length);
  expectedKeys.forEach((key) => expect(actualKeys).toContain(key));
});
