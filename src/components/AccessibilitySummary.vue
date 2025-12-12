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

      <div v-else-if="issues.length > 0">
        <CompliantSummary :complianceScore="complianceScore" />

        <h5 class="mb-3">{{ issues.length }} Issues Found</h5>
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
  name: "AccessibilitySummary",
  components: {
    MajorIssues,
    CompliantSummary,
  },
  props: {
    originalIssues: {
      type: [Array, Object],
      default: () => [],
    },
    complianceScore: {
      type: Number,
      default: 0,
    },
  },
  emits: ["issue-selected"],
  setup(props, { emit }) {
    const issues = ref([]);
    const loading = ref(false);

    // Helper to normalize issues from different formats
    const normalizeIssues = (rawIssues) => {
      if (Array.isArray(rawIssues)) {
        return rawIssues;
      }
      if (rawIssues && typeof rawIssues === "object") {
        return Object.values(rawIssues);
      }
      return [];
    };

    // Watch for changes in originalIssues and update the issues array
    watch(
      () => props.originalIssues,
      (newIssues) => {
        const normalizedIssues = normalizeIssues(newIssues);
        
        if (normalizedIssues.length > 0) {
          loading.value = true;
          
          // Simulate processing delay
          setTimeout(() => {
            issues.value = normalizedIssues;
            loading.value = false;
          }, 500);
        } else {
          issues.value = [];
        }
      },
      { immediate: true, deep: true }
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
