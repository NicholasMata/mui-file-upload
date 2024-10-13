import { type SxProps, type Theme } from '@mui/material';

export const mergeSx = (...a: Array<SxProps<Theme> | undefined>): SxProps<Theme> => {
  return a.flatMap((sx) => (Array.isArray(sx) ? sx : [sx]));
};
