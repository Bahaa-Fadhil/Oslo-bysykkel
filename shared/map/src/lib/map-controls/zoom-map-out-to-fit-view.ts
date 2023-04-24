import { Control } from 'ol/control';
import type Map from 'ol/Map';

import { fitMapViewToCoordinates } from './fit-map-view-to-coordinates';
import { Coordinate } from 'ol/coordinate';
import { ZOOM_OUT_MAP_BLACK_ICON } from '../../../../assets/src';

type Props = Readonly<{
  map: Map;
  coordinates: number[] | Coordinate[];
  maxZoom?: number;
  minZoom?: number;
  minResolution?: number | undefined;
}>;

/**
 * Fits the {@link Map} view to encompass all stations when the user
 * clicks the button.
 *
 * @param map - Render access to the target {@link map}.
 * @param coordinates - Render access to the {@link coordinates}.
 * @param maxZoom - Map view maximum zoom.
 * @param minZoom - Map view minimum zoom.
 * @returns Control ID.
 */
export function zoomMapOutToFitView({
  coordinates,
  map,
  maxZoom,
  minResolution,
  minZoom,
}: Props): string {
  const element = document.createElement('div');
  const button = document.createElement('button');
  const image = document.createElement('img');

  element.appendChild(button);
  button.appendChild(image);
  button.title = 'Zoom map out to fit the view';
  element.className = 'ol-unselectable ol-control';
  element.style.top = '4.0em';
  element.style.left = '0.5em';
  image.src = ZOOM_OUT_MAP_BLACK_ICON;
  image.style.height = '88%';

  button.addEventListener(
    'click',
    () => {
      map.getView().setMaxZoom(maxZoom ? maxZoom : 28);
      map.getView().setMinZoom(minZoom ? minZoom : 0);
      fitMapViewToCoordinates(map, coordinates, minResolution);
    },
    false
  );

  const control = new Control({
    element,
  });

  // Generate an ID for the control to reference the it later.
  const id = 'map-zoom-control';

  // Set the id to the control.
  control.setProperties({ id });
  // Add the control to the map so it becomes visible to the user.
  map.addControl(control);

  // Return control Id so we can use it later.
  return id;
}
