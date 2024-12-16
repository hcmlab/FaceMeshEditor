<script lang="ts" setup>
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { BvTriggerableEvent } from 'bootstrap-vue-next';
import { useImageLoadStore } from '@/stores/imageLoadStore';
import { ImageFile } from '@/imageFile';
import { guessOrientation, type orientationGuessResult } from '@/util/orientationGuesser';
import { Orientation } from '@/enums/orientation';
import { imageFromFile } from '@/util/imageFromFile';
import { useAnnotationHistoryStore } from '@/stores/annotationHistoryStore';
import { MultipleViewImage } from '@/interface/multiple_view_image';

const imageLoadStore = useImageLoadStore();
const disableHide = ref(true);
const imageCount = ref(0);
const progress = ref(0);
const imageInput = ref<HTMLInputElement | null>(null);
const orientations = ref<orientationGuessResult[]>([]);
const screenHeight = ref(window.innerHeight);
const processing = ref(false);
const confirmModal = ref(false);
const result = ref<MultipleViewImage[]>([]);

const selectedImages = ref<MultipleViewImage>(new MultipleViewImage());

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

/**
 * Draws an image onto a given canvas element.
 *
 * @param canvas - The canvas element to draw the image on.
 * @param image - The image file to be drawn.
 * @return A promise that resolves when the image has been drawn to the canvas.
 */
async function drawImageToCanvas(canvas: HTMLCanvasElement, image: ImageFile) {
  const context = canvas.getContext('2d');
  if (!context) {
    console.error('context not found');
    return;
  }
  const img = new Image();
  img.src = await imageFromFile(image.filePointer);
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

/**
 * Handles the escape event of the Main modal. Is used to stop the user from accidentally closing it.
 *
 * @param e - The event object representing the hide event.
 */
function handleHide(e: BvTriggerableEvent) {
  if (disableHide.value) {
    e.preventDefault();
  }
}

/**
 * Handles the logic for when an image is clicked by assigning the image to the corresponding
 * orientation slot in the selectedImages object.
 *
 * @param image - The image that was clicked and needs to be assigned.
 * @param direction - The direction (left, right, or center) to which the image should be assigned.
 */
function imageClicked(image: orientationGuessResult, direction: Orientation) {
  switch (direction) {
    case Orientation.left: {
      selectedImages.value.left = image;
      break;
    }
    case Orientation.right: {
      selectedImages.value.right = image;
      break;
    }
    case Orientation.center: {
      selectedImages.value.center = image;
      break;
    }
  }
}

function nextImage() {
  // remove selected images
  orientations.value = orientations.value.filter((value) => {
    return (
      !(
        selectedImages.value.left &&
        selectedImages.value.left.image.sha === value.image.sha &&
        selectedImages.value.left.orientation === Orientation.left
      ) &&
      !(
        selectedImages.value.right &&
        selectedImages.value.right.image.sha === value.image.sha &&
        selectedImages.value.right.orientation === Orientation.right
      ) &&
      !(
        selectedImages.value.center &&
        selectedImages.value.center.image.sha === value.image.sha &&
        selectedImages.value.center.orientation === Orientation.center
      )
    );
  });

  result.value.push(selectedImages.value);

  // clean up
  selectedImages.value = new MultipleViewImage();

  progress.value++;
  if (progress.value === imageCount.value) {
    disableHide.value = false;
    confirmModal.value = true;
  }
}

/**
 * Callback when the input component is clicked. Loads all marked files and guesses their orientation.
 */
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
    imageCount.value = orientations.value.filter(
      (value) => value.orientation === Orientation.center
    ).length;

    if (
      orientations.value.filter((value) => value.orientation !== Orientation.center).length === 0
    ) {
      result.value = orientations.value.map((value) => {
        let res = new MultipleViewImage();
        res.selected = value.orientation;
        res.center = value;
        return res;
      });
      save();
    }

    progress.value = 0;
    processing.value = false;
  }
}

