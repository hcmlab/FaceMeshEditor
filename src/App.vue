<script setup lang="ts">
import Sidebar from '@/components/SidebarContainer.vue';
import CentralCanvas from '@/components/CentralCanvas.vue';
import ThumbnailGallery from '@/components/ThumbnailGallery.vue';
</script>

<template>
  <div class="d-flex flex-row vh-100 w-100 overflow-hidden">
    <Sidebar />
    <CentralCanvas />
    <ThumbnailGallery />
  </div>
</template>
