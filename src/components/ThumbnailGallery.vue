<script setup lang="ts"></script>

<template>
  <div class="w-10 h-100 rounded-start-1 shadow bg-white text-center">
    <!-- Image Selection -->
    <h6 class="my-2">
      Images
      <small
        >(
        <output id="num_images">0</output>
        )</small
      >
    </h6>
    <div
      id="thumbnailGallery"
      class="h-100 w-100 overflow-y-auto p-1 d-flex flex-column align-items-center"
    ></div>
  </div>
</template>

<style scoped></style>
