<script setup lang="ts">
import { onMounted } from 'vue';
import { CheckBox } from '@/view/checkbox';
import { useEditorConfigStore } from '@/stores/editorConfig';

const editorConfigStore = useEditorConfigStore();

let viewTesselation: CheckBox;

onMounted(() => {
  viewTesselation = new CheckBox(
    'view_tesselation',
    () => (editorConfigStore.showTesselation = viewTesselation.isChecked())
  );
});
</script>

<template>
  <h5 class="mt-4">View</h5>
  <div class="form-check form-switch">
    <input
      class="form-check-input"
      type="checkbox"
      role="switch"
      id="view_tesselation"
      aria-checked="false"
    />
    <label class="form-check-label" for="view_tesselation" style="text-align: start"
      >Tesselation</label
    >
  </div>
</template>

<style scoped></style>
