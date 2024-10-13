import { Box, alpha, type BoxProps, type SxProps, type Theme } from '@mui/material';
import { useMemo } from 'react';
import { mergeSx } from '../../utils';

export type DarkOverlayProps = {
  snapTo?: 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight';
  openCornerRadius?: number | string;
  curveOppositeCorner?: boolean;
} & BoxProps;

export const DarkOverlay = ({
  children,
  sx,
  snapTo,
  openCornerRadius,
  curveOppositeCorner = false,
  ...props
}: DarkOverlayProps): JSX.Element => {
  const additionSx = useMemo(() => {
    if (snapTo === undefined) return;
    let sx: SxProps<Theme> = {
      position: 'absolute',
    };
    switch (snapTo) {
      case 'bottomLeft':
        sx = {
          ...sx,
          bottom: 0,
          left: 0,
          ...(curveOppositeCorner ? { borderBottomLeftRadius: openCornerRadius } : undefined),
          borderTopRightRadius: openCornerRadius,
        };
        break;
      case 'bottomRight':
        sx = {
          ...sx,
          bottom: 0,
          right: 0,
          ...(curveOppositeCorner ? { borderBottomRightRadius: openCornerRadius } : undefined),
          borderTopLeftRadius: openCornerRadius,
        };
        break;
      case 'topLeft':
        sx = {
          ...sx,
          top: 0,
          left: 0,
          ...(curveOppositeCorner ? { borderTopLeftRadius: openCornerRadius } : undefined),
          borderBottomRightRadius: openCornerRadius,
        };
        break;
      case 'topRight':
        sx = {
          ...sx,
          top: 0,
          right: 0,
          ...(curveOppositeCorner ? { borderTopRightRadius: openCornerRadius } : undefined),
          borderBottomLeftRadius: openCornerRadius,
        };
        break;
    }
    return sx;
  }, [snapTo, curveOppositeCorner, openCornerRadius]);
  return (
    <Box
      {...props}
      sx={mergeSx(sx, {
        background: alpha('#000000', 0.7),
        ...additionSx,
      })}
    >
      {children}
    </Box>
  );
};
