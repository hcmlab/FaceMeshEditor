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
import ButtonWithIcon from '@/components/MenuItems/ButtonWithIcon.vue';

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

const features = ['Left Eye', 'Left Eyebrow', 'Right Eye', 'Right Eyebrow', 'Nose', 'Mouth'];
</script>

<template>
  <div class="d-flex flex-column w-100 align-items-center">
    <div>
      <b>
        <i class="bi bi-gear me-1"></i>
        Features
      </b>
    </div>
  </div>
  <div v-for="feature in features" :key="feature">
    <button-with-icon
      :text="feature"
      icon="bi-trash"
      shortcut=""
      @click="deleteFeature(feature.toLowerCase().replace(/\s/g, '_'))"
    />
  </div>
</template>

<style scoped></style>
