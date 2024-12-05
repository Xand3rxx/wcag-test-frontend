import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/",
      component: () => import("@/components/layouts/AppLayout.vue"),
      children: [
        {
          path: "/",
          name: "home",
          component: () => import("@/views/Home.vue"),
        },
      ],
    },
    {
      path: "/404",
      name: "404",
      component: () => import("@/views/errors/Error404.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      component: () => import("@/views/errors/Error404.vue"),
    },
  ],
});

export default router;
