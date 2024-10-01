<script setup lang="ts">
import { computed } from 'vue';
import { useAnnotationToolStore } from '@/stores/annotationToolStore';
import { allAnnotationTools } from '@/enums/annotationTool';

const annotationTools = useAnnotationToolStore();
const tools = computed(() => annotationTools.tools);
</script>

<template>
  <div class="d-flex justify-content-center">
    <BDropdown text="Tools" center variant="outline-dark">
      <BDropdownItem
        v-for="(annotationTool, idx) in allAnnotationTools"
        :key="idx"
        :disabled="tools.includes(annotationTool)"
        @click="annotationTools.tools.push(annotationTool)"
      >
        {{ annotationTool }}
      </BDropdownItem>
    </BDropdown>
  </div>
</template>

<style scoped></style>
