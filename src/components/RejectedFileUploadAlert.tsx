import { Alert, AlertProps } from '@mui/material';
import { forwardRef } from 'react';
import { DEFAULT_FILE_REJECT_SUFFIX } from './FileDropzone/contants';

type RejectedFileUploadAlertProps = {
  filename: string;
  suffix?: string;
} & AlertProps;

export const RejectedFileUploadAlert = forwardRef<HTMLDivElement, RejectedFileUploadAlertProps>(
  ({ filename, suffix = DEFAULT_FILE_REJECT_SUFFIX, ...alertProps }, ref) => (
    <Alert ref={ref} {...alertProps}>
      <b>{filename}</b> {suffix}
    </Alert>
  )
);
