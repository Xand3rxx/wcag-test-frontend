<template>
  <div class="col-xl-12 col-md-12 mb-4">
    <div class="card badge-main-secondary border-0 border-radius-20 h-100 p-3">
      <div class="card-body">
        <div class="row no-gutters align-items-center">
          <div class="col mr-2">
            <h4 class="text-medium box-title-text">Compliance score</h4>
            <p class="ft-sm">
              The compliance score serves as an easily interpretable metric to
              gauge the overall accessibility of the uploaded HTML file.
            </p>
            <h1 class="mb-2 text-bold-2">{{ displayScore }}</h1>
          </div>
          <div class="col-auto">
            <span :class="scoreClass">
              {{ scoreMessage }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from "vue";

export default defineComponent({
  name: "ComplianceScoreCard",
  props: {
    complianceScore: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  setup(props) {
    const displayScore = computed(() => {
      return props.complianceScore ?? 0;
    });

    const scoreClass = computed(() => {
      const score = props.complianceScore ?? 0;
      if (score >= 95) return "text-success";
      if (score >= 70) return "text-warning";
      return "text-danger";
    });

    const scoreMessage = computed(() => {
      const score = props.complianceScore ?? 0;
      if (score >= 95) return "Your site meets accessibility standards";
      return "Websites with a score lower than 95 are at risk of accessibility lawsuits";
    });

    return {
      displayScore,
      scoreClass,
      scoreMessage,
    };
  },
});
</script>
