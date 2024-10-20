import { defineStore } from 'pinia';

export const useFaceMeshConfig = defineStore({
  id: 'faceMeshConfig',

  state: (): {
    dragDepth: number;
    showTesselation: boolean;
  } => ({
    dragDepth: 0,
    showTesselation: false
  }),
  actions: {}
});
