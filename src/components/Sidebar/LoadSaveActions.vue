<script setup lang="ts">
import { ref } from 'vue';
import $ from 'jquery';
import { Point2D } from '@/graph/point2d';
import { Graph } from '@/graph/graph';
import { SaveStatus } from '@/enums/saveStatus';
import { ModelType } from '@/model/modelType';
import { useModelStore } from '@/stores/modelStore';
import { useAnnotationHistoryStore } from '@/stores/annotationHistoryStore';

const showSendAnno = ref<boolean>(false);

const modelStore = useModelStore();
const annotationHistoryStore = useAnnotationHistoryStore();

function handleSendAnno(): void {
  showSendAnno.value = false;
}

function openImage(): void {
  const input: HTMLInputElement = document.createElement('input');
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
    points?: { deleted: boolean; x: number; y: number; id: number }[];
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
      result[fileName]['points'] = graph.toDictArray();
      result[fileName]['sha256'] = h.file.sha;
    }
  });
  return result;
}

function saveAnnotation(): boolean {
  if (annotationHistoryStore.empty()) {
    return false;
  }

  const result = collectAnnotation();
  console.log(result);
  if (Object.keys(result).length <= 0) {
    return false;
  }

  const jsonData: string = JSON.stringify(result);
  modelStore.model.uploadAnnotations(jsonData);
  const dataStr: string = 'data:text/json;charset=utf-8,' + encodeURIComponent(jsonData);
  const a: HTMLAnchorElement = document.createElement('a');
  a.href = dataStr;
  a.download = Date.now() + '_face_mesh_annotations.json';
  a.click();
  return false;
}

function sendAnnotation(): boolean {
  if (annotationHistoryStore.empty()) {
    return false;
  }

  const result = collectAnnotation();
  if (Object.keys(result).length <= 0) {
    return false;
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
  return false;
}

$(window).on('beforeunload', () => {
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
  <!-- File Options-->
  <h5 class="mt-4">File</h5>
  <a
    id="openFile"
    class="nav-link btn btn-light"
    href="#"
    aria-keyshortcuts="Control+O"
    @click="openImage"
    ><i class="bi bi-folder2-open"></i>Open Images</a
  >
  <a
    id="openAnno"
    class="nav-link btn btn-light"
    href="#"
    aria-keyshortcuts="Control+A"
    @click="openAnnotation"
    ><i class="bi bi-folder2-open"></i>Open Annotations</a
  >
  <a
    id="saveAnno"
    class="nav-link btn btn-light"
    href="#"
    aria-keyshortcuts="Control+S"
    @click="saveAnnotation"
    ><i class="bi bi-download"></i>Download all
  </a>
  <a
    id="sendAnno"
    class="nav-link btn btn-light"
    href="#"
    aria-keyshortcuts="Control+Shift+S"
    @click="handleSendAnno"
    v-if="showSendAnno"
  >
    <i class="bi bi-floppy"></i>Save</a
  >
</template>

<style scoped></style>
