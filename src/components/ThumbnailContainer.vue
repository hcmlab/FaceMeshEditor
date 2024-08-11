<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue';
import { SaveStatus } from '@/enums/saveStatus';
import { FileAnnotationHistory } from '@/cache/fileAnnotationHistory';
import { Point2D } from '@/graph/point2d';

const props = defineProps({
  onClickCallback: {
    type: Function,
    required: true
  },
  history: {
    type: FileAnnotationHistory<Point2D>,
    required: true
  },
  imageSize: {
    type: Number,
    default: 100
  }
});

// Canvas reference
const canvas = ref<HTMLCanvasElement | null>(null);
const href = ref('#');
const image = new Image();

onMounted(() => {
  image.onload = () => draw();
  image.src = props.history.file.html;
});

const draw = () => {
  if (!canvas.value) return;
  const ctx = canvas.value.getContext('2d');
  if (!ctx) return;
  const size = canvas.value.offsetWidth;
  canvas.value.width = size;
  canvas.value.height = size;

  const scale = size / Math.max(image.width, image.height);
  const offX = (size - image.width * scale) / 2;
  const offY = (size - image.height * scale) / 2;

  ctx.fillStyle = 'rgba(0,0,0,1)';
  ctx.fillRect(0, 0, size, size);
  ctx.drawImage(image, offX, offY, image.width * scale, image.height * scale);
};

let iconClass = computed(() => {
  switch (props.history.status) {
    case SaveStatus.unedited: {
      return 'bi-floppy text-secondary';
    }
    case SaveStatus.edited: {
      return 'bi-floppy text-warning';
    }
    case SaveStatus.saved: {
      return 'bi-check text-success';
    }
  }
  return '';
});

let iconDescription = computed(() => {
  switch (props.history.status) {
    case SaveStatus.unedited: {
      return 'Annotation has not been Edited';
    }
    case SaveStatus.edited: {
      return 'Annotation has been changed but not saved';
    }
    case SaveStatus.saved: {
      return 'Annotation has been saved';
    }
    default: {
      return '';
    }
  }
});

const onClick = (event: MouseEvent) => {
  event.preventDefault();
  props.onClickCallback(props.history.file);
};

watch(
  () => props.history.file.html,
  (newSrc) => {
    image.src = newSrc;
  }
);
</script>

<template>
  <div class="thumbnail">
    <a class="overlap-container w-15vh h-15vh my-1" :href="href" @click="onClick">
      <canvas
        ref="canvas"
        class="img-thumbnail d-block w-100 rounded"
        :width="imageSize"
        :height="imageSize"
      ></canvas>
      <div
        :class="[
          'p-1 w-100 h-100 bg-dark bg-opacity-50 rounded border border-dark d-flex justify-content-center align-items-center',
          { 'd-none': history.status === SaveStatus.unedited }
        ]"
      >
        <i :class="'bi ' + iconClass" style="font-size: 6vh"></i>
        <span class="visually-hidden">{{ iconDescription }}</span>
      </div>
    </a>
  </div>
</template>

<style scoped>
.thumbnail .overlap-container {
  position: relative;
  cursor: pointer;
}
.thumbnail canvas {
  object-fit: cover;
}
.thumbnail div {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
