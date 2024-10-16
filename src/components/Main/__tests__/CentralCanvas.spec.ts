import { mount } from '@vue/test-utils';
import { describe, it, vi, expect, beforeEach } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';

vi.mock('@/Editors/FaceMeshEditor');
vi.mock('@/Editors/BackgroundDrawer');
vi.mock('@/Editors/Editor');

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
});
