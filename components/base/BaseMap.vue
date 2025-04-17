<script setup lang="ts">
import { onMounted, ref, defineEmits, defineProps } from "vue";
import type { MarkerInfo } from "@/types/MapTypes";

const { Loader } = await import("@googlemaps/js-api-loader");
const props = defineProps<{ markers: MarkerInfo[] }>();
const emit = defineEmits(["toggleBookmark"]);

const map = ref<google.maps.Map | null>(null);

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

  props.markers.forEach((marker) => {
    const markerElement = new google.maps.marker.AdvancedMarkerElement({
      map: map.value!,
      position: marker.position,
      title: marker.name,
    });

    markerElement.addListener("click", () => {
      emit("toggleBookmark", marker.id);
    });
  });
});
</script>

<template>
  <div id="map" style="width: 100%; height: 500px"></div>
</template>
