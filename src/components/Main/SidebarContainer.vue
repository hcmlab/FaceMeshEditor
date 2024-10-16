<script setup lang="ts">
import AnnotationToolSelector from '@/components/Sidebar/AnnotationToolSelector.vue';
import ToolMenuContainer from '@/components/Sidebar/ToolMenuContainer.vue';
</script>

<template>
  <div class="w-20 h-100 overflow-y-scroll p-3 rounded-end shadow bg-light" id="sidebar">
    <AnnotationToolSelector />
    <ToolMenuContainer />
  </div>
</template>

<style scoped></style>
