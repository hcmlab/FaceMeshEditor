<script setup lang="ts">
import { computed, onBeforeUnmount } from 'vue';
import { Point2D } from '@/graph/point2d';
import { Graph } from '@/graph/graph';
import { SaveStatus } from '@/enums/saveStatus';
import { ModelType } from '@/enums/modelType';
import { useModelStore } from '@/stores/modelStore';
import { useAnnotationHistoryStore } from '@/stores/annotationHistoryStore';
import ButtonWithIcon from '@/components/MenuItems/ButtonWithIcon.vue';

const modelStore = useModelStore();
const annotationHistoryStore = useAnnotationHistoryStore();

const showSendAnno = computed(
  () =>
    annotationHistoryStore.getUnsaved().length > 0 && modelStore.model.type() === ModelType.custom
);

function handleSendAnno(): void {
  sendAnnotation();
}

function openImage(): void {
  const input: HTMLInputElement = document.createElement('input');
  input.id = 'image-input';
  input.type = 'file';
  input.accept = 'image/png, image/jpeg, image/jpg';
  input.multiple = true;
  input.onchange = () => {
    if (input.files) {
      const files: File[] = Array.from(input.files);
      files.forEach((f) => {
        annotationHistoryStore.add(f, modelStore.model);
      });
    }
  };
  input.click();
}

function openAnnotation(): boolean {
  const input: HTMLInputElement = document.createElement('input');
  input.id = 'annotation-input';
  input.type = 'file';
  input.accept = '.json,application/json';
  input.onchange = () => {
    if (!input.files) return;
    if (input.files.length <= 0) return;
    const annotationFile: File = input.files[0];
    const reader: FileReader = new FileReader();
    reader.onload = (_) => {
      type Point2DArray = {
        [key: string]: {
          points: Point2D[][];
          sha256: string;
        };
      };
      const parsedData: Point2DArray = JSON.parse(reader.result as string);
      Object.keys(parsedData).forEach((filename) => {
        const workingImage = parsedData[filename];
        // skip files without annotation
        if (Object.keys(workingImage).length == 0) {
          return;
        }
        const history = annotationHistoryStore.find(filename, workingImage['sha256']);
        if (!history) {
          return;
        }
        /* backward compatibility if the file contains the old Points2D[] format instead of Points2D[][] */
        if (!Array.isArray(workingImage['points'][0])) {
          workingImage['points'] = [workingImage['points'] as unknown as Point2D[]];
        }
        workingImage['points'].forEach((unparsedGraph) => {
          const graph: Graph<Point2D> = Graph.fromJson(
            unparsedGraph,
            (id) => new Point2D(id, 0, 0, [])
          );
          history.add(graph);
        });
      });
    };
    reader.readAsText(annotationFile);
  };
  input.click();
  return false;
}

function collectAnnotation() {
  interface FileObj {
    points?: { deleted: boolean; x: number; y: number; id: number }[][];
    sha256?: string;
  }

  interface ResultObj {
    [key: string]: FileObj;
  }

  const result: ResultObj = {};
  annotationHistoryStore.histories.forEach((h) => {
    if (h.status !== SaveStatus.saved) {
      return;
    }
    h.markAsSent();
    const graph = h.get();
    const fileName = h.file.file.name;

    result[fileName] = {};
    if (graph) {
      result[fileName]['points'] = [graph.toDictArray()];
      result[fileName]['sha256'] = h.file.sha;
    }
  });
  return result;
}

function saveAnnotation(): void {
  if (annotationHistoryStore.empty()) {
    return;
  }

  const result = collectAnnotation();
  if (Object.keys(result).length <= 0) {
    return;
  }

  const jsonData: string = JSON.stringify(result);
  modelStore.model.uploadAnnotations(jsonData);
  const dataStr: string = 'data:text/json;charset=utf-8,' + encodeURIComponent(jsonData);
  const a: HTMLAnchorElement = document.createElement('a');
  a.id = 'download-all';
  a.href = dataStr;
  a.download = Date.now() + '_face_mesh_annotations.json';
  a.click();
}

function sendAnnotation(): void {
  if (annotationHistoryStore.empty()) {
    return;
  }

  const result = collectAnnotation();
  if (Object.keys(result).length <= 0) {
    return;
  }

  const jsonData: string = JSON.stringify(result);
  modelStore.model.uploadAnnotations(jsonData);

  Object.keys(result).forEach((fileName) => {
    const hash = result[fileName]['sha256'];
    if (!hash) return;
    const history = annotationHistoryStore.find(fileName, hash);
    if (!history) return;
    history.status = SaveStatus.saved;
  });
}

// @ts-expect-error the error complains that not all code paths return something.
// This is completely intended. Since returning anything triggers a popup
onBeforeUnmount(() => {
  if (annotationHistoryStore.getUnsaved()) {
    if (modelStore.model.type() === ModelType.custom) {
      sendAnnotation();
    } else {
      return '?';
    }
  }
});
</script>

<template>
  <BNavItemDropdown
    text="File"
    class="pt-1"
    variant="light"
    auto-close="outside"
    id="file-dropdown"
  >
    <BDropdownItem>
      <button-with-icon
        text="Open Images"
        icon="bi-folder2-open"
        shortcut="Control+O"
        @click="openImage"
      />
    </BDropdownItem>
    <BDropdownItem>
      <button-with-icon
        text="Open Annotations"
        icon="bi-folder2-open"
        shortcut="Control+A"
        @click="openAnnotation"
      />
    </BDropdownItem>
    <BDropdownItem>
      <button-with-icon
        text="Download all"
        icon="bi-download"
        shortcut="Control+S"
        @click="saveAnnotation"
      />
    </BDropdownItem>
    <BDropdownItem>
      <button-with-icon
        text="Save"
        icon="bi-floppy"
        shortcut="Control+Shift+S"
        @click="handleSendAnno"
        v-if="showSendAnno"
      />
    </BDropdownItem>
  </BNavItemDropdown>
</template>

<style scoped></style>
