<template>
  <div class="row">
    <div class="col-lg-6">
      <!-- Compliance Score Card -->
      <ComplianceScoreCard :complianceScore="response.compliance_score" />

      <!-- File upload component -->
      <FileUpload
        @file-uploaded="handleFileUploaded"
        acceptedFileTypes=".html"
      />
    </div>

    <div class="col-lg-6">
      <!-- Accessibility Summary -->
      <AccessibilitySummary
        :original-issues="response.issues"
        @issue-selected="handleSelectedIssue"
        :complianceScore="response.compliance_score"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import ComplianceScoreCard from "@/components/ComplianceScoreCard.vue";
import FileUpload from "@/components/FileUpload.vue";
import AccessibilitySummary from "@/components/AccessibilitySummary.vue";

export default defineComponent({
  name: "HomeView",
  components: { ComplianceScoreCard, FileUpload, AccessibilitySummary },
  setup() {
    const response = ref({ compliance_score: 0, issues: [] });
    const selectedIssueDetails = ref([]);

    const handleFileUploaded = (data) => {
      if (data) {
        response.value = {
          compliance_score: data.compliance_score ?? 0,
          issues: data.issues ?? []
        };
      }
    };

    const handleSelectedIssue = (issueDetails) => {
      selectedIssueDetails.value = issueDetails;
    };

    return {
      handleFileUploaded,
      handleSelectedIssue,
      response,
      selectedIssueDetails,
    };
  },
});
</script>
