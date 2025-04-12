<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-black"
  >
    <ListGoogleMap />
    <ListModal v-model:is-open="modalOpen" :modalPostData="modalPost" />
    <div class="flex flex-wrap justify-center gap-4 max-w-7xl">
      <ListCard
        v-for="post in CardPost"
        :key="post.id"
        :postData="post"
        v-model:is-open="modalOpen"
        @sendPlaceId="handlePost"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import ListCard from "@/components/list/ListCard.vue";
import ListGoogleMap from "@/components/list/ListGoogleMap.vue";
import ListModal from "@/components/list/ListModal.vue";
import { PlaceInfo } from "@/types/MapTypes";
import { Post } from "@/types/post";
import { onMounted, ref } from "vue";
const modalOpen = ref(false);

const CardPost = ref<Post[]>([]);
//ListCard data init function
const init = async () => {
  try {
    const response = await $fetch<{
      success: boolean;
      posts: Post[];
    }>("/api/list", {
      method: "GET",
    });

    if (response.success) {
      CardPost.value = response.posts;
    } else {
      alert("데이터를 가져오지 못했습니다.");
    }
  } catch (error) {
    alert(error);
  }
};

//ModalPost
const modalPost = ref<Post>();
const handlePost = (post: Post) => {
  modalPost.value = post;
};

onMounted(() => {
  init();
});
</script>
