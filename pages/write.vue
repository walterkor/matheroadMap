<template>
  <div>
    <h1>📍 맛집 북마크 지도</h1>
    <BaseMap :markers="markers" @toggleBookmark="toggleBookmark" />
    <BookmarkList :bookmarks="bookmarks" @removeBookmark="removeBookmark" />
    <!-- <BaseMap :markers="markers" />
    <BookmarkList :bookmarks="bookmarks" /> -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import BaseMap from "@/components/base/BaseMap.vue";
import BookmarkList from "@/components/BookmarkList.vue";
import type { MarkerInfo } from "@/types/MapTypes";

const markers = ref<MarkerInfo[]>([]);
const bookmarks = ref<MarkerInfo[]>([]);

onMounted(async () => {
  const response = await fetch("/api/bookmarks");
  const data = await response.json();
  markers.value = data.bookmarks;
  bookmarks.value = markers.value.filter((m: MarkerInfo) => m.isBookmarked);
});

const toggleBookmark = async (id: number) => {
  await fetch(`/api/bookmarks/${id}/toggle`, { method: "PUT" });
  const response = await fetch("/api/bookmarks");
  const data = await response.json();
  markers.value = data;
  bookmarks.value = data.filter((m: MarkerInfo) => m.isBookmarked);
};

const removeBookmark = async (id: number) => {
  await fetch(`/api/bookmarks/${id}`, { method: "DELETE" });
  const response = await fetch("/api/bookmarks");
  const data = await response.json();
  markers.value = data;
  bookmarks.value = data.filter((m: MarkerInfo) => m.isBookmarked);
};
</script>
