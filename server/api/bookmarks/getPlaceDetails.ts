import { PlaceInfo } from "@/types/MapTypes";
export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig();
  const apiKey = runtimeConfig.public.googleMapsApiKey;
  const { placeId } = getQuery(event);
  const parameter = [
    "name",
    "formatted_address",
    "formatted_phone_number",
    "opening_hours",
    "place_id",
    "geometry",
  ];
  const parameterString = parameter.join(",");
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=${parameterString}&language=ko&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const location = data.result.geometry.location;

    const openingHours = data.result.opening_hours;
    const result: PlaceInfo = {
      name: data.result.name,
      address: data.result.formatted_address,
      phoneNumber: data.result.formatted_phone_number,
      openingHours: openingHours.weekday_text,
      location: location,
      openStatus: openingHours.open_now,
      placeId: data.result.place_id,
    };
    return result;
  } catch (error) {
    console.error("Google Places API 요청 실패:", error);
    return { error: "API 요청 중 오류 발생" };
  }
});
