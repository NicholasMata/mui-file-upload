import { Alert, type AlertProps } from '@mui/material';
import { type ReactNode, type Ref, forwardRef } from 'react';
import { DEFAULT_FILE_REJECT_SUFFIX } from './FileDropzone/contants';

type RejectedFileUploadAlertProps = {
  filename: string;
  suffix?: string;
} & AlertProps;

const RejectedFileUploadAlertInner = (
  { filename, suffix = DEFAULT_FILE_REJECT_SUFFIX, ...alertProps }: RejectedFileUploadAlertProps,
  ref: Ref<HTMLDivElement>
): ReactNode => (
  <Alert ref={ref} {...alertProps}>
    <b>{filename}</b> {suffix}
  </Alert>
);

export const RejectedFileUploadAlert = forwardRef<HTMLDivElement, RejectedFileUploadAlertProps>(
  RejectedFileUploadAlertInner
);
