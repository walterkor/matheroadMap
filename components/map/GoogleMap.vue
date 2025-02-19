<template>
  <div class="w-full h-screen">
    <!-- 검색 입력창 -->
    <div class="p-4">
      <input
        id="search-input"
        v-model="searchQuery"
        class="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        placeholder="장소 검색..."
      />
    </div>
    <!-- 지도 컨테이너 -->
    <div ref="mapDiv" class="w-full h-[50vh]"></div>
  </div>
</template>

<style scoped>
/* Google Maps UI 최적화를 위한 스타일 */
</style>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Loader } from "@googlemaps/js-api-loader";
import type { MarkerInfo } from "@/types/MapTypes";

const mapDiv = ref<HTMLElement | null>(null);
const searchQuery = ref("");
const runtimeConfig = useRuntimeConfig();

const lat = ref<number | null>(null); //위도
const lng = ref<number | null>(null); //경도

let map: google.maps.Map;
let autocomplete: google.maps.places.Autocomplete;

const markers = ref<MarkerInfo[]>([]); // 전체 마커
const bookmarks = ref<MarkerInfo[]>([]); // 북마크 목록
const markerInstance = ref<google.maps.Marker[]>([]); // 지도 마커 인스턴스

const fetchBookMarkers = async () => {
  const response = await fetch("/api/bookmarks");
  const data = await response.json();
  markers.value = data.bookmarks;
  bookmarks.value = markers.value.filter((m: MarkerInfo) => m.isBookmarked);
  markers.value.forEach((marker) => {});
};

const toggleBookmark = async (id: number) => {
  await fetch(`/api/bookmarks/${id}/toggle`, { method: "PUT" });
  const response = await fetch("/api/bookmarks");
  const data = await response.json();
  markers.value = data;
  bookmarks.value = data.filter((m: MarkerInfo) => m.isBookmarked);
};

onMounted(async () => {
  await fetchBookMarkers();

  const loader = new Loader({
    apiKey: runtimeConfig.public.googleMapsApiKey,
    libraries: ["places"],
  });

  const mapOptions = {
    center: { lat: 37.5665, lng: 126.978 }, // 서울 중심 좌표
    zoom: 12,
  };

  await loader.load();

  if (mapDiv.value) {
    map = new google.maps.Map(mapDiv.value, mapOptions);

    // 검색 자동완성 기능
    const input = document.getElementById("search-input") as HTMLInputElement;
    autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      //place.formatted_address; => 주소
      //place.formatted_phone_number; => 전화번호
      //place.place_id => 아이디
      //place.weekday_text[] => 영업시간
      //place.current_opening_hours
      if (place.geometry && place.geometry.location) {
        map.setCenter(place.geometry.location);
        map.setZoom(15);
        new google.maps.Marker({
          position: place.geometry.location,
          map: map,
          title: place.name,
        });
      }
    });
  }
});
</script>
