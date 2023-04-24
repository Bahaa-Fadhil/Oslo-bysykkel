import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { SystemInformation } from '../interfaces';

// Constant variable to be used as a key in useQuery hook.
export const USE_GET_SYSTEM_INFORMATION_QUERY =
  'USE_GET_SYSTEM_INFORMATION_QUERY';

// Config object to be passed as an request header to axios GET request.
const config = {
  headers: {
    'Client-Identifier': 'bahaa-oslo-bysykkel',
  },
};

/* Async function that makes an axios GET request to retrieve
 * system system information data from the server.
 */
export const getSystemInformation = async (): Promise<SystemInformation> => {
  const { data } = await axios.get<SystemInformation>(
    `https://gbfs.urbansharing.com/oslobysykkel.no/system_information.json`,
    config
  );

  return data;
};

/* Custom hook that uses useQuery from react-query
 * to fetch system information data.
 */
export const useGetSystemInformation = (
  isEnabled?: boolean
): UseQueryResult<SystemInformation> => {
  return useQuery(
    [USE_GET_SYSTEM_INFORMATION_QUERY],
    () => getSystemInformation(),
    {
      refetchOnWindowFocus: false,
      staleTime: 60 * 1000,
      placeholderData: null,
      enabled: isEnabled === undefined ? true : isEnabled,
    }
  );
};
