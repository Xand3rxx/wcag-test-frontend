<template>
  <div v-if="issues && issues.length > 0">
    <h5 class="mb-3">{{ issues.length }} failed element(s).</h5>

    <div class="recent-height">
      <div
        class="border-bottom pt-4 pb-3"
        v-for="(detail, index) in issues"
        :key="index"
      >
        <div class="mb-2">
          <span class="badge bg-danger me-2">Issue</span>
          <pre class="ft-sm badge-color-4 d-inline-block mb-0"><code>{{ detail.faulted_html }}</code></pre>
        </div>
        <p class="ft-sm mb-2">
          <span class="fw-bold">Suggestion:</span> {{ detail?.suggested_fix }}
        </p>
        <div>
          <span class="badge bg-success me-2">Fix</span>
          <pre class="ft-sm badge-color-5 d-inline-block mb-0"><code>{{ detail.sample_html }}</code></pre>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <p class="text-muted">No details available for the selected issue.</p>
  </div>
</template>

<script>
import { defineComponent, computed } from "vue";

export default defineComponent({
  name: "IssueDetails",
  props: {
    issueDetails: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  setup(props) {
    const issues = computed(() => props.issueDetails ?? []);

    return {
      issues,
    };
  },
});
</script>
