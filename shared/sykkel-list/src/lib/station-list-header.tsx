import { TableCell, TableRow } from '@mui/material';
import TableHead from '@mui/material/TableHead';

import { memo } from 'react';

/**
 * Create station list header to add it to the table.
 */
export const StationListHeader = memo((): JSX.Element => {
  return (
    <TableHead sx={{ paddingTop: '0px', paddingBottom: '0px' }}>
      <TableRow>
        <TableCell sx={{ fontSize: '14px', fontWeight: 'bold' }}>
          Stasjon
        </TableCell>
        <TableCell sx={{ fontSize: '14px', fontWeight: 'bold' }} align="left">
          kapasitet
        </TableCell>
        <TableCell sx={{ fontSize: '14px', fontWeight: 'bold' }} align="left">
          Lokasjon
        </TableCell>
        <TableCell sx={{ fontSize: '14px', fontWeight: 'bold' }} align="left">
          ledige
        </TableCell>
        <TableCell sx={{ fontSize: '14px', fontWeight: 'bold' }} align="left">
          Tilgjengelig
        </TableCell>
      </TableRow>
    </TableHead>
  );
});
