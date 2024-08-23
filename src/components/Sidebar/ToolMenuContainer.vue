<script setup lang="ts">
import { computed, defineAsyncComponent, ref } from 'vue';
import { useAnnotationToolStore } from '@/stores/annotationToolStore';
import { AnnotationTool } from '@/enums/annotationTool';

const annotationTools = useAnnotationToolStore();
const tools = computed(() => annotationTools.tools);

function componentFromTool(tool: AnnotationTool) {
  switch (tool) {
    case AnnotationTool.FaceMesh: {
      if (!Object.keys(visible.value).includes(tool)) {
        visible.value[tool] = true;
      }
      return defineAsyncComponent(() => import('./ToolMenu/FaceMesh.vue'));
    }
    default:
      return null;
  }
}

function toggleVisible(tool: AnnotationTool) {
  visible.value[tool] = !visible.value[tool];
}

const visible = ref<{ [key: string]: boolean }>({});
</script>

<template>
  <BCard v-if="tools.length > 0" class="mt-1">
    <div v-for="(tool, idx) in tools" :id="'tool-menu-' + idx.toString()" :key="idx">
      <div class="d-flex justify-content-evenly mb-1">
        <BButton @click="toggleVisible(tool)">
          {{ tool }}
        </BButton>
        <BButton @click="annotationTools.remove(tool)">
          <i class="bi ' + bi-trash me-1"></i>
        </BButton>
      </div>
      <BCollapse v-model="visible[tool]" class="border bg-secondary-subtle shadow rounded-1">
        <component v-if="componentFromTool(tool)" :is="componentFromTool(tool)" />
        <div v-else>Component not found.</div>
      </BCollapse>
    </div>
  </BCard>
</template>

<style scoped></style>
