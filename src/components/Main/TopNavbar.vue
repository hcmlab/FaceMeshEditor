<script setup lang="ts">
import { BNavbar } from 'bootstrap-vue-next';
import LoadSaveActions from '@/components/Navbar/LoadSaveActions.vue';
import EditButtons from '@/components/Navbar/EditButtons.vue';
import AboutSection from '@/components/Navbar/AboutSection.vue';
</script>

<template>
  <BNavbar class="shadow" variant="light">
    <BNavbarBrand class="d-flex flex-row align-items-center py-1">
      <div class="me-3">
        <img
          src="../../../static/images/FaceMesh.png"
          class="rounded-circle border border-dark border-2 shadow"
          style="width: 3vw; height: 3vw"
          alt="Icon"
        />
      </div>
      <div>
        <h3 class="m-0" id="title">Face Mesh Editor</h3>
      </div>
    </BNavbarBrand>
    <BNavbarNav align="start">
      <LoadSaveActions />
      <EditButtons />
      <AboutSection />
    </BNavbarNav>
  </BNavbar>
</template>

<style scoped></style>
