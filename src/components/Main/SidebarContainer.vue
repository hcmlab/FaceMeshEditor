<script setup lang="ts">
import { onMounted } from 'vue';
import ModelSelector from '@/components/Sidebar/ModelSelector.vue';
import EditButtons from '@/components/Sidebar/EditButtons.vue';
import FeatureSelector from '@/components/Sidebar/FeatureSelector.vue';
import LoadSaveActions from '@/components/Sidebar/LoadSaveActions.vue';
import ViewOptions from '@/components/Sidebar/ViewOptions.vue';
import AboutSection from '@/components/Sidebar/AboutSection.vue';

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
  <div class="w-20 h-100 overflow-y-scroll p-3 rounded-end shadow bg-white" id="sidebar">
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
    <EditButtons />
    <ModelSelector />
    <ViewOptions />
    <FeatureSelector />
    <AboutSection />
  </div>
</template>

<style scoped>
i {
  margin-right: 0.25rem !important;
}
</style>
