// -----------------------------------------------------------------------------
// System Information Model
// -----------------------------------------------------------------------------

export type SystemInformation = Readonly<{
  last_updated: number | Date;
  ttl: number;
  data: {
    system_id: string;
    language?: string;
    name: string;
    operator?: string;
    timezone?: string;
    phone_number?: string;
    email?: string;
  };
}>;
