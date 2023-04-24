import type { BackdropProps } from '@mui/material';
import { Backdrop, CircularProgress, useTheme } from '@mui/material';

interface LoadingBackdropProps extends Omit<BackdropProps, 'open'> {
  size?: string | number | undefined;
  open?: boolean;
}

/**
 * This component show loading state backdrop.
 */
export const LoadingBackdrop = ({
  open = true,
  size,
  sx,
  ...props
}: LoadingBackdropProps) => {
  const theme = useTheme();

  if (!open) return null;

  return (
    <Backdrop
      // Set open to true to show the loading backdrop.
      open={open}
      {...props}
      sx={{
        color: 'black',
        zIndex: theme.zIndex.drawer + 1,
        ...sx,
      }}
    >
      <CircularProgress color="inherit" size={size || 40} />
    </Backdrop>
  );
};
