import { defineStore } from 'pinia';
import { FileAnnotationHistory } from '@/cache/fileAnnotationHistory';
import { Point2D } from '@/graph/point2d';
import { ImageFile } from '@/imageFile';
import { Graph } from '@/graph/graph';
import type { ModelApi } from '@/model/modelApi';
import { SaveStatus } from '@/enums/saveStatus';

export const useAnnotationHistoryStore = defineStore({
  id: 'annotationHistory',

  state: (): {
    histories: FileAnnotationHistory<Point2D>[];
    selectedHistory: FileAnnotationHistory<Point2D> | null;
  } => ({
    histories: [],
    selectedHistory: null
  }),

  actions: {
    async add(file: File, api: ModelApi<Point2D>) {
      const imageFile = await ImageFile.create(file);
      const history = new FileAnnotationHistory<Point2D>(imageFile, 25);
      const anno = await Graph.detect(api, imageFile);
      if (anno) {
        history.add(anno);
      }
      this.histories.push(history);
      if (!this.selectedHistory) {
        this.selectedHistory = history;
      }
    },
    empty(): boolean {
      return this.histories?.length <= 0;
    },
    find(fileName: string, sha256: string): FileAnnotationHistory<Point2D> {
      return this.histories.find(
        (history) => history.file.file.name === fileName && history.file.sha === sha256
      ) as FileAnnotationHistory<Point2D>;
    },

    /**
     * Returns any files with pending changes
     */
    getUnsaved(): FileAnnotationHistory<Point2D>[] {
      return this.histories.filter(
        (file) => file.status === SaveStatus.saved
      ) as FileAnnotationHistory<Point2D>[];
    }
  }
});
