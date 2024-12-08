<template>
  <div class="mt-3 text-center">
    <div v-if="complianceScore >= 85 && complianceScore < 100">
      <svg
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style="transform: translateY(6px); display: inline-block"
      >
        <path
          d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
          stroke="#23825A"
          stroke-width="1.4"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
        <path
          d="M9 12L11 14L15 10"
          stroke="#23825A"
          stroke-width="1.4"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
      </svg>

      <p class="mt-3 text-success fs-4">Compliant!</p>

      <p class="mt-3">
        Your audit score of {{ complianceScore }} reflects
        strong accessibility from automated checks, but to ensure full
        compliance and reach 100, manual reviews are required for more nuanced
        issues.
      </p>
    </div>

    <div v-else-if="complianceScore === 100">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="55"
        height="55"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#23825A"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path
          d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
          stroke="#23825A"
          stroke-width="1.4"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
        <path
          d="M9 12L11 14L15 10"
          stroke="#23825A"
          stroke-width="1.4"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
      </svg>

      <p class="mt-3 text-success fs-4">Fully Compliant!</p>

      <p class="mt-3">
        Congratulations! Your site has achieved full compliance with
        accessibility standards. Well done!
      </p>
    </div>

    <div v-else>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="55"
        height="55"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#DC3545"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M18 6L6 18M6 6l12 12" />
      </svg>

      <p class="mt-3 text-danger fs-4">Not Compliant!</p>
      <p class="mt-3">
        Your site may be at risk of accessibility lawsuits. It is important to
        address accessibility issues promptly to ensure equal access for all
        users and avoid potential legal challenges.
      </p>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "compliant-summary-component",
  props: {
    complianceScore: Number,
  },
});
</script>
