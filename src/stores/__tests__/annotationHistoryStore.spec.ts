import { test, expect, beforeEach } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { ModelType } from '../../enums/modelType';
import { Point2D } from '../../graph/point2d';
import { AnnotationData, type ModelApi } from '../../model/modelApi';
import { useAnnotationHistoryStore } from '../annotationHistoryStore';
import type { ImageFile } from '../../imageFile';
import { FileAnnotationHistory } from '../../cache/fileAnnotationHistory';

beforeEach(() => {
  setActivePinia(createPinia());
});

class MockApi implements ModelApi<Point2D> {
  async detect(imageFile: ImageFile): Promise<FileAnnotationHistory<Point2D> | null> {
    return new FileAnnotationHistory<Point2D>(imageFile);
  }

  type(): ModelType {
    return ModelType.custom;
  }

  async uploadAnnotations(_: AnnotationData): Promise<void | Response> {
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
  await store.add(mockFile, mockApi);

  const found = store.find(mockFile.name, store.histories[0].file.sha);
  expect(found).toEqual(store.selectedHistory);
});

test('Check the elements in the state', () => {
  const store = useAnnotationHistoryStore();

  const expectedKeys = ['histories', 'selectedHistory'];
  const actualKeys = Object.keys(store.$state);

  expect(actualKeys.length).toBe(expectedKeys.length);
  expectedKeys.forEach((key) => expect(actualKeys).toContain(key));
});
