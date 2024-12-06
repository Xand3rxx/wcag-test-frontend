<template>
  <div>
    <div class="accordion mt-3">
      <div v-for="(issue, key) in issues" :key="key" class="accordion-item">
        <h2 class="accordion-header" :id="'heading-' + key">
          <button
            class="accordion-button"
            type="button"
            :aria-expanded="selectedIssue === key ? true : false"
            :aria-controls="'collapse-' + key"
            @click="toggleAccordion(key)"
          >
            <h6 class="text-danger">{{ issue?.issue }} at {{ issue?.line }}</h6>
          </button>
        </h2>
        <div
          :id="'collapse-' + key"
          class="accordion-collapse collapse"
          :class="{ show: selectedIssue === key }"
          :aria-labelledby="'heading-' + key"
        >
          <div class="accordion-body">
            <IssueDetails :issue-details="issue.details" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import IssueDetails from "@/components/issues/IssueDetails.vue";

export default defineComponent({
  name: "major-issues-component",
  components: {
    IssueDetails,
  },
  props: {
    issues: {
      type: Array,
      required: true,
    },
  },
  setup() {
    const selectedIssue = ref(null);

    const toggleAccordion = (key) => {
      // If the same issue is clicked again, close it. Otherwise, open the new issue.
      selectedIssue.value = selectedIssue.value === key ? null : key;
    };

    return {
      selectedIssue,
      toggleAccordion,
    };
  },
});
</script>

<style scoped>
.accordion-button:not(.collapsed) {
  background-color: #f8f9fa;
}
</style>
