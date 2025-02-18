<script setup lang="ts">
import type { MarkerInfo } from "@/types/MapTypes";

const props = defineProps<{ bookmarks: MarkerInfo[] }>();
const emit = defineEmits(["removeBookmark"]);

const remove = (id: number) => {
  emit("removeBookmark", id);
};
</script>

<template>
  <div class="bookmark-list">
    <h3>🍴 북마크 리스트</h3>
    <ul>
      <li v-for="bookmark in bookmarks" :key="bookmark.id">
        {{ bookmark.name }}
        <button @click="remove(bookmark.id!)">❌ 삭제</button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.bookmark-list {
  margin-top: 1rem;
  padding: 1rem;
  border: 1px solid #ccc;
}
ul {
  list-style: none;
}
li {
  margin: 0.5rem 0;
}
button {
  margin-left: 1rem;
  color: red;
}
</style>
