<template>
  <div class="flex w-full max-w-lg mx-auto mb-4">
    <input
      v-model="searchQuery"
      type="text"
      placeholder="🔍 검색어를 입력하세요"
      class="w-full p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      @keyup.enter="handleSearch"
    />
    <button
      @click="handleSearch"
      class="px-6 bg-blue-500 text-white font-semibold rounded-r-lg hover:bg-blue-600 transition"
    >
      검색
    </button>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineEmits } from "vue";

const searchQuery = ref("");
const emit = defineEmits(["search"]);

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    emit("search", searchQuery.value);
  }
};
</script>
