import * as fs from 'node:fs';
import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeAll } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import ThumbnailGallery from '../ThumbnailGallery.vue';
import { FileAnnotationHistory } from '../../../cache/fileAnnotationHistory';
import { Point2D } from '../../../graph/point2d';
import { useAnnotationHistoryStore } from '../../../stores/annotationHistoryStore';
import { ImageFile } from '../../../imageFile';

// Define a function to convert ArrayBuffer to Blob
function arrayBufferToBlob(buffer: ArrayBuffer, type: string) {
  return new Blob([buffer], { type });
}

// Define a function to convert Blob to File
function blobToFile(blob: Blob, name: string) {
  return new File([blob], name);
}

const fileBuffer = fs.readFileSync('src/model/__tests__/testImage.png');

// Create an ArrayBuffer from the file data
const arrayBuffer = Uint8Array.from(fileBuffer).buffer;

// Create a Blob from the ArrayBuffer
const blob = arrayBufferToBlob(arrayBuffer, 'text/plain');

// Mock data
const mockData = {
  file: null
};

let store = null;

beforeAll(async () => {
  mockData.file = await ImageFile.create(blobToFile(blob, 'test.png'));
  setActivePinia(createPinia());
  store = useAnnotationHistoryStore();
  store.histories.push(new FileAnnotationHistory<Point2D>(mockData.file, 25));
});

describe('ThumbnailGallery', () => {
  it('should set selectedHistory to the current history upon selectThumbnail function execution', async () => {
    expect(store.selectedHistory).toBeNull;

    const wrapper = mount(ThumbnailGallery);

    const thumbnailContainer = wrapper.find('#thumbnail-0');
    expect(thumbnailContainer.exists()).toBe(true);

    await thumbnailContainer.trigger('click', mockData.file);
    expect(store.selectedHistory.file).toEqual(mockData.file);
  });
});
