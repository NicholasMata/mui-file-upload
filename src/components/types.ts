import { type SxProps, type Theme } from '@mui/material';
import { type ReactNode } from 'react';

/** The minimum props an MUI like component should have. */
export type MinimumMUIFieldProps = {
  /** Whether the component is disabled, aka can't be interacted with. */
  disabled?: boolean;
  /** Helper text for this component
   *
   * If `error` is true then this should be an error message as it will be colored using `error` color in theme palette. */
  helperText?: ReactNode;
  /**
   * Whether the component contains an error, this is just for styling.
   * Along with `helperText` this will allow for custom validation.
   **/
  error?: boolean;
};

/** The base props an MUI like component should have. */
export type BaseMUIFieldProps = MinimumMUIFieldProps & {
  /**
   * Whether this component is required.
   *
   * This does not actually make the component required this is just used for styling.
   **/
  required?: boolean;
  /**
   * A label for this component
   *
   * If `required` is true a `*` will be appending to the label.
   */
  label?: ReactNode;
};

/** Base props for MUI like component with styling though sx */
export type BaseMUIFieldPropsWithSx = {
  sx?: SxProps<Theme>;
} & BaseMUIFieldProps;
