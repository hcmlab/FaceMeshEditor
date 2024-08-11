<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { useAnnotationHistoryStore } from '@/stores/annotationHistoryStore';
import { Editor2D } from '@/editor2d';
import { SaveStatus } from '@/enums/saveStatus';

const annotationHistoryStore = useAnnotationHistoryStore();

const canvas = ref<HTMLCanvasElement>();

let editor: Editor2D | null = null;

onMounted(() => {
  if (!canvas.value) return;
  editor = new Editor2D(canvas.value);

  editor.setOnBackgroundLoadedCallback((_) => {
    if (!editor) return;
    editor.graph = annotationHistoryStore.selectedHistory?.get();
  });

  editor.setOnPointsEditedCallback((graph) => {
    if (!annotationHistoryStore.selectedHistory) {
      return;
    }
    const history = annotationHistoryStore.selectedHistory;
    history.add(graph);
    history.status = SaveStatus.edited;
  });
});

watch(
  () => annotationHistoryStore.selectedHistory,
  (value) => {
    if (!editor) return;
    if (!value) return;
    editor.setBackgroundSource(value.file);
  }
);

const onResize = () => {
  editor?.draw();
};

onMounted(() => {
  window.addEventListener('resize', onResize);
});

onUnmounted(() => {
  // Cleanup - remove the event listener when component is unmounted
  window.removeEventListener('resize', onResize);
});
</script>

<template>
  <div class="w-70 h-100 flex-grow-1" id="canvas-div">
    <canvas id="canvas" ref="canvas" class="w-100 h-100"></canvas>
  </div>
</template>

<style scoped></style>
