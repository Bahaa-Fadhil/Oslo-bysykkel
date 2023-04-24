import type { Color } from 'ol/color';
import type { ColorLike } from 'ol/colorlike';
import { Stroke } from 'ol/style';
import { Circle, Fill, Style } from 'ol/style';
import type Feature from 'ol/Feature';
import type { Geometry } from 'ol/geom';

let availableBike: number;

type circleOptions = Readonly<{
  radius?: number | undefined;
  scale?: number | undefined;
  rotation?: number | undefined;
  displacement?: number[] | undefined;
  strokeColor?: Color | ColorLike | undefined;
  strokeWidth?: number | undefined;
}>;

/**
 * A style function that takes options and returns a style of
 * highlighted transparent colored circle.
 *
 * @param circleOptions - OpenLayers circle options.
 * @returns Openlayers circle style.
 */
export const circleStyle = (
  feature: Feature<Geometry>,
  circleOptions?: circleOptions
): Style => {
  if (feature.get('features') === undefined) {
    availableBike = feature.get('num_bikes_available');
  }

  return new Style({
    image: new Circle({
      radius: circleOptions?.radius || 5,
      displacement: circleOptions?.displacement
        ? circleOptions.displacement
        : [0, 0],
      fill: new Fill({
        color: availableBike === 0 ? '#5c5b5b' : '#005fc9',
      }),
      stroke: new Stroke({
        color: circleOptions?.strokeColor
          ? circleOptions.strokeColor
          : availableBike === 0
          ? '#5c5b5b'
          : '#005fc9',
        width: circleOptions?.strokeWidth
          ? circleOptions.strokeWidth
          : undefined,
      }),
    }),
  });
};
