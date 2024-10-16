<script setup lang="ts">
import * as bootstrap from 'bootstrap'; // import statically - don't grab it from a cdn
import $ from 'jquery';
import { ref } from 'vue';
import { ModelType } from '@/enums/modelType';
import { WebServiceModel } from '@/model/webservice';
import { MediapipeModel } from '@/model/mediapipe';
import { useModelStore } from '@/stores/modelStore';
import { urlError } from '@/enums/urlError';

const modelStore = useModelStore();
const showModal = ref(false);

function openModal(): void {
  showModal.value = true;
}

function setModel(model: ModelType): boolean {
  if (model === ModelType.custom) {
    $('#sendAnno').show(0.1);
  } else {
    $('#sendAnno').hide(0.1);
  }

  const btnMediapipe = document.getElementById('btnModelMediapipe') as HTMLInputElement;
  const btnCustom = document.getElementById('btnModelCustom') as HTMLInputElement;
  switch (model) {
    case ModelType.mediapipe: {
      btnMediapipe.checked = true;
      modelStore.model = new MediapipeModel();
      showModal.value = false;
      break;
    }
    case ModelType.custom: {
      btnCustom.checked = true;
      const inputBox = $('#modelurl');
      const url = String(inputBox.val());

      WebServiceModel.verifyUrl(url).then((error) => {
        const errorText = $('#urlErrorText');
        if (error === null) {
          modelStore.model = new WebServiceModel(url);
          showModal.value = false;
          errorText.hide();
          const saveElement = $('#saveNotification')[0];
          const toast = bootstrap.Toast.getOrCreateInstance(saveElement);
          toast.show();
          localStorage.setItem('apiUrl', url);
          const notificationText = $('#saveNotificationText');
          notificationText.text('Webservice url saved!');
          setTimeout(() => {
            toast.hide();
            notificationText.text();
          }, 5000);
        } else {
          // Display error:
          switch (error) {
            case urlError.InvalidUrl: {
              errorText.removeAttr('hidden');
              errorText.text('Please enter a valid URL!');
              break;
            }
            case urlError.Unreachable: {
              errorText.removeAttr('hidden');
              errorText.text("The provided endpoint wasn't reachable!");
              break;
            }
          }
          // shake the input window
          inputBox.addClass('wrongInput');
          setTimeout(function () {
            inputBox.removeClass('wrongInput');
          }, 500);
        }
      });
      break;
    }
    default:
      console.error('No model "' + model + '" found to change to!');
      break;
  }
  return false;
}
</script>

<template>
  <div>
    <span class="nav-link"><i class="bi bi-cpu me-1"></i>Model</span>
    <fieldset class="btn-group" role="group" style="padding: 0.2vw; width: 100%">
      <input
        type="radio"
        class="btn-check"
        name="btnradio"
        id="btnModelMediapipe"
        autocomplete="off"
        @change="setModel(ModelType.mediapipe)"
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
        @change="openModal"
      />
      <label class="btn btn-outline-secondary" for="btnModelCustom"
        >Webservice<br /><small>Online</small></label
      >
    </fieldset>
  </div>

  <BModal v-model="showModal" title="Webservice" :hide-footer="true">
    <p>
      The webservice address will be used to detect a face mesh on selected images. Therefore, the
      images must be transferred to the webservice for processing. The open format allows it to
      create individual webservices by everyone and can be easily swapped.
    </p>
    <div class="alert alert-warning d-flex align-items-center" role="alert">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2"
        viewBox="0 0 16 16"
        aria-label="Warning:"
        style="width: 2vw"
      >
        <path
          d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
        />
      </svg>
      <div>Be aware, that the webservice owner might store your images and annotations!</div>
    </div>
    <hr />
    <h6>API</h6>
    <p>
      The webservice API must provide the following addresses:
      <br /><code>/detect</code><br />
      This call is used to detect a single face on a provided image file inside a POST request.
      <br /><code>/annotations</code><br />
      This call is used to sync the annotations inside a POST request when the user triggers the
      download.
    </p>
    <hr />
    <h6>URL</h6>
    <p>
      Insert the webservice URL in the text field below and submit with hitting the Save button.
    </p>
    <div id="urlErrorText" class="text-danger" hidden></div>
    <label for="modelurl" class="form-label" hidden></label>
    <input
      type="url"
      class="form-control"
      id="modelurl"
      placeholder="https://example.com/model/api"
      required
    />
    <div class="modal-footer">
      <button
        id="btnCancelModal"
        type="button"
        class="btn btn-secondary"
        data-bs-dismiss="modal"
        @click="setModel(ModelType.mediapipe)"
      >
        Cancel
      </button>
      <button
        id="btnSaveCustomModel"
        type="submit"
        class="btn btn-primary"
        @click="setModel(ModelType.custom)"
      >
        Save
      </button>
    </div>
  </BModal>
</template>

<style scoped></style>
