import { defineStore } from 'pinia';

export const useImageLoadStore = defineStore({
  id: 'imageLoad',
  state: (): {
    showLoadModal: boolean;
  } => ({
    showLoadModal: true
  }),
  actions: {}
});
