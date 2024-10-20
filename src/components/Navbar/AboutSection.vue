<script setup lang="ts">
import { ref } from 'vue';

const showInfo = ref(false);
</script>

<template>
  <BNavItemDropdown text="About" class="py-1" variant="light" id="about-dropdown">
    <BDropdownItem>
      <a
        class="nav-link btn btn-light text-start"
        href="https://github.com/hcmlab/FaceMeshEditor"
        target="_blank"
        id="button-github"
        ><i class="bi bi-github me-1"></i>GitHub</a
      >
    </BDropdownItem>
    <BDropdownDivider />
    <BDropdownItem>
      <a
        class="nav-link btn btn-light text-start"
        href="https://github.com/hcmlab/FaceMeshEditor/issues/new"
        target="_blank"
        id="button-report-issue"
        ><i class="bi bi-bug me-1"></i>Report Issue</a
      >
    </BDropdownItem>
    <BDropdownItem>
      <a
        class="nav-link btn btn-light text-start"
        href="https://github.com/hcmlab/FaceMeshEditor/issues"
        target="_blank"
        id="button-question"
        ><i class="bi bi-question-circle me-1"></i>Question</a
      >
    </BDropdownItem>
    <BDropdownItem>
      <a
        class="nav-link btn btn-light text-start"
        href="#"
        @click="showInfo = true"
        id="button-info"
        ><i class="bi bi-info-circle me-1"></i>Info</a
      >
    </BDropdownItem>
  </BNavItemDropdown>

  <BModal title="Info" v-model="showInfo" :hide-footer="true" centered>
    <b>&copy; 2024 Chair of Human-Centered Artificial Intelligence</b><br />
    University of Augsburg<br />
    Germany
  </BModal>
</template>

<style scoped></style>
