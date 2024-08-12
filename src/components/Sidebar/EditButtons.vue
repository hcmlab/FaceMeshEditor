<script setup lang="ts">
import $ from 'jquery';
import { onMounted, onUnmounted } from 'vue';
import { useAnnotationHistoryStore } from '@/stores/annotationHistoryStore';
import { useModelStore } from '@/stores/modelStore';
import { Slider } from '@/view/slider';
import { CheckBox } from '@/view/checkbox';
import { useEditorConfigStore } from '@/stores/editorConfig';

const annotationHistoryStore = useAnnotationHistoryStore();
const modelStore = useModelStore();
const editorConfigStore = useEditorConfigStore();

let viewTesselation: CheckBox;
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

  viewTesselation = new CheckBox(
    'view_tesselation',
    () => (editorConfigStore.showTesselation = viewTesselation.isChecked())
  );
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
  <a id="undo" class="nav-link btn btn-light" href="#" aria-keyshortcuts="Control+Z" @click="undo"
    ><i class="bi bi-arrow-counterclockwise"></i>Undo</a
  >
  <a id="redo" class="nav-link btn btn-light" href="#" aria-keyshortcuts="Control+Y" @click="redo"
    ><i class="bi bi-arrow-clockwise"></i>Redo</a
  >
  <hr />
  <a id="reset" class="nav-link btn btn-light" href="#" aria-keyshortcuts="Control+R" @click="reset"
    ><i class="bi bi-x-square"></i>Reset</a
  >
  <hr />
  <div class="form" style="padding-top: 0.2vw; padding-bottom: 0.2vw">
    <label for="feature_drag" class="form-label" aria-keyshortcuts="Shift+Wheel"
      ><i class="bi bi-bounding-box-circles"></i>Drag Depth:
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
