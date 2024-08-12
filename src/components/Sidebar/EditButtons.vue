<script setup lang="ts">
import $ from 'jquery';
import { onMounted, onUnmounted } from 'vue';
import { useAnnotationHistoryStore } from '@/stores/annotationHistoryStore';
import { useModelStore } from '@/stores/modelStore';
import { Slider } from '@/view/slider';
import { useEditorConfigStore } from '@/stores/editorConfig';
import ButtonWithIcon from '@/components/MenuItems/ButtonWithIcon.vue';

const annotationHistoryStore = useAnnotationHistoryStore();
const modelStore = useModelStore();
const editorConfigStore = useEditorConfigStore();

let featureDrag: Slider;

function handleWheelEvent(e: WheelEvent) {
  if (e.shiftKey) {
    addFeatureDrag(e.deltaY / 100);
  }
}

onMounted(() => {
  featureDrag = new Slider('feature_drag', () => {
    // TODO FIX Not working!
    const element = $('#num');
    element.text(featureDrag.getValue().toString());
    editorConfigStore.dragDepth = featureDrag.getValue();
  });
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
  featureDrag.setValue(featureDrag.getValue() + value);
}

function runDetection() {
  const history = annotationHistoryStore.selectedHistory;
  if (!history) return;
  modelStore.model?.detect(history.file.file).then((graph) => {
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
  <div class="form" style="padding-top: 0.2vw; padding-bottom: 0.2vw">
    <label for="feature_drag" class="form-label" aria-keyshortcuts="Shift+Wheel"
      ><i class="bi bi-bounding-box-circles pe-1"></i>Drag Depth:
      <output id="num">0</output>
    </label>
    <input
      type="range"
      class="form-range"
      min="0"
      max="5"
      value="0"
      step="1"
      id="feature_drag"
      style="padding-left: 0.2vw; padding-right: 0.2vw"
    />
  </div>
</template>

<style scoped></style>
