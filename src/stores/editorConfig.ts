import { defineStore } from 'pinia';

export const useEditorConfigStore = defineStore({
  id: 'editorConfig',

  state: (): {
    dragDepth: number;
    showTesselation: boolean;
  } => ({
    dragDepth: 0,
    showTesselation: false
  }),
  actions: {}
});
