<template>
  <div
    class="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
  >
    <a href="#">
      <!-- <img
        class="rounded-t-lg"
        alt=""
        src="../../public//upload/ChIJE1MoawCjfDURPW0KsXGEq90/2bf9922e-f3fb-412d-94ef-032efa29d5da.jpg"
      /> -->
    </a>
    <div class="p-5">
      <a href="#">
        <h5
          class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
          {{ postData.title }}
        </h5>
      </a>
      <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
        {{ formattedKstTime }}
      </p>
      <a
        href="javascript:void(0)"
        class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        @click="openModal"
      >
        바로가기
        <svg
          class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </a>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps } from "vue";
import { computed } from "vue";
import { Post } from "@/types/post";
const props = defineProps<{
  postData: Post;
}>();

const isoTime = props.postData.createdAt;
const formattedKstTime = computed(() => {
  const utcDate = new Date(isoTime);
  const kst = new Date(utcDate.getTime() + 9 * 60 * 60 * 1000);

  const yyyy = kst.getFullYear();
  const mm = (kst.getMonth() + 1).toString().padStart(2, "0");
  const dd = kst.getDate().toString().padStart(2, "0");
  const hh = kst.getHours().toString().padStart(2, "0");
  const mi = kst.getMinutes().toString().padStart(2, "0");

  return `${yyyy}-${mm}-${dd} ${hh}:${mi}`;
});
const emit = defineEmits<{
  (e: "update:isOpen", value: boolean): void;
  (e: "sendPlaceId", value: Post): void;
}>();

const openModal = () => {
  emit("update:isOpen", true);
  emit("sendPlaceId", props.postData);
};
</script>

<style></style>
