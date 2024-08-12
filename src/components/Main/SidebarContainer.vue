<script setup lang="ts">
import { onMounted } from 'vue';
import ModelSelector from '@/components/Sidebar/ModelSelector.vue';
import EditButtons from '@/components/Sidebar/EditButtons.vue';
import FeatureSelector from '@/components/Sidebar/FeatureSelector.vue';
import LoadSaveActions from '@/components/Sidebar/LoadSaveActions.vue';

onMounted(() => {
  const elements = document.querySelectorAll('[aria-keyshortcuts]');
  elements.forEach((baseElem: Element) => {
    const elem = baseElem as HTMLElement;
    if (!elem.ariaKeyShortcuts) return;
    elem.style.cssText = 'width: 100%; text-align: start; padding: .2vw;';
    const keys: string[] = elem.ariaKeyShortcuts
      .split('+')
      .map((k: string) =>
        k.replace('Control', 'CTRL').replace('Shift', 'SHIFT').replace('Wheel', 'SCROLL')
      );
    if (elem.ariaKeyShortcuts.length > 0) {
      const table: HTMLTableElement = document.createElement('table');
      table.style.cssText = 'width: 100%';
      const row: HTMLTableRowElement = document.createElement('tr');
      table.appendChild(row);
      const menuTextCol: HTMLTableCellElement = document.createElement('td');
      menuTextCol.innerHTML = elem.innerHTML;
      row.appendChild(menuTextCol);
      const menuShortCutCol: HTMLTableCellElement = document.createElement('td');
      menuShortCutCol.style.cssText = 'text-align: end;';
      menuShortCutCol.innerHTML = keys.map((k: string) => '<kbd>' + k + '</kbd>').join('+');
      row.appendChild(menuShortCutCol);
      elem.replaceChildren(table);
    }
  });
});
</script>

<template>
  <div class="w-20 h-100 overflow-y-scroll p-3 rounded-end shadow bg-white">
    <table class="text-center">
      <tr>
        <td>
          <img
            src="../../../static/images/FaceMesh.png"
            class="rounded-circle border border-dark border-2"
            style="width: 4vw; height: 4vw"
            alt="Icon"
          />
        </td>
        <td>
          <h2>Face Mesh Editor</h2>
        </td>
      </tr>
    </table>
    <LoadSaveActions />
    <!-- Edit Options-->
    <EditButtons />
    <ModelSelector />
    <!-- View Options-->
    <h5 class="mt-4">View</h5>
    <div class="form-check form-switch">
      <input
        class="form-check-input"
        type="checkbox"
        role="switch"
        id="view_tesselation"
        aria-checked="false"
      />
      <label class="form-check-label" for="view_tesselation" style="text-align: start"
        >Tesselation</label
      >
    </div>
    <!-- Feature Options-->
    <FeatureSelector />
    <!-- About -->
    <h5 class="mt-4">About</h5>
    <a
      class="nav-link btn btn-light text-start"
      href="https://github.com/hcmlab/FaceMeshEditor"
      target="_blank"
      style="padding: 0.2vw"
      ><i class="bi bi-github"></i>GitHub</a
    >
    <a
      class="nav-link btn btn-light text-start"
      href="https://github.com/hcmlab/FaceMeshEditor/issues/new"
      target="_blank"
      style="padding: 0.2vw"
      ><i class="bi bi-bug"></i>Report Issue</a
    >
    <a
      class="nav-link btn btn-light text-start"
      href="https://github.com/hcmlab/FaceMeshEditor/issues"
      target="_blank"
      style="padding: 0.2vw"
      ><i class="bi bi-question-circle"></i>Question</a
    >
    <a
      class="nav-link btn btn-light text-start"
      href="#"
      data-bs-toggle="modal"
      data-bs-target="#modalInfo"
      style="padding: 0.2vw"
      ><i class="bi bi-info-circle"></i>Info</a
    >
  </div>
</template>

<style scoped>
i {
  margin-right: 0.25rem !important;
}
</style>
