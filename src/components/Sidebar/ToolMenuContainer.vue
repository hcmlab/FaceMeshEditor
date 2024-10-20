<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue';
import { Sortable } from 'sortablejs-vue3';
import { useAnnotationToolStore } from '@/stores/annotationToolStore';
import { AnnotationTool } from '@/enums/annotationTool';

const annotationTools = useAnnotationToolStore();
const tools = computed(() =>
  Array.from(annotationTools.tools).map((tool, index) => ({
    id: index + 1,
    tool: tool
  }))
);

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
    <Sortable :list="tools" item-key="id" tag="div">
      <template #header> </template>
      <template #item="{ element }">
        <div class="draggable" :key="element.id">
          <BAccordion free class="mt-2 bg-light rounded-1">
            <BAccordionItem :title="element.tool" visible>
              <component
                v-if="componentFromTool(element.tool)"
                :is="componentFromTool(element.tool)"
              />
              <div v-else>Component not found.</div>
              <!-- remove -->
              <hr />
              <BButton
                @click="annotationTools.tools.delete(element.tool)"
                variant="outline-dark"
                class="w-100"
              >
                <i class="bi bi-trash"></i>
                Remove tool
              </BButton>
            </BAccordionItem>
          </BAccordion>
        </div>
      </template>
    </Sortable>
  </div>
</template>

<style scoped></style>
