<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useFaceMeshConfig } from '@/stores/ToolSpecific/faceMeshConfig';
import FeatureDragBar from '@/components/Sidebar/ToolMenu/FaceMesh/FeatureDragBar.vue';

const editorConfigStore = useFaceMeshConfig();
const isTesselationChecked = ref(editorConfigStore.showTesselation);

const handleTesselationChange = () => {
  editorConfigStore.showTesselation = isTesselationChecked.value;
};

onMounted(() => {
  isTesselationChecked.value = editorConfigStore.showTesselation;
  watch(
    () => editorConfigStore.showTesselation,
    (newVal) => {
      isTesselationChecked.value = newVal;
    }
  );
});
</script>

<template>
  <h5>View</h5>
  <div class="form-check form-switch">
    <input
      class="form-check-input"
      type="checkbox"
      role="switch"
      id="view_tesselation"
      aria-checked="mixed"
      v-model="isTesselationChecked"
      @change="handleTesselationChange"
    />
    <label class="form-check-label" for="view_tesselation" style="text-align: start"
      >Tesselation</label
    >
  </div>
  <FeatureDragBar />
  <div class="mb-2" />
</template>

<style scoped></style>
