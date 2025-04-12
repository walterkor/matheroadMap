<template>
  <div class="flex flex-col min-h-screen bg-black">
    <!-- 헤더 -->
    <header class="sticky top-0 z-50 bg-black w-full shadow-md">
      <div class="text-lg font-bold tracking-wide flex items-center space-x-2">
        <span class="text-signature px-4 py-3">MatheroadMap</span>
      </div>
    </header>

    <!-- 메인 컨테이너 -->
    <main class="flex flex-1 flex-col md:flex-row">
      <!-- 사이드바 -->
      <div>
        <aside
          v-if="isSidebarVisible"
          class="flex-col w-full md:w-48 bg-gray-900 text-white px-4 py-6 shadow-lg h-full"
        >
          <ul class="space-y-4">
            <li
              v-for="item in menuItems"
              :key="item.path"
              @click="movePage(item.path)"
              class="flex items-center space-x-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-700 hover:text-white transition-all"
            >
              <span class="text-xl">{{ item.icon }}</span>
              <span class="text-sm font-medium">{{ item.label }}</span>
            </li>
          </ul>
        </aside>
      </div>

      <!-- 콘텐츠 영역 -->
      <section class="flex-1 bg-black text-white overflow-auto">
        <div class="max-w-full mx-auto">
          <!-- Nuxt의 페이지 콘텐츠 -->
          <slot />
        </div>
      </section>
    </main>

    <!-- 푸터 -->
    <footer
      v-if="!isSidebarVisible"
      class="sticky bottom-0 z-50 bg-gray-900 text-white px-6 py-3 border-t border-gray-700"
    >
      <ul class="flex justify-around">
        <li
          v-for="item in menuItems"
          :key="item.path"
          @click="movePage(item.path)"
          class="flex flex-col items-center cursor-pointer hover:text-gray-300 transition"
        >
          <span class="text-xl">{{ item.icon }}</span>
          <span class="text-xs font-medium">{{ item.label }}</span>
        </li>
      </ul>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
// 라우터 객체 생성
const router = useRouter();

// 사이드바 상태 관리
const isSidebarVisible = ref(true);

// 화면 크기 변경 시 사이드바 보이기/숨기기
const handleResize = () => {
  isSidebarVisible.value = window.innerWidth > 768;
};

// 페이지 이동 함수
const movePage = (path: string) => {
  router.push(path);
};

// 메뉴 항목 정의
const menuItems = [
  { label: "리스트", path: "/", icon: "🍲" },
  { label: "글쓰기", path: "/write", icon: "📝" },
  { label: "방명록", path: "/guestbook", icon: "👍" },
  { label: "프로필", path: "/profile", icon: "👤" },
  { label: "유저", path: "/users", icon: "👤" },
];

// 컴포넌트 마운트 시 이벤트 리스너 등록
onMounted(() => {
  handleResize();
  window.addEventListener("resize", handleResize);
});

// 컴포넌트 언마운트 시 이벤트 리스너 해제
onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
});
</script>

<style scoped>
.text-signature {
  color: #38bdf8; /* Tailwind sky-500 */
}
</style>
