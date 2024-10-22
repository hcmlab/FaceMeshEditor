<script setup lang="ts">
import { ref } from 'vue';
import { ImageFile } from '@/imageFile';
import { useAnnotationHistoryStore } from '@/stores/annotationHistoryStore';
import ThumbnailContainer from '@/components/ThumbnailContainer.vue';
import { SaveStatus } from '@/enums/saveStatus';
import { FileAnnotationHistory } from '@/cache/fileAnnotationHistory';
import { Point2D } from '@/graph/point2d';

const annotationHistoryStore = useAnnotationHistoryStore();
const histories = ref(useAnnotationHistoryStore().histories);

function selectThumbnail(file: ImageFile): void {
  /* clicking to save */
  const oldHistory = annotationHistoryStore.selectedHistory;
  if (
    oldHistory &&
    file.file.name === oldHistory.file.file.name &&
    oldHistory.status !== SaveStatus.unedited
  ) {
    oldHistory.status = SaveStatus.saved;
    return;
  }
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
