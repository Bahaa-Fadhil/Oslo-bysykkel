import type { Theme } from '@mui/material';
import { AppBar, Box, Divider, Toolbar } from '@mui/material';
import AppLogo from './app-logo';

interface Props {
  children?: React.ReactNode;
  appName?: string;
  logo?: React.ReactNode;
}

/**
 * Generate an application header with a name and logo
 * to be used as a global header.
 */
export const ApplicationHeader = ({ appName, logo }: Props) => {
  return (
    <AppBar
      position="sticky"
      sx={{
        zIndex: (theme: Theme) => theme.zIndex.drawer + 1,
        maxHeight: 'fit-content',
        minHeight: '64px',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <Toolbar variant="regular">
        <Box
          width="100%"
          justifyContent="space-between"
          display="flex"
          flexDirection="row"
          flex="1 1 0%"
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {logo}
            {appName && (
              <>
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{
                    borderColor: 'white',
                    marginRight: '5px',
                    padding: '0 5px 0 5px',
                  }}
                />
                <Box display="flex" alignItems="center" mr={3}>
                  <AppLogo appName={appName as string} path={''} />
                </Box>
              </>
            )}
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
