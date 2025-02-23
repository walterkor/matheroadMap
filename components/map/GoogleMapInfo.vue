<template>
  <!-- 지도에 대한 구글 Info -->
  <div class="w-full h-auto pt-2">
    <div
      class="mx-auto bg-white shadow-lg rounded-lg p-6 border border-gray-200"
    >
      <div class="text-gray-700">
        <span class="text-blue-500 text-xl mr-2">🍽️</span>
        <span class="font-semibold">{{ placeInfo.name }}</span>
      </div>
      <!-- 지도 정보 -->
      <div class="text-gray-700">
        <span class="text-blue-500 text-xl">📍</span>
        <span class="font-semibold">{{ placeInfo.address }}</span>
        <!-- 복사 버튼 -->
        <button
          class="px-2 bg-blue-500 text-white py-2 rounded-md font-normal hover:bg-blue-600 transition ml-2"
          @click="copyToClipboard"
        >
          주소 복사
        </button>
      </div>

      <!-- 영업 상태 -->
      <div class="mt-4 flex items-center">
        <div v-if="placeInfo.openStatus">
          <span class="text-green-500 text-xl">🟢</span>
          <span class="ml-2 text-gray-700 font-medium">영업중</span>
        </div>
        <div v-else>
          <span class="text-red-500 text-xl">🔴</span>
          <span class="ml-2 text-gray-700 font-medium">영업종료</span>
        </div>
        <!-- 드롭다운 버튼 -->
        <button
          class="flex items-center justify-between text-gray-700 font-semibold text-lg focus:outline-none"
          @click="isOpen = !isOpen"
        >
          <span :class="isOpen ? 'rotate-180' : ''" class="transition-transform"
            >▼</span
          >
        </button>
      </div>
      <!-- 드롭다운 내용 -->
      <div v-show="isOpen" class="mt-3 border-t pt-3 text-gray-600 text-sm">
        <div
          v-for="(day, index) in placeInfo.openingHours"
          :key="index"
          class="mb-2"
        >
          <span class="font-normal text-xs text-gray-800">{{ day }}</span>
        </div>
      </div>

      <!-- 전화번호 -->
      <div class="mt-3 flex items-center space-x-2">
        <span class="text-gray-500 text-xl">📞</span>
        <a
          href="tel:027490526"
          class="text-blue-500 font-semibold hover:underline"
          >{{ placeInfo.phoneNumber }}</a
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PlaceInfo } from "@/types/MapTypes";
import { ref, defineProps } from "vue";

// prop 선언 PlaceInfo 타입으로 선언
const props = withDefaults(defineProps<{ placeInfo: PlaceInfo }>(), {
  placeInfo: () => ({
    name: "기본 가게",
    address: "기본 주소",
    phoneNumber: "000-0000-0000",
    openingHours: [],
    location: { lat: 0, lng: 0 },
    openStatus: false,
    placeId: "default",
  }),
});

// 드롭다운 상태 관리
const isOpen = ref(false);

//영업시간 데이터
const businessHours = ref({
  월요일: { morning: "오전 11:30 ~ 오후 3:00", evening: "오후 5:30 ~ 10:00" },
  화요일: { morning: "오전 11:30 ~ 오후 3:00", evening: "오후 5:30 ~ 10:00" },
  수요일: { morning: "오전 11:30 ~ 오후 3:00", evening: "오후 5:30 ~ 10:00" },
  목요일: { morning: "오전 11:30 ~ 오후 3:00", evening: "오후 5:30 ~ 10:00" },
  금요일: { morning: "오전 11:30 ~ 오후 3:00", evening: "오후 5:30 ~ 10:00" },
  토요일: { morning: "오전 11:30 ~ 오후 3:00", evening: "오후 5:30 ~ 10:00" },
  일요일: { morning: "오전 11:30 ~ 오후 3:00", evening: "오후 5:30 ~ 10:00" },
});

const copyToClipboard = () => {
  const address = "서울특별시 용산구 한강대로 40가길 6 1층";
  navigator.clipboard.writeText(address).then(() => {
    alert("주소가 복사되었습니다!");
  });
};
</script>

<style></style>
