import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { memo } from 'react';
import { StationsInformation } from '@oslo-bysykkel/shared/web-hooks';

import List from '@mui/material/List';
import { StationListHeader } from './station-list-header';

interface StationTableProps {
  data: StationsInformation;
}

/**
 * Create station list to add it to station shell component.
 */
export const StationList = memo(({ data }: StationTableProps): JSX.Element => {
  if (data)
    return (
      <List
        sx={{ overflowY: 'scroll', paddingTop: '0px', paddingBottom: '0px' }}
      >
        <Paper style={{ height: 860, width: '100%' }}>
          <TableContainer component={Paper}>
            <Table
              stickyHeader
              aria-label="sticky table"
              sx={{ position: 'absolute' }}
            >
              <StationListHeader />
              <TableBody>
                {data?.map((station) => (
                  <TableRow
                    key={station.station_id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell scope="row">{station.name}</TableCell>
                    <TableCell align="left">{station.capacity}</TableCell>
                    <TableCell align="left">{station.address}</TableCell>
                    <TableCell align="left">
                      {station.num_bikes_available}
                    </TableCell>
                    <TableCell align="left">
                      {station.num_docks_available}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </List>
    );
  return <div></div>;
});
