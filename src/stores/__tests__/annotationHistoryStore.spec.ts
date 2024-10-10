import { test, expect, beforeEach } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { Graph } from '../../graph/graph';
import { ModelType } from '../../enums/modelType';
import { Point2D } from '../../graph/point2d';
import { type ModelApi } from '../../model/modelApi';
import { useAnnotationHistoryStore } from '../annotationHistoryStore';

beforeEach(() => {
  setActivePinia(createPinia());
});

class MockApi implements ModelApi<Point2D> {
  async detect(_: File): Promise<Graph<Point2D> | null> {
    return null;
  }

  type(): ModelType {
    return ModelType.custom;
  }

  async uploadAnnotations(_: string): Promise<void | Response> {
    return;
  }
}

const mockFile = new File([''], 'mock.png', {
  type: 'image/png'
});

const mockApi = new MockApi();

test('Test store is initially empty', async () => {
  const store = useAnnotationHistoryStore();
  expect(store.empty()).toEqual(true);
  await store.add(mockFile, mockApi);
  expect(store.empty()).toEqual(false);
});

test('Test adding', async () => {
  const store = useAnnotationHistoryStore();
  await store.add(mockFile, mockApi);

  expect(store.histories.length).toEqual(1);
  expect(store.selectedHistory).not.toBeNull();
});

test('Test find function', async () => {
  const store = useAnnotationHistoryStore();
  const mockFile = new File([''], 'mock.png', {
    type: 'image/png'
  });
  await store.add(mockFile, mockApi);

  const found = store.find('mock.png', store.histories[0].file.sha);
  expect(found).toEqual(store.selectedHistory);
});

test('Check the elements in the state', () => {
  const store = useAnnotationHistoryStore();

  const expectedKeys = ['histories', 'selectedHistory'];
  const actualKeys = Object.keys(store.$state);

  expect(actualKeys.length).toBe(expectedKeys.length);
  expectedKeys.forEach((key) => expect(actualKeys).toContain(key));
});
