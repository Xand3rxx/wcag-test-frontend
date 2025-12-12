<template>
  <nav
    class="navbar navbar-expand-lg navbar-light bg-white sticky-top shadow-sm"
  >
    <div class="container">
      <a class="navbar-brand" href="/" aria-label="WCAG Analyzer Home">
        <img
          src="/images/logo.svg"
          class="img-fluid"
          alt="WCAG Analyzer Logo"
          style="height: 30px"
        />
      </a>

      <h1 class="text-bold mb-0 h3">WCAG Analyzer</h1>
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
  name: "AppLayout",
  props: {
    layoutClass: {
      type: String,
      default: "",
    },
  },
});
</script>
