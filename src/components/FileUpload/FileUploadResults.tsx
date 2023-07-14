import { Box, Fade, Grow, Stack, StackProps } from "@mui/material";
import { FileUploadCard, FileUploadCardActions } from "../FileUploadCard";
import { RejectedFileUploadAlert } from "../RejectedFileUploadAlert";
import { FileUpload } from "../FileDropzone";
import { forwardRef } from "react";

type Props = {
  rejected: File[];
  failed: FileUpload<any>[];
  inProgress: FileUpload<any>[];
  successful: FileUpload<any>[];
  onDismissRejected?: (file: File) => void;
  onRetry?: (fileUpload: FileUpload<any>) => void;
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
