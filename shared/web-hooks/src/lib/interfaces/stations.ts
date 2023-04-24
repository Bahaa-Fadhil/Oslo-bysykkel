// -----------------------------------------------------------------------------
// stations Model
// -----------------------------------------------------------------------------

export type Stations = Readonly<{
  last_updated: number | Date;
  data: {
    stations: [
      {
        station_id: string;
        name: string;
        address: string;
        lat: number;
        lon: number;
        capacity: number;
      }
    ];
  };
}>;
