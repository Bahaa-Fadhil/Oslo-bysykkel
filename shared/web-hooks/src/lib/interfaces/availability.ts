// -----------------------------------------------------------------------------
// Availability Model
// -----------------------------------------------------------------------------

export type Availability = Readonly<{
  last_updated: number | Date;
  data: {
    stations: [
      {
        is_installed: number;
        is_renting: number;
        num_bikes_available: number;
        num_docks_available: number;
        last_reported: number | Date;
        is_returning: number;
        station_id: string;
      }
    ];
  };
}>;
