<template>
  <div
    class="flex flex-wrap md:flex-nowrap bg-gradient-to-r from-blue-500 to-purple-600"
  >
    <div class="w-full flex-row md:w-1/2 h-auto p-3 m-3 bg-white/40 rounded-lg">
      <GoogleMap @bookmark-change="handleBookMarkChange" />
    </div>

    <div
      class="w-full flex-row md:w-1/2 min-h-fit p-3 m-3 bg-white/40 rounded-lg"
    >
      <BaseEditor
        :place-info="placeInfo"
        :content="content"
        @text-change="handleTextChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { PlaceInfo } from "@/types/MapTypes";
import GoogleMap from "@/components/map/GoogleMap.vue";
import BaseEditor from "@/components/base/BaseEditor.vue";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

const content = ref("안녕하세요! Quill 에디터를 사용해보세요!");
const placeInfo = ref<PlaceInfo>({
  name: null,
  address: null,
  phoneNumber: null,
  openingHours: null,
  location: null,
  openStatus: null,
  placeId: null,
});

const handleTextChange = (newContent: string) => {
  console.log("텍스트 변경됨:", newContent);
};

const handleBookMarkChange = (newPlace: PlaceInfo) => {
  placeInfo.value = newPlace;
};
</script>
