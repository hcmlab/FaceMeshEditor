import { defineStore } from 'pinia';
import { FileAnnotationHistory } from '@/cache/fileAnnotationHistory';
import { Point2D } from '@/graph/point2d';
import { ImageFile } from '@/imageFile';
import { Graph } from '@/graph/graph';
import type { AnnotationData, ModelApi } from '@/model/modelApi';
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
      if (!imageFile) {
        // Todo - error message
        throw new Error('Failed to parse image data.');
      }
      const history = await Graph.detect(api, imageFile);
      if (!history) {
        // Todo - error message
        throw new Error('Failed to detect history from the Graph API.');
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
        (history) => history.file.filePointer.name === fileName && history.file.sha === sha256
      ) as FileAnnotationHistory<Point2D>;
    },
    /**
     * Returns any files with pending changes
     */
    getUnsaved(): FileAnnotationHistory<Point2D>[] {
      return this.histories.filter(
        (file) => file.status === SaveStatus.saved
      ) as FileAnnotationHistory<Point2D>[];
    },
    /**
     * Collects and processes annotation data from the annotation history store.
     * It gathers saved annotation histories, marks them as sent, and transforms
     * the data into a structured object format, with points and file SHA256 hash.
     * The resulting object uses filenames as keys.
     *
     * @return An object where each key is a filename associated with its
     * corresponding annotation data, consisting of points and the SHA256 hash.
     */
    collectAnnotations(): AnnotationData {
      const result: AnnotationData = {};
      this.histories.forEach((h) => {
        if (h.status === SaveStatus.unedited) {
          return;
        }
        const graph = h.graphData;

        if (graph) {
          result[h.file.filePointer.name] = graph;
        }
        h.markAsSent();
      });
      return result;
    }
  }
});
