<script setup lang="ts">
import Sidebar from '@/components/Main/SidebarContainer.vue';
import CentralCanvas from '@/components/Main/CentralCanvas.vue';
import ThumbnailGallery from '@/components/Main/ThumbnailGallery.vue';
</script>

<template>
  <div class="d-flex flex-row vh-100 w-100 overflow-hidden">
    <Sidebar />
    <CentralCanvas />
    <ThumbnailGallery />
  </div>
</template>
