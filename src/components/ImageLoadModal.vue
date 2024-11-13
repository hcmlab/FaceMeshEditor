<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { BvTriggerableEvent } from 'bootstrap-vue-next';
import { useImageLoadStore } from '@/stores/imageLoadStore';
import { ImageFile } from '@/imageFile';
import { guessOrientation, type orientationGuessResult } from '@/util/orientationGuesser';
import { Orientation } from '@/enums/orientation';
import { imageFromFile } from '@/util/imageFromFile';

const imageLoadStore = useImageLoadStore();
const disableHide = ref(true);
const imageCount = ref(100);
const progress = ref(50);
const imageScrollContainer = ref<HTMLDivElement | null>(null);
const imageInput = ref<HTMLInputElement | null>(null);
const orientations = ref<orientationGuessResult[]>([]);
const screenHeight = ref(window.innerHeight);
const processing = ref(false);

watch(orientations, (newVal) => {
  nextTick().then(() => {
    newVal.forEach((res) => {
      const canvas = document.getElementById(res.image.sha + '-canvas') as HTMLCanvasElement;
      if (!canvas) {
        console.error('canvas not found');
        return;
      }
      drawImageToCanvas(canvas, res.image);
    });
  });
});

async function drawImageToCanvas(canvas: HTMLCanvasElement, image: ImageFile) {
  const context = canvas.getContext('2d');
  if (!context) {
    console.error('context not found');
    return;
  }
  const img = new Image();
  img.src = await imageFromFile(image.file);
  img.onload = () => {
    canvas.width = screenHeight.value * (img.width / img.height);
    canvas.height = screenHeight.value;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
  };
  img.onerror = (error) => {
    console.error('failed to load image', error);
  };
}

async function loadImages() {
  if (!imageInput.value) {
    console.error('imageInput not found on load click');
    return;
  }
  imageInput.value.click();
}

function handleHide(e: BvTriggerableEvent) {
  if (disableHide.value) {
    e.preventDefault();
  }
}

/**
 *
 * @param image
 */
function imageClicked(image: ImageFile) {}

function nextImage() {}

async function handleImageLoad() {
  if (!imageInput.value) {
    console.error('imageInput not found on change');
    return;
  }
  if (imageInput.value.files) {
    const files: File[] = Array.from(imageInput.value.files);
    const import_images: ImageFile[] = [];
    await Promise.all(
      files.map(async (file) => {
        const image = await ImageFile.create(file);
        import_images.push(image);
      })
    );
    processing.value = true;
    orientations.value = orientations.value.concat(await guessOrientation(import_images));
    processing.value = false;
  }
}

onMounted(() => {
  if (!imageInput.value) {
    console.error('imageInput not found on mount');
    return;
  }
  imageInput.value.addEventListener('change', handleImageLoad);
});

const updateScreenHeight = () => {
  screenHeight.value = window.innerHeight / 4;
};

onMounted(() => {
  window.addEventListener('resize', updateScreenHeight);
  updateScreenHeight();
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateScreenHeight);
});
</script>

<template>
  <BModal
    v-model="imageLoadStore.showLoadModal"
    title="Load images"
    @hide="handleHide"
    size="lg"
    hide-footer
    scrollable
  >
    <input type="file" multiple accept="image/*" ref="imageInput" hidden />
    <div class="d-flex flex-column h-100">
      <!-- Top elements -->
      <div class="flex-fill h-100 w-100 d-flex justify-content-center">
        <div>
          <BButton @click="disableHide = !disableHide"> toggle disable hide </BButton>
        </div>
      </div>
      <!-- the images to select -->
      <div
        v-if="orientations.length > 0"
        class="flex-fill h-100 w-100 d-flex justify-content-center"
        ref="imageScrollContainer"
      >
        <div class="flex-grow-1 h-100 overflow-y-auto d-flex flex-column align-items-center">
          <h2>Left</h2>
          <div
            v-for="res in orientations.filter((val) => val.orientation === Orientation.left)"
            :key="res.image.sha"
            :id="res.image.sha + '-container'"
          >
            <BButton @click="imageClicked(res.image)" variant="outline-dark" class="w-100">
              <canvas :id="res.image.sha + '-canvas'" class="w-100 rounded border border-2" />
            </BButton>
          </div>
        </div>
        <div class="flex-grow-1 h-100 overflow-y-auto d-flex flex-column align-items-center">
          <h2>Frontal</h2>
          <div
            v-for="res in orientations.filter((val) => val.orientation === Orientation.front)"
            :key="res.image.sha"
            :id="res.image.sha + '-container'"
          >
            <BButton @click="imageClicked(res.image)" variant="outline-dark" class="w-100">
              <canvas :id="res.image.sha + '-canvas'" class="w-100 rounded border border-2" />
            </BButton>
          </div>
        </div>
        <div class="flex-grow-1 h-100 overflow-y-auto d-flex flex-column align-items-center">
          <h2>Right</h2>
          <div
            v-for="res in orientations.filter((val) => val.orientation === Orientation.right)"
            :key="res.image.sha"
            :id="res.image.sha + '-container'"
          >
            <BButton @click="imageClicked(res.image)" variant="outline-dark" class="w-100">
              <canvas :id="res.image.sha + '-canvas'" class="w-100 rounded border border-2" />
            </BButton>
          </div>
        </div>
      </div>
      <!-- Bottom row -->
      <div class="mt-auto w-100">
        <hr />
        <div class="d-flex">
          <BButton @click="loadImages" variant="outline-dark">Load</BButton>
          <BProgress :value="progress" :max="imageCount" show-value class="w-75 mx-4" />
          <BButton @click="nextImage" variant="primary">Next</BButton>
        </div>
      </div>
    </div>
  </BModal>
</template>
