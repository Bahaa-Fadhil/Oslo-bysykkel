import 'ol/ol.css';

import Map from 'ol/Map';
import View from 'ol/View';
import OSM from 'ol/source/OSM.js';
import {
  Attribution,
  defaults,
  FullScreen,
  Rotate,
  ScaleLine,
} from 'ol/control';
import { memo, useEffect, useMemo, useRef, useState } from 'react';
import TileLayer from 'ol/layer/Tile';
import { calculateFeaturePointFromSortedData } from '@oslo-bysykkel/shared/utils/map-utils';
import {
  StationGeoJson,
  StationsInformation,
} from '@oslo-bysykkel/shared/web-hooks';
import { addVectorLayer } from './map-layers';
import { fitMapViewToCoordinates, zoomMapOutToFitView } from './map-controls';
import { pointerMoveEvent } from './map-events';
import { addHoverInteraction } from './map-interactions';

type Props = Readonly<{
  stationData: StationsInformation;
}>;

export const InteractiveMap = memo(({ stationData }: Props): JSX.Element => {
  const mapTargetElement = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<Map>();

  useEffect(() => {
    // Create OpenLayers map so we can display it to the user.
    const InitializeMap = new Map({
      // The collection of layers associated with this map.
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      /* The map's view allows to specify the center,
       * zoom, resolution, and rotation of the map.
       */
      view: new View({
        // The map view projection.
        projection: 'EPSG:3857',
        center: [0, 0],
        zoom: 0,
        minZoom: 0,
        maxZoom: 28,
      }),
      /* The map's default controls is a visible widget with a DOM
       * element in a fixed position on the map.
       */
      controls: defaults({ attribution: false }).extend([
        new Attribution({
          collapsed: true,
          collapsible: true,
        }),
        // Add a fullscreen button control to the map.
        new FullScreen(),
        // Add scale line control to the map.
        new ScaleLine(),
        // Add a reset rotation button control to the map.
        new Rotate(),
      ]),
    });

    // Set the Initialized map to the map target element.
    InitializeMap.setTarget(mapTargetElement.current || '');
    // Set the current map, so we can continue working with it.
    setMap(InitializeMap);

    /* We set map target to "undefined", an empty string to represent a
     * nonexistent HTML element ID, when the React component is unmounted.
     * This prevents multiple maps being added to the map container on a
     * re-render.
     */
    return () => InitializeMap.setTarget('');
  }, []);

  /* Returns an array of coordinates for each station
   * in the provided station data object.
   */
  const sitesCoordinates = useMemo(() => {
    if (!stationData) return [];

    return stationData.map((coord) => [coord.lon, coord.lat]);
  }, [stationData]);

  useEffect(() => {
    if (!map || !stationData) return;

    // Generate a GeoJSON data format from the sorted data.
    const featurePoint = calculateFeaturePointFromSortedData(stationData);

    // Add vector layer with provided station data to the map.
    map.addLayer(addVectorLayer({ source: featurePoint as StationGeoJson }));
  }, [map, stationData]);

  useEffect(() => {
    if (!map) return;
    /* We fit the map view to encompass all sites to let the user see
     * them all without zooming or scrolling.
     */
    fitMapViewToCoordinates(map, sitesCoordinates, 20);
  }, [map, sitesCoordinates]);

  useEffect(() => {
    if (!map) return;
    /* Fits the map view to encompass all sites when the user clicks the
     * the zoom out button.
     */
    zoomMapOutToFitView({
      map,
      coordinates: sitesCoordinates,
      maxZoom: 28,
      minZoom: 0,
      minResolution: 20,
    });
    /* Indicates the pointer cursor when the mouse
     * moves over the map feature that is clickable.
     */
    pointerMoveEvent(map);
  }, [map, sitesCoordinates]);

  useEffect(() => {
    if (!map) return;
    /* Add hovers over the station on the map when the user hovers
     * over the station add display station info.
     */
    addHoverInteraction({ map });
  }, [map]);

  return (
    <div
      ref={mapTargetElement}
      className="map"
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
      }}
    ></div>
  );
});

export default InteractiveMap;
