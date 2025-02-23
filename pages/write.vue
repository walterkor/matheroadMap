<template>
  <div
    class="flex flex-wrap md:flex-nowrap bg-gradient-to-r from-blue-500 to-purple-600"
  >
    <div class="w-full flex-row md:w-1/2 h-auto p-3 m-3 bg-white/40 rounded-lg">
      <GoogleMap />
    </div>

    <div class="w-full md:w-1/2">
      <BaseEditor />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { MarkerInfo } from "@/types/MapTypes";
import GoogleMap from "@/components/map/GoogleMap.vue";
import BaseEditor from "@/components/base/BaseEditor.vue";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
</script>
