<script setup lang="ts">
import Sidebar from '@/components/Main/SidebarContainer.vue';
import CentralCanvas from '@/components/Main/CentralCanvas.vue';
import ThumbnailGallery from '@/components/Main/ThumbnailGallery.vue';
import TopNavbar from '@/components/Main/TopNavbar.vue';
</script>

<template>
  <div class="vh-100 vw-100 overflow-hidden shadow">
    <TopNavbar />
    <div class="d-flex flex-row h-100 w-100">
      <Sidebar />
      <CentralCanvas />
      <ThumbnailGallery />
    </div>
  </div>
</template>
