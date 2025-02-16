import { defineNuxtPlugin } from "#app";
import { useRouter } from "vue-router";

export default defineNuxtPlugin(({ app }) => {
  const router = useRouter();
  router.beforeEach((to, from, next) => {
    if (!to.matched.length) {
      next({ path: "/404" }); // 존재하지 않는 페이지를 /error로 리다이렉트
    } else {
      next();
    }
  });
});
