import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Availability } from '../interfaces';

// Constant variable to be used as a key in useQuery hook.
export const USE_GET_SYSTEM_AVAILABILITY = 'USE_GET_SYSTEM_AVAILABILITY';

// Config object to be passed as an request header to axios GET request.
const config = {
  headers: {
    'Client-Identifier': 'bahaa-oslo-bysykkel',
  },
};

/* Async function that makes an axios GET request to retrieve
 * system availability data from the server.
 */
export const getAvailability = async (): Promise<Availability> => {
  const { data } = await axios.get<Availability>(
    `https://gbfs.urbansharing.com/oslobysykkel.no/station_status.json`,
    config
  );

  return data;
};

/* Custom hook that uses useQuery from react-query
 * to fetch system availability data.
 */
export const useGetAvailability = (
  isEnabled?: boolean
): UseQueryResult<Availability> => {
  return useQuery([USE_GET_SYSTEM_AVAILABILITY], () => getAvailability(), {
    refetchOnWindowFocus: false,
    staleTime: 60 * 1000,
    placeholderData: null,
    enabled: isEnabled === undefined ? true : isEnabled,
  });
};
