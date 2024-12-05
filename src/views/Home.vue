<template>
  <div class="row">
    <div class="col-lg-6">
      <div class="col-xl-12 col-md-12 mb-4">
        <div
          class="card badge-main-secondary border-0 border-radius-20 h-100 p-3"
        >
          <div class="card-body">
            <div class="row no-gutters align-items-center">
              <div class="col mr-2">
                <h4 class="text-medium box-title-text">Compliance score</h4>
                <p class="ft-sm">
                  The compliance score serves as an easily interpretable metric
                  to gauge the overall accessibility of the uploaded HTML file.
                </p>

                <h1 class="mb-2 text-bold-2">
                  {{ response?.compliance_score }}
                </h1>
              </div>
              <div class="col-auto"></div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="card card-body text-center py-5 card-bg-4 border-0 border-rad-10 mb-3"
      >
        <div class="mx-auto">
          <div class="mb-3">
            <img src="images/uploadIcon2.svg" class="img-fluid" />
          </div>
          <h6 class="text-bold">Upload HTML Document</h6>
          <p class="ft-md">Select a HTML file not more that 256KB</p>
          <input
            class="form-control text-center"
            type="file"
            accept=".html"
            name="file"
            :v-model="selectedFile"
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
    </div>

    <div class="col-lg-6">
      <div class="col-xl-12 col-md-12 mb-4">
        <div class="card border-0 border-radius-20 p-lg-4">
          <div class="card-body">
            <h5 class="mb-0">Accessibility Summary</h5>

            <div class="recent-height">
              <div v-if="response?.issues?.length > 0">
                <div
                  class="border-bottom pt-4 pb-3"
                  v-for="(item, index) in response?.issues"
                  :key="index"
                >
                  <h6 class="text-danger">
                    {{ item?.issue }} at line {{ item?.line }}.
                  </h6>
                  <p class="ft-sm badge-color-1 d-inline-block">
                    {{ item?.suggested_fix }}
                  </p>
                </div>
              </div>

              <div class="mx-auto border-bottom pt-4 pb-3" v-else>
                <h4 class="text-center">
                  The accessibility compliance summary will be displayed here
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, computed, ref } from "vue";
import ApiService from "@/helpers/services/ApiService";
import apiRoutes from "@/helpers/services/ApiRoutesService";

export default defineComponent({
  name: "home-view",
  setup() {
    const response = ref({ compliance_score: 0, issues: [], line: 0 });
    const payload = ref({
      selectedFile: "",
      isSubmitting: false,
    });

    const submitButtonDisabled = computed(() => {
      return payload.value.isSubmitting || !payload.value.selectedFile;
    });

    const handleFileChange = (event) => {
      payload.value.selectedFile = event.target.files[0];
    };

    const submit = () => {
      if (!payload.value.selectedFile) {
        return alert("Please select a valid HTML document");
      }

      payload.value.isSubmitting = true;
      payload.value.submitButtonDisabled = true;
      const formData = new FormData();
      formData.append("file", payload.value.selectedFile);

      setTimeout(() => {
        // Make the POST request with FormData
        ApiService.post(apiRoutes.ANALYZE_HTML, formData)
          .then((data) => {
            response.value = data?.data?.data;
            console.log(response.value);

            payload.value.isSubmitting = false;
            payload.value.submitButtonDisabled = false;
          })
          .catch(function (error) {
            console.log(error);
            payload.value.isSubmitting = false;
            payload.value.submitButtonDisabled = false;
          });
      }, 2000);
    };

    onMounted(() => {
      payload.value.isSubmitting = false;
    });

    return {
      handleFileChange,
      submit,
      payload,
      submitButtonDisabled,
      response,
    };
  },
});
</script>
