import { defineStore } from 'pinia';
import type { ModelApi } from '@/model/modelApi';
import type { Point2D } from '@/graph/point2d';
import { MediapipeModel } from '@/model/mediapipe';

export const useModelStore = defineStore({
  id: 'model',
  state: (): {
    model: ModelApi<Point2D>;
  } => ({
    model: new MediapipeModel()
  }),
  actions: {}
});
