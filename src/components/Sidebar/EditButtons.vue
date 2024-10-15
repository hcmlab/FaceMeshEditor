<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue';
import { useAnnotationHistoryStore } from '@/stores/annotationHistoryStore';
import { useModelStore } from '@/stores/modelStore';
import { useEditorConfigStore } from '@/stores/editorConfig';
import ButtonWithIcon from '@/components/MenuItems/ButtonWithIcon.vue';

const annotationHistoryStore = useAnnotationHistoryStore();
const modelStore = useModelStore();
const editorConfigStore = useEditorConfigStore();

const dragDepth = computed(() => editorConfigStore.dragDepth);

function handleWheelEvent(e: WheelEvent) {
  if (e.shiftKey) {
    addFeatureDrag(e.deltaY / 100);
  }
}

onMounted(() => {
  window.addEventListener('wheel', handleWheelEvent);
});

onUnmounted(() => {
  window.removeEventListener('wheel', handleWheelEvent);
});

function undo(): boolean {
  annotationHistoryStore.selectedHistory?.previous();
  return false;
}

function redo(): boolean {
  annotationHistoryStore.selectedHistory?.next();
  return false;
}

function reset(): boolean {
  annotationHistoryStore.selectedHistory?.clear();
  runDetection();
  return false;
}

function addFeatureDrag(value: number): void {
  editorConfigStore.dragDepth += value;
}

function runDetection() {
  const history = annotationHistoryStore.selectedHistory;
  if (!history) return;
  modelStore.model?.detect(history.file).then((graph) => {
    if (graph === null) {
      return;
    }
    history.add(graph);
  });
}
</script>

<template>
  <h5 class="mt-4">Edit</h5>
  <button-with-icon
    text="Undo"
    icon="bi-arrow-counterclockwise"
    shortcut="Control+Z"
    @click="undo"
  />
  <button-with-icon text="Redo" icon="bi-arrow-clockwise" shortcut="Control+Y" @click="redo" />
  <hr />
  <button-with-icon text="Reset" icon="bi-x-square" shortcut="Control+R" @click="reset" />
  <hr />
  <div class="d-flex">
    <i class="bi bi-bounding-box-circles pe-1" />
    Drag Depth:
    {{ editorConfigStore.dragDepth }}
    <div class="ms-auto"><kbd>SHIFT</kbd>+<kbd>SCROLL</kbd></div>
  </div>
  <BFormInput
    id="FaceMesh-DragDepth"
    type="range"
    min="0"
    max="5"
    value="1"
    step="1"
    style="padding-left: 0.2vw; padding-right: 0.2vw"
    v-model.number="editorConfigStore.dragDepth"
    @update:model-value="
      (value) => {
        console.log(value);
        console.log(dragDepth);
        console.log(editorConfigStore.dragDepth);
      }
    "
  />
</template>

<style scoped></style>
