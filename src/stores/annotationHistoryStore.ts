import { defineStore } from 'pinia';
import { FileAnnotationHistory } from '@/cache/fileAnnotationHistory';
import { Point2D } from '@/graph/point2d';
import { SaveStatus } from '@/enums/saveStatus';
import type { MultipleViewImage } from '@/components/ImageLoadModal.vue';
import { Graph } from '@/graph/graph';

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
    async add(image: MultipleViewImage) {
      if (!image.center?.image.file) {
        return;
      }
      if (!image.center.mesh) {
        return;
      }
      const history = new FileAnnotationHistory<Point2D>(image, 25);
      history.add(Graph.fromMesh(image.center.mesh));
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
        (history) =>
          (history.file.left?.image.file.name === fileName &&
            history.file.left.image.sha === sha256) ||
          (history.file.right?.image.file.name === fileName &&
            history.file.right.image.sha === sha256) ||
          (history.file.center?.image.file.name === fileName &&
            history.file.center.image.sha === sha256)
      ) as FileAnnotationHistory<Point2D>;
    },

    async merge(data: MultipleViewImage[]) {
      data.forEach((value) => {
        this.add(value);
      });
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
