import { Box, Grid } from '@mui/material';
import { StationListShell } from '@oslo-bysykkel/shared/sykkel-list';

import { Suspense } from 'react';
import { LoadingBackdrop } from '../../components';
import { useStationData } from '../../store';
import { InteractiveMap } from '@oslo-bysykkel/shared/map';

const Home = () => {
  const stationData = useStationData((state) => state.stationData);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        overflow="hidden"
        container
        position="absolute"
        top="64px"
        right="0"
        bottom="0"
        left="0"
      >
        <Grid
          item
          xs={6}
          md={6}
          lg={6}
          xl={6}
          height="100%"
          position="relative"
          sx={{
            padding: '2px',
          }}
        >
          <StationListShell />
        </Grid>
        <Grid
          item
          xs={6}
          md={6}
          lg={6}
          xl={6}
          height="100%"
          position="relative"
        >
          <Suspense fallback={<LoadingBackdrop />}>
            <InteractiveMap stationData={stationData} />
          </Suspense>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
