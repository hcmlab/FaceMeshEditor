<script setup lang="ts">
import { useAnnotationHistoryStore } from '@/stores/annotationHistoryStore';
import { useModelStore } from '@/stores/modelStore';
import ButtonWithIcon from '@/components/MenuItems/ButtonWithIcon.vue';

const annotationHistoryStore = useAnnotationHistoryStore();
const modelStore = useModelStore();

function undo(): boolean {
  annotationHistoryStore.selectedHistory?.previous();
  return false;
}

function redo(): boolean {
  annotationHistoryStore.selectedHistory?.next();
  return false;
}

function reset(): boolean {
  annotationHistoryStore.selectedHistory?.clear();
  runDetection();
  return false;
}

function runDetection() {
  const history = annotationHistoryStore.selectedHistory;
  if (!history) return;
  modelStore.model?.detect(history.file).then((graph) => {
    if (graph === null) {
      return;
    }
    history.add(graph);
  });
}
</script>

<template>
  <BNavItemDropdown text="Edit" class="pt-1" variant="light" id="edit-dropdown">
    <BDropdownItem>
      <button-with-icon
        text="Undo"
        icon="bi-arrow-counterclockwise"
        shortcut="Control+Z"
        @click="undo"
      />
    </BDropdownItem>
    <BDropdownItem>
      <button-with-icon text="Redo" icon="bi-arrow-clockwise" shortcut="Control+Y" @click="redo" />
    </BDropdownItem>
    <BDropdownItem>
      <button-with-icon text="Reset" icon="bi-x-square" shortcut="Control+R" @click="reset" />
    </BDropdownItem>
  </BNavItemDropdown>
</template>

<style scoped></style>
