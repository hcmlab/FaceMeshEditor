<script setup lang="ts"></script>

<template>
  <div class="w-20 h-100 overflow-y-scroll p-3 rounded-end shadow bg-white">
    <table class="text-center">
      <tr>
        <td>
          <img
            src="/static/images/FaceMesh.png"
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
    <a id="openFile" class="nav-link btn btn-light" href="#" aria-keyshortcuts="Control+O"
      ><i class="bi bi-folder2-open"></i> Open Images</a
    >
    <a id="openAnno" class="nav-link btn btn-light" href="#" aria-keyshortcuts="Control+A"
      ><i class="bi bi-folder2-open"></i> Open Annotations</a
    >
    <a id="saveAnno" class="nav-link btn btn-light" href="#" aria-keyshortcuts="Control+S"
      ><i class="bi bi-download"></i> Download all
    </a>
    <a id="sendAnno" class="nav-link btn btn-light" href="#" aria-keyshortcuts="Control+Shift+S">
      <i class="bi bi-floppy"></i>Save</a
    >
    <!-- Edit Options-->
    <h5 class="mt-4">Edit</h5>
    <a id="undo" class="nav-link btn btn-light" href="#" aria-keyshortcuts="Control+Z"
      ><i class="bi bi-arrow-counterclockwise"></i> Undo</a
    >
    <a id="redo" class="nav-link btn btn-light" href="#" aria-keyshortcuts="Control+Y"
      ><i class="bi bi-arrow-clockwise"></i> Redo</a
    >
    <hr />
    <a id="reset" class="nav-link btn btn-light" href="#" aria-keyshortcuts="Control+R"
      ><i class="bi bi-x-square"></i> Reset</a
    >
    <hr />
    <div class="form" style="padding-top: 0.2vw; padding-bottom: 0.2vw">
      <label for="feature_drag" class="form-label" aria-keyshortcuts="Shift+Wheel"
        ><i class="bi bi-bounding-box-circles"></i> Drag Depth:
        <output id="num">0</output>
      </label>
      <input
        type="range"
        class="form-range"
        min="0"
        max="5"
        value="0"
        step="1"
        id="feature_drag"
        style="padding-left: 0.2vw; padding-right: 0.2vw"
      />
    </div>
    <span class="nav-link" style="padding: 0.2vw"><i class="bi bi-cpu"></i> Model</span>
    <div class="btn-group" role="group" style="padding: 0.2vw; width: 100%">
      <input
        type="radio"
        class="btn-check"
        name="btnradio"
        id="btnModelMediapipe"
        autocomplete="off"
        checked
      />
      <label class="btn btn-outline-secondary" for="btnModelMediapipe"
        >Mediapipe<br /><small>Offline</small></label
      >
      <input
        type="radio"
        class="btn-check"
        name="btnradio"
        id="btnModelCustom"
        autocomplete="off"
        data-bs-toggle="modal"
        data-bs-target="#modalSettingsModel"
      />
      <label class="btn btn-outline-secondary" for="btnModelCustom"
        >Webservice<br /><small>Online</small></label
      >
    </div>
    <!-- View Options-->
    <h5 class="mt-4">View</h5>
    <div class="form-check form-switch">
      <input class="form-check-input" type="checkbox" role="switch" id="view_tesselation" />
      <label class="form-check-label" for="view_tesselation" style="text-align: start"
        >Tesselation</label
      >
    </div>
    <!-- Feature Options-->
    <h5 class="mt-4">Features</h5>
    <a
      id="feat_le"
      class="nav-link btn btn-light"
      href="#"
      aria-keyshortcuts=""
      style="padding: 0.2vw"
      ><i class="bi bi-trash"></i> Left Eye</a
    >
    <a
      id="feat_leb"
      class="nav-link btn btn-light"
      href="#"
      aria-keyshortcuts=""
      style="padding: 0.2vw"
      ><i class="bi bi-trash"></i> Left Eyebrow</a
    >
    <a
      id="feat_re"
      class="nav-link btn btn-light"
      href="#"
      aria-keyshortcuts=""
      style="padding: 0.2vw"
      ><i class="bi bi-trash"></i> Right Eye</a
    >
    <a
      id="feat_reb"
      class="nav-link btn btn-light"
      href="#"
      aria-keyshortcuts=""
      style="padding: 0.2vw"
      ><i class="bi bi-trash"></i> Right Eyebrow</a
    >
    <a
      id="feat_n"
      class="nav-link btn btn-light"
      href="#"
      aria-keyshortcuts=""
      style="padding: 0.2vw"
      ><i class="bi bi-trash"></i> Nose</a
    >
    <a
      id="feat_m"
      class="nav-link btn btn-light"
      href="#"
      aria-keyshortcuts=""
      style="padding: 0.2vw"
      ><i class="bi bi-trash"></i> Mouth</a
    >
    <!-- About -->
    <h5 class="mt-4">About</h5>
    <a
      class="nav-link btn btn-light text-start"
      href="https://github.com/hcmlab/FaceMeshEditor"
      target="_blank"
      style="padding: 0.2vw"
      ><i class="bi bi-github"></i> GitHub</a
    >
    <a
      class="nav-link btn btn-light text-start"
      href="https://github.com/hcmlab/FaceMeshEditor/issues/new"
      target="_blank"
      style="padding: 0.2vw"
      ><i class="bi bi-bug"></i> Report Issue</a
    >
    <a
      class="nav-link btn btn-light text-start"
      href="https://github.com/hcmlab/FaceMeshEditor/issues"
      target="_blank"
      style="padding: 0.2vw"
      ><i class="bi bi-question-circle"></i> Question</a
    >
    <a
      class="nav-link btn btn-light text-start"
      href="#"
      data-bs-toggle="modal"
      data-bs-target="#modalInfo"
      style="padding: 0.2vw"
      ><i class="bi bi-info-circle"></i> Info</a
    >
  </div>
</template>

<style scoped></style>
