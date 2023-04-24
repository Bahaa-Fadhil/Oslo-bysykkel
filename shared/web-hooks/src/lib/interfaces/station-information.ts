// -----------------------------------------------------------------------------
// Station Information Model
// -----------------------------------------------------------------------------

export type StationInformation = {
  station_id: string;
  name: string;
  address: string;
  lat: number;
  lon: number;
  capacity: number;
  is_installed?: number;
  is_renting?: number;
  num_bikes_available?: number;
  num_docks_available?: number;
  last_reported?: number | Date;
  is_returning?: number;
};

export type StationsInformation = StationInformation[] | undefined;
