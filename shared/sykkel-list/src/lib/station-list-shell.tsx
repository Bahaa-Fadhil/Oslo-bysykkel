import { memo, useEffect } from 'react';
import {
  StationsInformation,
  useGetAvailability,
  useGetStationInformation,
} from '@oslo-bysykkel/shared/web-hooks';
import { StationList } from './station-list';
import { useStationData } from '../../../../src/store';

export const StationListShell = memo((): JSX.Element => {
  // Get station information from the station information API.
  const { data: stationInformation } = useGetStationInformation();
  // Get available bike from the station status API
  const { data: availableBike } = useGetAvailability();
  // Set station data to state context to be used globally.
  const setStationData = useStationData((state) => state.setStationData);

  // Merge the station information and available bike data to one list.
  const mergedData = stationInformation?.data.stations.map((item, index) => ({
    ...item,
    ...availableBike?.data.stations[index],
  }));

  // Sort the merged data array in alphabetical order based on the 'name' field.
  const sortedData: StationsInformation = mergedData?.sort((a, b) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
    // Check if a or b contain a number in their name.
    const regex = /\d+/;
    const containsNumberA = regex.test(nameA);
    const containsNumberB = regex.test(nameB);

    if (containsNumberA && !containsNumberB) {
      // move b before a.
      return 1;
    } else if (!containsNumberA && containsNumberB) {
      // move a before b.
      return -1;
    } else {
      // both contain a number or both don't contain a number, sort alphabetically.
      if (nameA < nameB) {
        return -1;
      } else if (nameA > nameB) {
        return 1;
      } else {
        return 0;
      }
    }
  });

  useEffect(() => {
    if (!sortedData) return;

    setStationData(sortedData);
  }, [setStationData, sortedData]);

  return <StationList data={sortedData} />;
});
