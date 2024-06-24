import { Replay, Delete } from '@mui/icons-material';
import { Stack, IconButton } from '@mui/material';
import { type ReactNode } from 'react';

export interface FileUploadCardActionProps {
  /** The remove/delete icon displayed if onRetry is defined. */
  retryIcon?: ReactNode;
  /** Called when retry button is clicked. If not provided then no button will display */
  onRetry?: React.MouseEventHandler<HTMLButtonElement>;
  /** The remove/delete icon displayed if onRemove is defined. */
  removeIcon?: ReactNode;
  onRemove?: React.MouseEventHandler<HTMLButtonElement>;
}

export const FileUploadCardActions = ({
  retryIcon = <Replay />,
  onRetry,
  removeIcon = <Delete />,
  onRemove,
}: FileUploadCardActionProps): JSX.Element => {
  return (
    <Stack direction='row'>
      {onRetry != null && <IconButton onClick={onRetry}>{retryIcon}</IconButton>}
      {onRemove != null && <IconButton onClick={onRemove}>{removeIcon}</IconButton>}
    </Stack>
  );
};
