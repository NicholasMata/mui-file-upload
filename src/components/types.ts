import { type SxProps, type Theme } from '@mui/material';
import { type ReactNode } from 'react';

export type BaseMUIFieldProps = {
  disabled?: boolean;
  helperText?: ReactNode;
  error?: boolean;
  required?: boolean;
  label?: ReactNode;
};

export type BaseMUIFieldPropsWithSx = {
  sx?: SxProps<Theme>;
} & BaseMUIFieldProps;
