import { mount } from '@vue/test-utils';
import { describe, it, vi, expect, beforeEach } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';

vi.mock('@/editor2d');

import { Editor2D } from '@/editor2d';
import { useAnnotationHistoryStore } from '@/stores/annotationHistoryStore';
import CentralCanvas from '@/components/Main/CentralCanvas.vue';

describe('AnnotationCanvas.vue', () => {
  let wrapper;

  beforeEach(() => {
    setActivePinia(createPinia());
    wrapper = mount(CentralCanvas);
  });

  it('should mount the component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should initialize Editor2D with the canvas element', () => {
    expect(Editor2D).toHaveBeenCalledWith(wrapper.find('canvas').element);
  });

  it('should set onBackgroundLoaded and onPointsEdited callbacks', () => {
    const editorInstance = Editor2D.mock.instances[Editor2D.mock.instances.length - 1];

    expect(editorInstance.setOnBackgroundLoadedCallback).toHaveBeenCalled();
    expect(editorInstance.setOnPointsEditedCallback).toHaveBeenCalled();
  });

  it('should update the background source when selectedHistory changes', async () => {
    const editorInstance = Editor2D.mock.instances[Editor2D.mock.instances.length - 1];
    const annotationHistoryStore = useAnnotationHistoryStore();

    const mockFile = { file: 'test-image.png' };
    annotationHistoryStore.selectedHistory = mockFile;

    await wrapper.vm.$nextTick();

    expect(editorInstance.setBackgroundSource).toHaveBeenCalledWith(mockFile.file);
  });

  it('should call draw method on window resize', () => {
    const editorInstance = Editor2D.mock.instances[Editor2D.mock.instances.length - 1];
    console.log(Editor2D.mock.instances.length);

    expect(editorInstance).toBeDefined(); // Ensure the instance is not undefined
    expect(editorInstance.draw).toBeDefined(); // Ensure draw method is mocked

    // Trigger window resize event
    window.dispatchEvent(new Event('resize'));

    expect(editorInstance.draw).toHaveBeenCalled();
  });
});
