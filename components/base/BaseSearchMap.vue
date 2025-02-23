<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { Loader } from "@googlemaps/js-api-loader";
import type { SearchResult } from "@/types/MapTypes";

const props = defineProps<{ searchResults: SearchResult[] }>();
const emit = defineEmits(["markerClicked"]);

const map = ref<google.maps.Map | null>(null);
let markers: google.maps.Marker[] = [];

onMounted(async () => {
  const apiKey = useRuntimeConfig().public.googleMapsApiKey;

  const loader = new Loader({
    apiKey,
    version: "weekly",
    libraries: ["places", "marker"],
  });

  await loader.load();

  map.value = new google.maps.Map(
    document.getElementById("map") as HTMLElement,
    {
      center: { lat: 37.5665, lng: 126.978 },
      zoom: 14,
    }
  );

  const updateMarkers = () => {
    markers.forEach((marker) => marker.setMap(null));
    markers = [];

    props.searchResults.forEach((result) => {
      const marker = new google.maps.Marker({
        position: result.location,
        map: map.value,
        title: result.name,
      });

      marker.addListener("click", () => emit("markerClicked", result));
      markers.push(marker);
    });

    if (props.searchResults.length > 0) {
      map.value!.setCenter(props.searchResults[0].location);
    }
  };

  watch(() => props.searchResults, updateMarkers, { deep: true });
});
</script>

<template>
  <div id="map" class="w-full h-[500px] rounded-lg shadow-md border"></div>
</template>
