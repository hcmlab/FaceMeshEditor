<script setup lang="ts">
defineProps({
  shortcut: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  }
});

const emits = defineEmits(['click']);

function handleClick(e: MouseEvent) {
  emits('click', e);
}
</script>

<template>
  <a
    :id="'button_' + text.toLowerCase().replace(/ /g, '_')"
    class="nav-link btn btn-light text-start"
    href="#"
    :aria-keyshortcuts="shortcut"
    @click="handleClick"
    ><i :class="'bi ' + icon" class="me-1"></i>{{ text }}</a
  >
</template>

<style scoped></style>
