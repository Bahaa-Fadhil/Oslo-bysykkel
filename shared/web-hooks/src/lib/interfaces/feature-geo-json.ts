// -----------------------------------------------------------------------------
// Feature as GeoJSON Model
// -----------------------------------------------------------------------------

export type FeatureGeoJson = Readonly<{
  type: string;
  id: string;
  geometry: {
    type: string;
    coordinates: [number, number];
  };
  properties: {
    station_id: string;
    name: string;
    address: string;
    lat: number;
    lon: number;
    capacity: number;
    is_installed?: number | undefined;
    is_renting?: number | undefined;
    num_bikes_available?: number | undefined;
    num_docks_available?: number | undefined;
    last_reported?: number | undefined;
    is_returning?: number | undefined;
  };
}>;
