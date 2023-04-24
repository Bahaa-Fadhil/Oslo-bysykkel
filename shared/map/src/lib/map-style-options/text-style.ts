import type { Color } from 'ol/color';
import type { ColorLike } from 'ol/colorlike';
import type Feature from 'ol/Feature';
import type { Geometry } from 'ol/geom';
import { Fill, Stroke, Style, Text } from 'ol/style';
import type { TextJustify, TextPlacement } from 'ol/style/Text';

let availableBike: string, availableDocks: string, name: string;

type textOptions = Readonly<{
  fontSize?: number;
  scale?: number;
  textAlign?: string | CanvasTextAlign;
  justify?: string | TextJustify;
  textBaseline?: string | CanvasTextBaseline;
  placement?: string | TextPlacement;
  offsetX?: number;
  offsetY?: number;
  padding?: number[];
  textColor?: Color | ColorLike | string;
  backgroundFillColor?: Color | ColorLike | string;
  backgroundStrokeColor?: Color | ColorLike | string;
  StrockWidth?: number;
  overflow?: boolean;
  showSiteName?: boolean;
  showLastUpdate?: boolean;
}>;

/**
 * A text style function that takes feature, text options
 * and returns openlayers text style.
 *
 * @param feature - Expects feature.
 * @param options - OpenLayers text style options.
 * @returns Openlayers text style.
 */
export const textStyle = (
  feature: Feature<Geometry>,
  textOptions?: textOptions
): Style => {
  // If the feature is undefined then return feature name.
  if (feature.get('features') === undefined) {
    name = feature.get('name');
    availableBike = feature.get('num_bikes_available');
    availableDocks = feature.get('num_docks_available');
  }
  // Display site name.
  const showStationInfo = `${
    textOptions?.showSiteName
      ? `${name}\nLedige stative: ${availableBike}\nTilgjengelig sykkler: ${availableDocks}`
      : ''
  }`;

  const fontStyle =
    textOptions && textOptions.fontSize
      ? `${textOptions.fontSize}px normal sans-serif`
      : `14px normal sans-serif`;

  return new Style({
    text: new Text({
      text: `${showStationInfo}`,
      font: fontStyle ? fontStyle : '',
      scale: textOptions?.scale ? textOptions?.scale : undefined,
      textAlign: (textOptions?.textAlign as CanvasTextAlign)
        ? (textOptions?.textAlign as CanvasTextAlign)
        : 'left',
      justify: (textOptions?.justify as TextJustify)
        ? (textOptions?.justify as TextJustify)
        : 'left',
      textBaseline: (textOptions?.justify as CanvasTextBaseline)
        ? (textOptions?.justify as CanvasTextBaseline)
        : 'middle',
      placement: (textOptions?.placement as TextPlacement)
        ? (textOptions?.placement as TextPlacement)
        : 'point',
      offsetX: textOptions?.offsetX ? textOptions?.offsetX : 0,
      offsetY: textOptions?.offsetY ? textOptions?.offsetY : 40,
      padding: textOptions?.padding ? textOptions?.padding : [2, 2, 0, 4],
      overflow: textOptions?.overflow ? textOptions?.overflow : false,
      fill: new Fill({
        color: textOptions?.textColor ? textOptions?.textColor : '#000',
      }),
      backgroundFill: new Fill({
        color: textOptions?.backgroundFillColor
          ? textOptions?.backgroundFillColor
          : '#FFFFFF',
      }),
      backgroundStroke: new Stroke({
        width: textOptions?.StrockWidth ? textOptions?.StrockWidth : 6,
        color: textOptions?.backgroundStrokeColor
          ? textOptions?.backgroundStrokeColor
          : '#FFFFFF',
      }),
    }),
  });
};
