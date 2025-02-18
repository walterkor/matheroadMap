export interface MapCoordinates {
  lat: number;
  lng: number;
}

export interface MarkerInfo {
  id?: number;
  name: string;
  position: MapCoordinates;
  isBookmarked: boolean;
}
