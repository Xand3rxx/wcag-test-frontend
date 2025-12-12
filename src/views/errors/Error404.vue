<template>
  <div class="error-wrapper">
    <div class="error-container text-center py-5">
      <h1 class="display-1 fw-bold text-danger">404</h1>
      <p class="fs-3 text-muted">Page Not Found</p>
      <p class="lead mb-4">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <router-link to="/" class="btn btn-main btn-lg rounded-pill">
        Return to Home
      </router-link>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Error404",
});
</script>

<style scoped>
.error-wrapper {
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.error-container {
  max-width: 500px;
}
</style>
