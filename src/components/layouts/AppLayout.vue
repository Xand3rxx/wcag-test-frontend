<template>
  <div class="container-fluid">
    <div class="row">
      <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div class="main-content-dashboard mt-4">
          <div class="row mx-auto" :class="[layoutClass || layoutWidth]">
            <slot></slot>
            <router-view />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "app-layout-component",
  props: {
    layoutClass: String,
  },
  computed: {
    layoutWidth() {
      return this.$route.meta.layoutWidth || "";
    },
  },
});
</script>
