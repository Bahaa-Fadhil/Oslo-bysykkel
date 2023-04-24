/* eslint-disable react/display-name */
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

type AppLogoProps = {
  appName: string;
  path?: string;
};
const style = {
  color: '#fff',
  textDecoration: 'none',
};

/**
 * Generate an app name from given prop.
 */
export const AppLogo = ({ appName, path = '/' }: AppLogoProps) => {
  return (
    <Link style={style} to={path}>
      <Typography
        variant="subtitle1"
        sx={{ fontWeight: '600', fontSize: '1.15rem' }}
      >
        {appName}
      </Typography>
    </Link>
  );
};

export default AppLogo;
