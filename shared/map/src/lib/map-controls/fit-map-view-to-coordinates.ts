import { Coordinate } from 'ol/coordinate';
import * as olExtent from 'ol/extent';
import type Map from 'ol/Map';
import { transformExtent } from 'ol/proj';

const paddingTop = 150;
const paddingRight = 150;
const paddingBottom = 150;
const paddingLeft = 150;
const duration = 1000;
// The projection for the WGS84 coordinate system.
const WGS84_COORDINATE_SYSTEM_ID = 'EPSG:4326';
// The projection for the web mercator coordinate system.
const WEB_MERCATOR_COORDINATE_SYSTEM_ID = 'EPSG:3857';

/**
 * Fits the {@link Map} view on extent {@link Geodetic2dCoordinates}.
 *
 * @param map - Render access to the target map.
 * @param coordinates - Geodetic 2-D coordinates to fit map view on.
 * @param minResolution - Fit the view on map
 */
export function fitMapViewToCoordinates(
  map: Map,
  coordinates: number[] | Coordinate[],
  minResolution?: number | undefined
): void {
  /* We only fit the view if we have one or more than one coordinate because
   * we can’t fit the view on the empty extent provided as geometry.
   */
  if (coordinates.length >= 1) {
    const boundingExtent = olExtent.boundingExtent(coordinates as Coordinate[]);
    /* Transforms an extent from source projection to
     * provided coordinate projection.
     */
    const transformCoordinatesProjection = transformExtent(
      boundingExtent,
      WGS84_COORDINATE_SYSTEM_ID,
      WEB_MERCATOR_COORDINATE_SYSTEM_ID
    );

    map.getView().fit(transformCoordinatesProjection, {
      // Set the bounding extent padding.
      padding: [paddingTop, paddingRight, paddingBottom, paddingLeft],
      // Animates the target bounding extent in 1 second.
      duration,
      minResolution: coordinates.length === 1 ? minResolution : undefined,
    });
  }
}
