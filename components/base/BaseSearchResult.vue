<script setup lang="ts">
import type { SearchResult } from "@/types/MapTypes";

const props = defineProps<{ results: SearchResult[] }>();
</script>

<template>
  <div class="w-full max-w-lg mx-auto mt-4">
    <h3 class="text-xl font-semibold mb-2">🔍 검색 결과</h3>
    <ul class="bg-white border rounded-lg shadow-md">
      <li
        v-for="(result, index) in props.results"
        :key="index"
        class="p-3 border-b last:border-b-0 hover:bg-gray-100 cursor-pointer"
      >
        <strong>{{ result.name }}</strong>
        <p class="text-sm text-gray-600">{{ result.address }}</p>
      </li>
    </ul>
  </div>
</template>
