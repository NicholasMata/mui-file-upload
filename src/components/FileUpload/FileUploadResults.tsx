import { Box, Fade, Grow, Stack, StackProps } from "@mui/material";
import { FileUploadCard, FileUploadCardActions } from "../FileUploadCard";
import { RejectedFileUploadAlert } from "../RejectedFileUploadAlert";
import { forwardRef } from "react";
import { FileUpload } from "../../types";

type Props = {
  /** A list of files that have been rejected. */
  rejected: File[];
  /** A list of file uploads that are completed and have failed. */
  failed: FileUpload<any>[];
  /** A list of file uploads that are in progress. */
  inProgress: FileUpload<any>[];
  /** A list of fiel uploads that are compelted and successful */
  successful: FileUpload<any>[];
  /** Called when a rejected file alert should be dismissed aka removed from `rejected` */
  onDismissRejected?: (file: File) => void;
  /** Called when a failed file upload should be retried. */
  onRetry?: (fileUpload: FileUpload<any>) => void;
  /** Called when a file upload needs to be removed. */
  onRemoveFileUpload?: (fileUpload: FileUpload<any>) => void;
} & StackProps;
export const FileUploadResults = forwardRef<HTMLDivElement, Props>(
  (
    {
      rejected,
      failed,
      inProgress,
      successful,
      onDismissRejected,
      onRetry,
      onRemoveFileUpload,
      ...stackProps
    },
    ref
  ) => (
    <Stack {...stackProps} ref={ref}>
      {rejected.map((f, i) => (
        <Grow in key={`rejected-${i}`}>
          <RejectedFileUploadAlert
            filename={f.name}
            severity="warning"
            onClose={() => onDismissRejected?.(f)}
          />
        </Grow>
      ))}
      {failed.map((f) => (
        <FileUploadCard
          key={f.id}
          fileUpload={f}
          actions={<FileUploadCardActions onRetry={() => onRetry?.(f)} />}
        />
      ))}
      {inProgress.map((f) => (
        <Fade in={true} key={f.id}>
          <Box>
            <FileUploadCard fileUpload={f} />
          </Box>
        </Fade>
      ))}
      {successful.map((f) => (
        <FileUploadCard
          fileUpload={f}
          key={f.id}
          actions={
            <FileUploadCardActions onRemove={() => onRemoveFileUpload?.(f)} />
          }
        />
      ))}
    </Stack>
  )
);
