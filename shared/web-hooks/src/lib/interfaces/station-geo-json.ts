import type { FeatureGeoJson } from './feature-geo-json';

// -----------------------------------------------------------------------------
// Station as GeoJSON Model
// -----------------------------------------------------------------------------

export type StationGeoJson = Readonly<{
  type: string | 'FeatureCollection';
  features: FeatureGeoJson[];
}>;
