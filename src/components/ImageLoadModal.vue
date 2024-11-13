<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { BvTriggerableEvent } from 'bootstrap-vue-next';
import { useImageLoadStore } from '@/stores/imageLoadStore';
import { ImageFile } from '@/imageFile';
import { guessOrientation, type orientationGuessResult } from '@/util/orientationGuesser';
import OrientationScroller from '@/components/OrientationScroller.vue';
import { Orientation } from '@/enums/orientation';

const imageLoadStore = useImageLoadStore();
const disableHide = ref(true);
const imageCount = ref(100);
const progress = ref(50);
const imageScrollContainer = ref<HTMLDivElement | null>(null);
const imageInput = ref<HTMLInputElement | null>(null);
const orientations = ref<orientationGuessResult[]>([]);
const screenHeight = ref(window.innerHeight);

watch(orientations, (newVal, oldVal) => {
  console.log('orientations updated:', oldVal, '->', newVal);
});

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
    orientations.value = orientations.value.concat(await guessOrientation(import_images));
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
  screenHeight.value = window.innerHeight;
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
    scrollable
    size="xl"
    hide-footer
  >
    <input type="file" multiple accept="image/*" ref="imageInput" hidden />
    <div class="d-flex flex-column justify-content-center align-items-center">
      <!-- Top elements -->
      <div class="flex-fill w-100 d-flex justify-content-center">
        <div>
          <BButton @click="disableHide = !disableHide"> toggle disable hide </BButton>
        </div>
      </div>
      <!-- the images to select -->
      <div
        v-if="orientations.length > 0"
        class="flex-fill w-100 d-flex justify-content-center"
        ref="imageScrollContainer"
      >
        <div
          class="flex-grow-1 overflow-y-auto d-flex flex-column justify-content-center align-items-center"
        >
          <h2>Left</h2>
          <OrientationScroller
            :image-clicked="imageClicked"
            :orientations="orientations"
            :orientation="Orientation.left"
            :height="screenHeight / 3"
          />
        </div>
        <div
          class="flex-grow-1 overflow-y-auto d-flex flex-column justify-content-center align-items-center"
        >
          <h2>Frontal</h2>
          <OrientationScroller
            :image-clicked="imageClicked"
            :orientations="orientations"
            :orientation="Orientation.front"
            :height="screenHeight / 3"
          />
        </div>
        <div
          class="flex-grow-1 overflow-y-auto d-flex flex-column justify-content-center align-items-center"
        >
          <h2>Right</h2>
          <OrientationScroller
            :image-clicked="imageClicked"
            :orientations="orientations"
            :orientation="Orientation.right"
            :height="screenHeight / 3"
          />
        </div>
      </div>
      <!-- Bottom row -->
      <div class="mt-auto w-100">
        <hr />
        <div class="d-flex justify-content-center align-items-center">
          <BButton @click="loadImages" variant="outline-dark">Load</BButton>
          <BProgress :value="progress" :max="imageCount" show-value class="w-75 mx-4" />
          <BButton @click="nextImage" variant="primary">Next</BButton>
        </div>
      </div>
    </div>
  </BModal>
</template>
