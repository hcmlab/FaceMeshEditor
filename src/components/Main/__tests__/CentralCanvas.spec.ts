import { mount } from '@vue/test-utils';
import { describe, it, vi, expect, beforeEach } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';

vi.mock('@/Editors/FaceMeshEditor');
vi.mock('@/Editors/BackgroundDrawer');
vi.mock('@/Editors/Editor');

import { FaceMeshEditor } from '../../../Editors/FaceMeshEditor';
import { Editor } from '../../../Editors/Editor';
import { useAnnotationHistoryStore } from '../../../stores/annotationHistoryStore';
import CentralCanvas from '../CentralCanvas.vue';

describe('AnnotationCanvas.vue', () => {
  let wrapper;

  beforeEach(() => {
    setActivePinia(createPinia());
    wrapper = mount(CentralCanvas);
  });

  it('should mount the component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should update the background source when selectedHistory changes', async () => {
    const annotationHistoryStore = useAnnotationHistoryStore();

    const mockFile = { file: 'test-image.png' };
    annotationHistoryStore.selectedHistory = mockFile;

    await wrapper.vm.$nextTick();

    expect(Editor.setBackgroundSource).toHaveBeenCalledWith(mockFile.file);
  });

  it('should call draw method on window resize', () => {
    const editorInstance = FaceMeshEditor.mock.instances[FaceMeshEditor.mock.instances.length - 1];

    expect(editorInstance).toBeDefined(); // Ensure the instance is not undefined
    expect(editorInstance.draw).toBeDefined(); // Ensure draw method is mocked

    // Trigger window resize event
    window.dispatchEvent(new Event('resize'));

    expect(editorInstance.draw).toHaveBeenCalled();
  });
});