const save = () => {
  const store = useAnnotationHistoryStore();
  store.merge(result.value);
  imageLoadStore.showLoadModal = false;
};

const updateScreenHeight = () => {
  screenHeight.value = window.innerHeight / 4;
};

onMounted(() => {
  window.addEventListener('resize', updateScreenHeight);
  updateScreenHeight();

  if (!imageInput.value) {
    console.error('imageInput not found on mount');
    return;
  }
  imageInput.value.addEventListener('change', handleImageLoad);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateScreenHeight);
});
</script>

<template>
  <BModal
    v-model="imageLoadStore.showLoadModal"
    centered
    hide-footer
    scrollable
    size="lg"
    title="Load images"
    @hide="handleHide"
  >
    <input ref="imageInput" accept="image/*" hidden multiple type="file" />
    <div class="d-flex flex-column h-100">
      <!-- the images to select -->
      <div>
        <div v-if="progress < imageCount && imageCount != 0">
          <div class="d-flex flex-grow-1 h-60vh">
            <!-- Left Images Section -->
            <div class="flex-grow-1 d-flex flex-column align-items-center">
              <h2>Left</h2>
              <div class="overflow-y-auto">
                <div
                  v-for="res in orientations.filter((val) => val.orientation === Orientation.left)"
                  :id="res.image.sha + '-container'"
                  :key="res.image.sha"
                  class="overflow-y-auto"
                >
                  <BButton
                    :variant="
                      selectedImages.left?.image.sha === res.image.sha ? 'primary' : 'outline-dark'
                    "
                    class="w-100"
                    @click="+imageClicked(res, Orientation.left)"
                  >
                    <canvas :id="res.image.sha + '-canvas'" class="w-100 rounded border border-2" />
                  </BButton>
                </div>
              </div>
            </div>

            <!-- Frontal Images Section -->
            <div class="flex-grow-1 d-flex flex-column align-items-center">
              <h2>Frontal</h2>
              <div class="overflow-y-auto">
                <div
                  v-for="res in orientations.filter(
                    (val) => val.orientation === Orientation.center
                  )"
                  :id="res.image.sha + '-container'"
                  :key="res.image.sha"
                  class="overflow-y-auto"
                >
                  <BButton
                    :variant="
                      selectedImages.center?.image.sha === res.image.sha
                        ? 'primary'
                        : 'outline-dark'
                    "
                    class="w-100"
                    @click="imageClicked(res, Orientation.center)"
                  >
                    <canvas :id="res.image.sha + '-canvas'" class="w-100 rounded border border-2" />
                  </BButton>
                </div>
              </div>
            </div>

            <!-- Front Images Section -->
            <div class="flex-grow-1 d-flex flex-column align-items-center">
              <h2>Right</h2>
              <div class="overflow-y-auto">
                <div
                  v-for="res in orientations.filter((val) => val.orientation === Orientation.right)"
                  :id="res.image.sha + '-container'"
                  :key="res.image.sha"
                >
                  <BButton
                    :variant="
                      selectedImages.right?.image.sha === res.image.sha ? 'primary' : 'outline-dark'
                    "
                    class="w-100"
                    @click="imageClicked(res, Orientation.right)"
                  >
                    <canvas :id="res.image.sha + '-canvas'" class="w-100 rounded border border-2" />
                  </BButton>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="imageCount == 0" class="d-flex justify-content-around">
          <h1>Press "Load" to get started</h1>
        </div>
        <div v-if="imageCount === progress && imageCount != 0">Finished</div>
      </div>
      <!-- Bottom row -->
      <div class="mt-auto w-100">
        <hr />
        <div class="d-flex">
          <BButton variant="outline-dark" @click="loadImages">
            <BSpinner v-if="processing" small />
            Load
          </BButton>
          <BProgress :max="imageCount" :value="progress" class="w-75 mx-4" show-value />
          <BButton variant="primary" @click="nextImage">Next</BButton>
        </div>
      </div>
    </div>
  </BModal>
  <BModal v-model="confirmModal" @ok="save"> Confirm?</BModal>
</template>
