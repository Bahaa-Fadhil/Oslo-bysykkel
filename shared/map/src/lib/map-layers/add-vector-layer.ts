import { StationGeoJson } from '@oslo-bysykkel/shared/web-hooks';
import { GeoJSON } from 'ol/format';
import type { Geometry } from 'ol/geom';
import type Feature from 'ol/Feature';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { circleStyle } from '../map-style-options';

type Props = Readonly<{
  source: GeoJSON | StationGeoJson;
}>;

/**
 * Adds Vector layer.
 *
 * @param source - GeoJson data source.
 * @returns - Vector layer.
 */
export const addVectorLayer = ({
  source,
}: Props): VectorLayer<VectorSource<Geometry>> => {
  return new VectorLayer({
    source: new VectorSource({
      features: new GeoJSON().readFeatures(source, {
        // Projection of the feature geometries created by the format reader.
        featureProjection: 'EPSG:3857',
        // Projection of the data we are reading.
        dataProjection: 'EPSG:4326',
      }),
    }),
    // Feature style.
    style(feature) {
      /* A style function that takes a single feature and returns
       * style of them. This way e.g. vector layer can be styled.
       * If the function returns undefined, the feature will not
       * be rendered.
       */
      const style = [circleStyle(feature as Feature<Geometry>)];

      return style;
    },
  });
};
