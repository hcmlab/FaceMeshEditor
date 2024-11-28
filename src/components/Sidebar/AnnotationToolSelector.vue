<script setup lang="ts">
import { ref } from 'vue';
import ToolSelectorModal from '@/components/Sidebar/ToolSelectorModal.vue';

const openModal = ref(false);
</script>

<template>
  <div class="d-flex justify-content-center">
    <BButton class="w-100" @click="openModal = true">Add Model</BButton>
  </div>
  <tool-selector-modal v-model="openModal" />
</template>

<style scoped></style>
