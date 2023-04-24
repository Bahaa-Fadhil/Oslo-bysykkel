import { Feature, FeatureCollection } from 'geojson';
import { StationInformation } from '@oslo-bysykkel/shared/web-hooks';

/**
 * Calculates a {@link FeatureCollection} from a {@link StationInformation}.
 *
 * @returns GeoJson object with a collection of all features/ stations.
 */
export function calculateFeaturePointFromSortedData(
  stations: StationInformation[]
): FeatureCollection {
  const features: Feature[] = stations.map((station) => ({
    type: 'Feature',
    id: station.station_id,
    geometry: {
      type: 'Point',
      coordinates: [station.lon, station.lat],
    },
    properties: {
      is_installed: station.is_installed,
      is_renting: station.is_renting,
      num_bikes_available: station.num_bikes_available,
      num_docks_available: station.num_docks_available,
      last_reported: station.last_reported,
      is_returning: station.is_returning,
      station_id: station.station_id,
      name: station.name,
      address: station.address,
      lat: station.lat,
      lon: station.lon,
      capacity: station.capacity,
    },
  }));

  return {
    type: 'FeatureCollection',
    features,
  };
}
