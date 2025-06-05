import { Box, Fade, Grow, Stack, type StackProps } from '@mui/material';
import { FileUploadCard, FileUploadCardActions } from '../FileUploadCard';
import { RejectedFileUploadAlert } from '../RejectedFileUploadAlert';
import { type Ref, forwardRef } from 'react';
import { type FileUpload } from '../../types';

type Props<Response = string> = {
  /** A list of files that have been rejected. */
  rejected: File[];
  /** A list of file uploads that are completed and have failed. */
  failed: Array<FileUpload<Response>>;
  /** A list of file uploads that are in progress. */
  inProgress: Array<FileUpload<Response>>;
  /** A list of fiel uploads that are compelted and successful */
  successful: Array<FileUpload<Response>>;
  /** Called when a rejected file alert should be dismissed aka removed from `rejected` */
  onDismissRejected?: (file: File) => void;
  /** Called when a failed file upload should be retried. */
  onRetry?: (fileUpload: FileUpload<Response>) => void;
  /** Called when a file upload needs to be removed. */
  onRemoveFileUpload?: (fileUpload: FileUpload<Response>) => void;
  /**
   * Returns a custom status label for a file upload e.g. "Uploading", "Failed" or "Completed".
   * @param fileUpload File upload for which the status should be formatted
   * @returns Status label for the file upload
   */
  statusFormatter?: (fileUpload: FileUpload<Response>) => string;
} & StackProps;

const FileUploadResultsInner = <Response = string,>(
  {
    rejected,
    failed,
    inProgress,
    successful,
    onDismissRejected,
    onRetry,
    onRemoveFileUpload,
    statusFormatter,
    ...stackProps
  }: Props<Response>,
  ref?: Ref<HTMLDivElement>
): JSX.Element => (
  <Stack spacing={1} {...stackProps} ref={ref}>
    {rejected.map((f, i) => (
      <Grow in key={`rejected-${i}`}>
        <RejectedFileUploadAlert filename={f.name} severity='error' onClose={() => onDismissRejected?.(f)} />
      </Grow>
    ))}
    {failed.map((f) => (
      <FileUploadCard
        key={f.id}
        fileUpload={f}
        actions={<FileUploadCardActions onRemove={() => onRemoveFileUpload?.(f)} onRetry={() => onRetry?.(f)} />}
        statusFormatter={statusFormatter}
      />
    ))}
    {inProgress.map((f) => (
      <Fade in={true} key={f.id}>
        <Box>
          <FileUploadCard fileUpload={f} statusFormatter={statusFormatter} />
        </Box>
      </Fade>
    ))}
    {successful.map((f) => (
      <FileUploadCard
        fileUpload={f}
        key={f.id}
        actions={<FileUploadCardActions onRemove={() => onRemoveFileUpload?.(f)} />}
        statusFormatter={statusFormatter}
      />
    ))}
  </Stack>
);

export const FileUploadResults = forwardRef(FileUploadResultsInner) as <Response = string>(
  props: Props<Response> & { ref?: Ref<HTMLDivElement> }
) => ReturnType<typeof FileUploadResultsInner>;
