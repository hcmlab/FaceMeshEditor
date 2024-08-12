<script setup lang="ts">
import { onMounted, ref } from 'vue';
import $ from 'jquery';
import { ModelType } from '@/model/modelType';
import { useAnnotationHistoryStore } from '@/stores/annotationHistoryStore';
import ModelSelector from '@/components/Sidebar/ModelSelector.vue';
import { useModelStore } from '@/stores/modelStore';
import EditButtons from '@/components/Sidebar/EditButtons.vue';
import FeatureSelector from '@/components/Sidebar/FeatureSelector.vue';
import { SaveStatus } from '@/enums/saveStatus';
import { Point2D } from '@/graph/point2d';
import { Graph } from '@/graph/graph';

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

  $(window).on('beforeunload', () => {
    if (annotationHistoryStore.getUnsaved()) {
      if (modelStore.model.type() === ModelType.custom) {
        sendAnnotation();
      } else {
        return '?';
      }
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
