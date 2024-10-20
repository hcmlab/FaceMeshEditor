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
  console.log(file);
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
  <div
    class="w-10 h-100 rounded-start-1 shadow bg-light text-center overflow-y-scroll"
    id="thumbnail-gallery"
  >
    <h6 class="my-2">
      Images
      <small
        >(
        <output id="num_images">0</output>
        )</small
      >
    </h6>
    <div id="thumbnailGallery" class="p-1 d-flex flex-column align-items-center">
      <div v-for="(history, idx) in histories" :key="idx" class="w-100 p-1">
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
