<template>
  <div v-if="issues && issues.length > 0">
    <h5 class="mb-3">{{ issues.length }} failed element(s).</h5>

    <div class="recent-height">
      <div
        class="border-bottom pt-4 pb-3"
        v-for="(detail, index) in issues"
        :key="index"
      >
      <pre
          class="ft-sm badge-color-4 d-inline-block"
        ><code>{{ detail.faulted_html }}</code></pre>
        <br />
        <p class="ft-sm d-inline-block">
          <span class="fw-bold">Suggestion:</span> {{ detail?.suggested_fix }}
        </p>
        <br />
        <pre
          class="ft-sm badge-color-5 d-inline-block"
        ><code>{{ detail.sample_html }}</code></pre>
      </div>
    </div>
  </div>
  <div v-else>
    <p>No details available for the selected issue.</p>
  </div>
</template>

<script>
import { defineComponent, computed } from "vue";

export default defineComponent({
  name: "issue-details-component",
  props: {
    issueDetails: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const issues = computed(() => props.issueDetails);

    return {
      issues,
    };
  },
});
</script>
