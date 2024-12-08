<template>
  <div class="card border-0 border-radius-20 p-lg-4">
    <div class="card-body">
      <h5 class="mb-0">Accessibility Summary</h5>

      <div v-if="loading">
        <h3 class="mt-5 text-center">
          Processing file content...
          <span
            class="spinner-border spinner-border-sm align-middle ms-2"
          ></span>
        </h3>
      </div>

      <div v-else-if="issues?.length > 0">
        <CompliantSummary :complianceScore="complianceScore" />

        <h5 class="mb-3">{{ issues?.length }} Issues Found</h5>
        <MajorIssues
          :issues="issues"
          @issue-selected="setSelectedIssueDetails"
        />
      </div>

      <div v-else class="mx-auto border-bottom pt-4 pb-3">
        <h5 class="text-center mt-5">
          The accessibility compliance summary will be displayed here.
        </h5>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, watch } from "vue";
import MajorIssues from "@/components/issues/MajorIssues.vue";
import CompliantSummary from "@/components/issues/CompliantSummary.vue";

export default defineComponent({
  name: "accessibility-summary-component",
  components: {
    MajorIssues,
    CompliantSummary,
  },
  props: {
    originalIssues: Array,
    complianceScore: Number,
  },
  setup(props, { emit }) {
    const issues = ref(
      Array.isArray(props.originalIssues) ? props.originalIssues : []
    );
    const loading = ref(false);

    // Watch for changes in originalIssues and update the issues array
    watch(
      () => props.originalIssues,
      (newIssues) => {
        let issuesArray = Array.isArray(newIssues) ? newIssues : [];

        if (
          newIssues &&
          typeof newIssues === "object" &&
          !Array.isArray(newIssues)
        ) {
          issuesArray = Array.isArray(newIssues)
            ? newIssues
            : Object.values(newIssues);
        }

        if (issuesArray.length > 0) {
          issues.value = issuesArray;
          loading.value = true;

          setTimeout(() => {
            loading.value = false;
          }, 1000);
        }
      },
      { immediate: true }
    );

    // Function to handle when an issue is selected
    const setSelectedIssueDetails = (issueDetails) => {
      emit("issue-selected", issueDetails);
    };

    return {
      issues,
      loading,
      setSelectedIssueDetails,
    };
  },
});
</script>
