<template>
  <div
    class="card card-body text-center py-5 card-bg-4 border-0 border-rad-10 mb-3"
  >
    <div class="mx-auto">
      <div class="mb-3">
        <img src="images/uploadIcon2.svg" class="img-fluid" />
      </div>
      <h6 class="text-bold">Upload HTML Document</h6>
      <p class="ft-md">Select an HTML file not more than 256KB</p>
      <input
        class="form-control text-center"
        type="file"
        :accept="acceptedFileTypes"
        name="file"
        id="file-input"
        @change="handleFileChange"
      />
      <button
        @click.prevent="submit"
        :disabled="submitButtonDisabled"
        class="btn btn-size btn-main btn-hover-effect-1 rounded-pill make-text-bold w-100 mt-3"
      >
        <span class="indicator-progress" v-if="payload.isSubmitting">
          Please wait...
          <span
            class="spinner-border spinner-border-sm align-middle ms-2"
          ></span>
        </span>

        <span v-else class="indicator-label">Analyze File</span>
      </button>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from "vue";
import ApiService from "@/helpers/services/ApiService";
import apiRoutes from "@/helpers/services/ApiRoutesService";

export default defineComponent({
  name: "file-upload-component",
  props: {
    acceptedFileTypes: {
      type: String,
      required: false,
      default: ".html",
    },
  },
  setup(_, { emit }) {
    const payload = ref({
      selectedFile: null,
      isSubmitting: false,
    });

    // Computed property to manage the submit button state
    const submitButtonDisabled = computed(() => {
      return payload.value.isSubmitting || !payload.value.selectedFile;
    });

    const defaultPayload = () => {
      payload.value.selectedFile = null;
      payload.value.isSubmitting = false;
      submitButtonDisabled.value = false;
      document.getElementById('file-input').value = '';
    };

    // Handle file change
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file && file.size > 256 * 1024) {
        alert("File size must not exceed 256KB");
        return;
      }
      payload.value.selectedFile = file;
    };

    // Submit function to handle API call
    const submit = async () => {
      if (!payload.value.selectedFile) {
        return alert("Please select a valid HTML document");
      }

      // Set submitting state to true when submission begins
      payload.value.isSubmitting = true;

      // Prepare the form data
      const formData = new FormData();
      formData.append("file", payload.value.selectedFile);

      // Make the POST request with FormData
      setTimeout(() => {
        ApiService.post(apiRoutes.ANALYZE_HTML, formData)
          .then((data) => {
            emit("file-uploaded", data?.data?.data);
            defaultPayload();
          })
          .catch(function (error) {
            console.log(error);
            alert("There was an error while uploading the file.");
            defaultPayload();
          });
      }, 1000);
    };

    return {
      handleFileChange,
      submit,
      payload,
      submitButtonDisabled,
    };
  },
});
</script>
