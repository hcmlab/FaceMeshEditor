<script setup lang="ts">
import {
  FACE_FEATURE_LEFT_EYE,
  FACE_FEATURE_LEFT_EYEBROW,
  FACE_FEATURE_LIPS,
  FACE_FEATURE_NOSE,
  FACE_FEATURE_RIGHT_EYE,
  FACE_FEATURE_RIGHT_EYEBROW
} from '@/graph/face_landmarks_features';
import { useAnnotationHistoryStore } from '@/stores/annotationHistoryStore';

const annotationHistoryStore = useAnnotationHistoryStore();

function deleteFeature(feature: string) {
  const graph = annotationHistoryStore.selectedHistory?.get();
  if (!graph) return;
  switch (feature) {
    case 'left_eye':
      graph.deletePoints(FACE_FEATURE_LEFT_EYE);
      break;
    case 'left_eyebrow':
      graph.deletePoints(FACE_FEATURE_LEFT_EYEBROW);
      break;
    case 'right_eye':
      graph.deletePoints(FACE_FEATURE_RIGHT_EYE);
      break;
    case 'right_eyebrow':
      graph.deletePoints(FACE_FEATURE_RIGHT_EYEBROW);
      break;
    case 'nose':
      graph.deletePoints(FACE_FEATURE_NOSE);
      break;
    case 'mouth':
      graph.deletePoints(FACE_FEATURE_LIPS);
      break;
    default:
      console.error('No feature "' + feature + '" found to delete!');
      break;
  }
  annotationHistoryStore.selectedHistory?.add(graph);
}
</script>

<template>
  <h5 class="mt-4">Features</h5>
  <a
    id="feat_le"
    class="nav-link btn btn-light"
    href="#"
    style="padding: 0.2vw"
    @click="deleteFeature('left_eye')"
    ><i class="bi bi-trash"></i>Left Eye</a
  >
  <a
    id="feat_leb"
    class="nav-link btn btn-light"
    href="#"
    style="padding: 0.2vw"
    @click="deleteFeature('left_eyebrow')"
    ><i class="bi bi-trash"></i>Left Eyebrow</a
  >
  <a
    id="feat_re"
    class="nav-link btn btn-light"
    href="#"
    style="padding: 0.2vw"
    @click="deleteFeature('right_eye')"
    ><i class="bi bi-trash"></i>Right Eye</a
  >
  <a
    id="feat_reb"
    class="nav-link btn btn-light"
    href="#"
    style="padding: 0.2vw"
    @click="deleteFeature('right_eyebrow')"
    ><i class="bi bi-trash"></i>Right Eyebrow</a
  >
  <a
    id="feat_n"
    class="nav-link btn btn-light"
    href="#"
    style="padding: 0.2vw"
    @click="deleteFeature('nose')"
    ><i class="bi bi-trash"></i>Nose</a
  >
  <a
    id="feat_m"
    class="nav-link btn btn-light"
    href="#"
    style="padding: 0.2vw"
    @click="deleteFeature('mouth')"
    ><i class="bi bi-trash"></i>Mouth</a
  >
</template>

<style scoped></style>
