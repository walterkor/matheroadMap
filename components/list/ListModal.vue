\
<template>
  <div>
    <!-- Modal -->
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div
        class="bg-white dark:bg-gray-700 rounded-lg shadow-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 relative"
      >
        <!-- Close Button -->
        <button
          @click="emitClose"
          class="absolute top-4 right-4 text-gray-400 hover:text-gray-900 dark:hover:text-white"
        >
          <svg
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <!-- Modal Title -->
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          {{ modalPostData.title }}
        </h3>

        <!-- Modal content -->
        <div class="space-y-4">
          <div
            class="text-base text-gray-500 dark:text-gray-400 max-h-[500px] overflow-y-auto pr-2"
            v-html="modalPostData.content"
          ></div>
        </div>

        <!-- Footer -->
        <div class="mt-6 flex justify-end gap-3">
          <button
            @click="emitClose"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { defineProps, defineEmits } from "vue";
import { Post } from "@/types/post";
const props = defineProps<{
  modalPostData: Post;
  isOpen: boolean;
}>();

const emit = defineEmits<{
  (e: "update:isOpen", value: boolean): void;
}>();

const emitOpen = () => emit("update:isOpen", true);
const emitClose = () => emit("update:isOpen", false);
</script>

<style scoped>
img {
  max-width: 100%;
  height: auto;
}
</style>
