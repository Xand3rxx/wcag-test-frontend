<template>
  <div
    class="card card-body text-center py-5 card-bg-4 border-0 border-rad-10 mb-3"
  >
    <div class="mx-auto">
      <div class="mb-3">
        <img src="/images/uploadIcon2.svg" alt="Upload icon" class="img-fluid" />
      </div>
      <p class="custom-h6">Upload HTML Document</p>
      <p class="ft-md">Select an HTML file not more than 256KB</p>
      <input
        class="form-control text-center"
        type="file"
        aria-label="File input"
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
        <span class="indicator-progress" v-if="isSubmitting">
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
  name: "FileUpload",
  props: {
    acceptedFileTypes: {
      type: [String, Array],
      required: false,
      default: ".html",
    },
  },
  emits: ["file-uploaded"],
  setup(props, { emit }) {
    const selectedFile = ref(null);
    const isSubmitting = ref(false);

    // Computed property to manage the submit button state
    const submitButtonDisabled = computed(() => {
      return isSubmitting.value || !selectedFile.value;
    });

    // Computed to normalize accepted file types
    const normalizedAcceptTypes = computed(() => {
      if (Array.isArray(props.acceptedFileTypes)) {
        return props.acceptedFileTypes.join(",");
      }
      return props.acceptedFileTypes;
    });

    const resetForm = () => {
      isSubmitting.value = false;
    };

    // Handle file change
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file && file.size > 256 * 1024) {
        alert("File size must not exceed 256KB");
        event.target.value = "";
        selectedFile.value = null;
        return;
      }
      selectedFile.value = file;
    };

    // Submit function to handle API call
    const submit = async () => {
      if (!selectedFile.value) {
        alert("Please select a valid HTML document");
        return;
      }

      isSubmitting.value = true;

      const formData = new FormData();
      formData.append("file", selectedFile.value);

      try {
        const response = await ApiService.post(apiRoutes.ANALYZE_HTML, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        emit("file-uploaded", response?.data?.data);
      } catch (error) {
        console.error("Upload error:", error);
        alert("There was an error while uploading the file. Please try again.");
      } finally {
        resetForm();
      }
    };

    return {
      handleFileChange,
      submit,
      isSubmitting,
      submitButtonDisabled,
      acceptedFileTypes: normalizedAcceptTypes,
    };
  },
});
</script>
