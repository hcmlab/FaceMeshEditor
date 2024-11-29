<script setup lang="ts">
import { ref } from 'vue';
import { ImageFile } from '@/imageFile';
import { useAnnotationHistoryStore } from '@/stores/annotationHistoryStore';
import ThumbnailContainer from '@/components/ThumbnailContainer.vue';
import { SaveStatus } from '@/enums/saveStatus';
import { FileAnnotationHistory } from '@/cache/fileAnnotationHistory';
import { Point2D } from '@/graph/point2d';
import { useModelStore } from '@/stores/modelStore';

const annotationHistoryStore = useAnnotationHistoryStore();
const modelStore = useModelStore();
const histories = ref(useAnnotationHistoryStore().histories);

function selectThumbnail(file: ImageFile): void {
  const oldHistory = annotationHistoryStore.selectedHistory;

  /* clicking to save */
  if (
    oldHistory &&
    file.file.name === oldHistory.file.file.name &&
    oldHistory.status !== SaveStatus.unedited
  ) {
    oldHistory.status = SaveStatus.saved;
    modelStore.model.uploadAnnotations({[file.file.name]: oldHistory.graphData}).catch(reason => {
      console.error("Posting history failed: ", reason);
    });
    return;
  }

  /* other image selected */
  annotationHistoryStore.selectedHistory = annotationHistoryStore.find(file.file.name, file.sha);
}
</script>

<template>
  <div class="w-10 h-100 rounded-start-1 shadow bg-light text-center" id="thumbnail-gallery">
    <div class="h-5 d-flex align-items-center justify-content-center">
      <h6>
        Images
        <small
          >(
          <output id="num-images"> {{ histories.length }}</output>
          )</small
        >
      </h6>
    </div>
    <div id="thumbnailGalleryContainer" class="overflow-auto mh-95 w-100">
      <div v-for="(history, idx) in histories" :key="idx" class="pb-1">
        <ThumbnailContainer
          @click="selectThumbnail"
          :history="history as FileAnnotationHistory<Point2D>"
          :id="'thumbnail-' + idx"
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
