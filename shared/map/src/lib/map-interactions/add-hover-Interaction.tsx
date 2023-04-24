import * as condition from 'ol/events/condition';
import type Feature from 'ol/Feature';
import type { Geometry } from 'ol/geom';
import Select from 'ol/interaction/Select';
import type Map from 'ol/Map';
import type { Style } from 'ol/style';
import { circleStyle, textStyle } from '../map-style-options';

type options = Readonly<{
  map: Map;
  showSiteName?: boolean;
  showLastUpdate?: boolean;
}>;

/**
 * Creates hover interaction to add it to interactive map.
 */
export const addHoverInteraction = (option: options): void => {
  let style: Style[];

  // Create select interaction to add it to the map.
  const olSelectInteraction = new Select({
    condition: condition.pointerMove,
    style(feature) {
      style = [
        circleStyle(feature as Feature<Geometry>),
        textStyle(feature as Feature<Geometry>, {
          showSiteName: true,
          showLastUpdate: true,
        }),
      ];

      return style;
    },
  });

  // Remove select interaction from the map.
  option.map.getInteractions().forEach((action) => {
    if (action && action instanceof Select) {
      option.map.removeInteraction(action);
    }
  });
  // Add select interaction to the map.
  option.map.addInteraction(olSelectInteraction);
};
