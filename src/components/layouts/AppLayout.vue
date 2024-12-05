<template>
  <nav
    class="navbar navbar-expand-lg navbar-light bg-white sticky-top shadow-sm"
  >
    <div class="container">
      <a class="navbar-brand" href="#">
        <img
          src="/images/logo.svg"
          class="img-fluid"
          alt="logo"
          style="height: 30px"
        />
      </a>

      <h3 class="text-bold">WCAG Analyzer</h3>
    </div>
  </nav>

  <main class="container my-5">
    <div class="mx-auto">
      <slot></slot>
      <router-view />
    </div>
  </main>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "app-layout-component",
  props: {
    layoutClass: String,
  },
});
</script>
