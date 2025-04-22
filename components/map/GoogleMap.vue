<template>
  <div class="w-full h-[90vh]">
    <!-- 검색 입력창 -->
    <div class="pt-3 pb-3">
      <input
        id="search-input"
        v-model="searchQuery"
        class="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        placeholder="장소 검색..."
      />
    </div>
    <!-- 지도 컨테이너 -->
    <div ref="mapDiv" class="w-full h-[45vh]"></div>

    <!-- 지도에 대한 구글 Info -->
    <GoogleMapInfo :placeInfo="place" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { MarkerInfo, PlaceInfo } from "@/types/MapTypes";
import GoogleMapInfo from "./GoogleMapInfo.vue";
import { useFetch } from "nuxt/app";
import { useApi } from "@/composables/useApi";

const mapDiv = ref<HTMLElement | null>(null);
const searchQuery = ref("");
const runtimeConfig = useRuntimeConfig();

let map: google.maps.Map | null;
let autocomplete: google.maps.places.Autocomplete;
let loader: any;

// Emits 정의
const emit = defineEmits(["bookmark-change"]);

const markers = ref<MarkerInfo[]>([]);
const bookmarks = ref<MarkerInfo[]>([]);

const place = ref<PlaceInfo>({
  name: "",
  address: "",
  phoneNumber: "",
  openingHours: null,
  location: null,
  openStatus: false,
  placeId: null,
});

const fetchPlace = async (searchResult: PlaceInfo) => {
  place.value = searchResult;
  const placeId = place.value.placeId;
  if (placeId) {
    emit("bookmark-change", place.value);
  }
};

const fetchBookMarkers = async () => {
  const response = await fetch("/api/bookmarks");
  const data = await response.json();
  markers.value = data.bookmarks;
  bookmarks.value = markers.value.filter((m: MarkerInfo) => m.isBookmarked);

  markers.value.forEach((marker) => {
    const markerElement = new google.maps.marker.AdvancedMarkerElement({
      map: map,
      position: marker.position,
    });

    let placeId = marker.placeId;

    markerElement.addListener("click", () => {
      toggleBookmark(placeId);
    });
  });
};

const toggleBookmark = async (placeId: string) => {
  if (!placeId) {
    alert("해당 값이 placeId값이 잘못되었습니다.");
    return;
  }

  const { data, error } = useFetch(`/api/bookmarks/getPlaceDetails`, {
    query: { placeId },
  });

  const result = data.value as PlaceInfo;

  if (error.value) {
    console.error("API 호출 중 오류 발생:", error.value);
    return;
  }

  if (result) {
    fetchPlace(result);
  } else {
    console.warn("데이터를 가져오지 못함");
  }
};

const init = async () => {
  const googlePkg = await import("@googlemaps/js-api-loader");
  const Loader = googlePkg.Loader;

  loader = new Loader({
    apiKey: runtimeConfig.public.googleMapsApiKey,
    libraries: ["places", "marker"],
  });

  await loader.load();

  if (mapDiv.value) {
    map = new google.maps.Map(mapDiv.value, {
      center: { lat: 37.5665, lng: 126.978 },
      zoom: 12,
      mapId: "4504f8b37365c3d0",
    });

    const input = document.getElementById("search-input") as HTMLInputElement;
    autocomplete = new google.maps.places.Autocomplete(input);

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      const result: PlaceInfo = {
        name: place.name,
        address: place.formatted_address,
        phoneNumber: place.formatted_phone_number,
        location: {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        },
        openingHours: place.opening_hours?.weekday_text,
        openStatus: place.opening_hours?.isOpen() ?? false,
        placeId: place.place_id,
      };

      fetchPlace(result);

      if (place.geometry && place.geometry.location) {
        map.setCenter(place.geometry.location);
        map.setZoom(15);
        const markerElement = new google.maps.Marker({
          position: place.geometry.location,
          map: map,
          title: place.name,
        });

        let placeId = place.place_id;
        markerElement.addListener("click", () => {
          toggleBookmark(placeId);
        });
      }
    });
  }

  await fetchBookMarkers();
};

onMounted(async () => {
  if (process.client) {
    await init();
  }
});
</script>
