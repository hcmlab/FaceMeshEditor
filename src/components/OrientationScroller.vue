<template>
  <div class="w-100 overflow-y-auto border" ref="scrollContainer">
    <div
      v-for="res in filteredOrientations"
      :key="res.image.sha"
      :id="res.image.sha + '-container'"
    >
      <BButton @click="() => imageClicked(res.image)" variant="outline-dark" class="w-100">
        <canvas
          :id="res.image.sha + '-canvas'"
          class="w-100 rounded border border-2"
          ref="canvases"
        />
      </BButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, nextTick } from 'vue';
import type { PropType } from 'vue';
import type { orientationGuessResult } from '@/util/orientationGuesser';
import { ImageFile } from '@/imageFile';
import { imageFromFile } from '@/util/imageFromFile';

const props = defineProps({
  orientations: {
    type: Array as PropType<orientationGuessResult[]>,
    required: true
  },
  orientation: {
    type: Number,
    required: true
  },
  imageClicked: {
    type: Function as PropType<(image: orientationGuessResult['image']) => void>,
    required: true
  },
  height: {
    type: Number,
    required: true
  }
});

const scrollContainer = ref<HTMLDivElement>();
const canvases = ref<HTMLCanvasElement[]>([]);

const filteredOrientations = computed(() => {
  return props.orientations.filter((res) => res.orientation === props.orientation);
});

watch(
  () => props.orientations,
  async (newValue) => {
    console.log('orientations changed');
    await nextTick();
    newValue.forEach((res) => {
      const canvas = canvases.value.find((c) => c.id === res.image.sha + '-canvas');
      if (!canvas) {
        console.error('canvas not found');
        return;
      }
      drawImageToCanvas(canvas, res.image);
    });
  },
  { deep: true }
);

async function drawImageToCanvas(canvas: HTMLCanvasElement, image: ImageFile) {
  console.log('drawing image to canvas', image.file.name);
  const context = canvas.getContext('2d');
  if (!context) {
    console.error('context not found');
    return;
  }
  const img = new Image();
  img.src = await imageFromFile(image.file);
  img.onload = () => {
    if (!scrollContainer.value) {
      console.error('scrollContainer not found');
      return;
    }
    canvas.width = props.height * (img.width / img.height);
    canvas.height = props.height;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
  };
  img.onerror = (error) => {
    console.error('failed to load image', error);
  };
}
</script>
