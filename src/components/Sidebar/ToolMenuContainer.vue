<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue';
import { useAnnotationToolStore } from '@/stores/annotationToolStore';
import { AnnotationTool } from '@/enums/annotationTool';

const annotationTools = useAnnotationToolStore();
const tools = computed(() => annotationTools.tools);

function componentFromTool(tool: AnnotationTool) {
  switch (tool) {
    case AnnotationTool.FaceMesh: {
      return defineAsyncComponent(() => import('./ToolMenu/FaceMesh.vue'));
    }
    default:
      return null;
  }
}
</script>

<template>
  <div v-if="tools.length > 0" class="mt-1">
    <!-- options -->
    <BAccordion :free="true" class="mt-2 bg-light rounded-1">
      <div v-for="(tool, idx) in tools" :id="'tool-menu-' + idx.toString()" :key="idx">
        <BAccordionItem :title="tool">
          <component v-if="componentFromTool(tool)" :is="componentFromTool(tool)" />
          <div v-else>Component not found.</div>
          <!-- remove -->
          <hr />
          <BButton @click="annotationTools.remove(tool)" variant="outline-dark" class="w-100">
            <i class="bi bi-trash"></i>
            Remove tool
          </BButton>
        </BAccordionItem>
      </div>
    </BAccordion>
  </div>
</template>

<style scoped></style>
