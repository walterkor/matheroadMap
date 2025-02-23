export interface MapCoordinates {
  lat: number;
  lng: number;
}

export interface MarkerInfo {
  id?: number;
  name: string;
  position: MapCoordinates;
  isBookmarked: boolean;
  placeId: string;
}

export interface SearchResult {
  name: string;
  address: string;
  location: MapCoordinates;
}

export interface PlaceInfo {
  name: string | null;
  address: string | null;
  phoneNumber: string | null;
  openingHours: Array[] | null;
  location: MapCoordinates | null;
  openStatus: boolean | null;
  placeId: string | null;
}
