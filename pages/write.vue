<template>
  <div
    class="flex flex-wrap md:flex-nowrap bg-gradient-to-r from-blue-500 to-purple-600"
  >
    <div class="w-full flex-row md:w-1/2 h-auto p-3 m-3 bg-white/40 rounded-lg">
      <GoogleMap />
    </div>

    <div class="w-full md:w-1/2">
      <div>
        <span>1. input 명령어에 입력했을때 해당 인포가 나와야함 </span>
      </div>
      <div>
        <span> 2. 북마크를 클릭했을때 해당 인포가 나와야함 </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { MarkerInfo } from "@/types/MapTypes";
import GoogleMap from "@/components/map/GoogleMap.vue";
</script>
