import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Stations } from '../interfaces';

// Constant variable to be used as a key in useQuery hook.
export const USE_GET_STATION_INFORMATION = 'USE_GET_STATION_INFORMATION';

// Config object to be passed as an request header to axios GET request.
const config = {
  headers: {
    'Client-Identifier': 'bahaa-oslo-bysykkel',
  },
};

/* Async function that makes an axios GET request to retrieve
 * system stations data from the server.
 */
export const getStationInformation = async (): Promise<Stations> => {
  const { data } = await axios.get<Stations>(
    `https://gbfs.urbansharing.com/oslobysykkel.no/station_information.json`,
    config
  );

  return data;
};

/* Custom hook that uses useQuery from react-query
 * to fetch system station information data.
 */
export const useGetStationInformation = (
  isEnabled?: boolean
): UseQueryResult<Stations> => {
  return useQuery(
    [USE_GET_STATION_INFORMATION],
    () => getStationInformation(),
    {
      enabled: isEnabled === undefined ? true : isEnabled,
      refetchOnWindowFocus: false,
      staleTime: 60 * 1000,
      placeholderData: null,
    }
  );
};
