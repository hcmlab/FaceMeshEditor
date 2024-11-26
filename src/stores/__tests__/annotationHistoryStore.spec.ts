import { test, expect, beforeEach } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { useAnnotationHistoryStore } from '../annotationHistoryStore';
import type { MultipleViewImage } from '../../components/ImageLoadModal.vue';

beforeEach(() => {
  setActivePinia(createPinia());
});

const mockFile: MultipleViewImage = {
  center: {
    image: {
      file: new File([''], 'mock.png', {
        type: 'image/png'
      })
    },
    mesh: []
  },
  left: null,
  right: null
};

test('Test store is initially empty', async () => {
  const store = useAnnotationHistoryStore();
  expect(store.empty()).toEqual(true);
  await store.add(mockFile);
  expect(store.empty()).toEqual(false);
});

test('Test adding', async () => {
  const store = useAnnotationHistoryStore();
  await store.add(mockFile);

  expect(store.histories.length).toEqual(1);
  expect(store.selectedHistory).not.toBeNull();
});

test('Test find function', async () => {
  const store = useAnnotationHistoryStore();
  await store.add(mockFile);

  const found = store.find('mock.png', store.histories[0].file.center.image.sha);
  expect(found).toEqual(store.selectedHistory);
});

test('Check the elements in the state', () => {
  const store = useAnnotationHistoryStore();

  const expectedKeys = ['histories', 'selectedHistory'];
  const actualKeys = Object.keys(store.$state);

  expect(actualKeys.length).toBe(expectedKeys.length);
  expectedKeys.forEach((key) => expect(actualKeys).toContain(key));
});
