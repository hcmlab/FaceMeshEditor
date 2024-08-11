<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import $ from 'jquery';
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

// Todo: update if undo/redo/...

$(window).on('resize', () => {
  editor?.draw();
});
</script>

<template>
  <div class="w-70 h-100 flex-grow-1" id="canvas-div">
    <canvas id="canvas" ref="canvas" class="w-100 h-100"></canvas>
  </div>
</template>

<style scoped></style>
