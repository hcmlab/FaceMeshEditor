import { test, expect, beforeEach } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { useEditorConfigStore } from '../editorConfig';

beforeEach(() => {
  setActivePinia(createPinia());
});

test('Store starts with default state', () => {
  const store = useEditorConfigStore();
  expect(store.$state.dragDepth).toEqual(0);
  expect(store.$state.showTesselation).toEqual(false);
});

test('Store sets dragDepth correctly', () => {
  const store = useEditorConfigStore();
  store.$state.dragDepth = 2;
  expect(store.$state.dragDepth).toEqual(2);
});

test('Store sets showTesselation correctly', () => {
  const store = useEditorConfigStore();
  store.$state.showTesselation = true;
  expect(store.$state.showTesselation).toEqual(true);
});

test('Check the elements in the state', () => {
  const store = useEditorConfigStore();

  const expectedKeys = ['dragDepth', 'showTesselation'];
  const actualKeys = Object.keys(store.$state);

  expect(actualKeys.length).toBe(expectedKeys.length);
  expectedKeys.forEach((key) => expect(actualKeys).toContain(key));
});
