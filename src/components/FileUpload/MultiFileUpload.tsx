import { Stack } from '@mui/material';
import { useFileUploadManager, useFileUploader, type FileUploaderObservers } from '../../hooks';
import { useRejectedFileManager, FileDropzone, FileDropzoneBody } from '../FileDropzone';
import { type BaseFileUploadProps } from './types';
import { FileUploadResults } from './FileUploadResults';
import { memo, useMemo } from 'react';

export type MultiFileUploadProps<Response = string> = BaseFileUploadProps<Response>;

const MemoizedFileDropzone = memo(FileDropzone);

export const MultiFileUpload = <Response = string,>(props: MultiFileUploadProps<Response>): JSX.Element => {
  const {
    uploadService,
    acceptsOnly,
    onSuccessfulUpload,
    fileManager,
    body,
    sx,
    disabled,
    error,
    helperText,
    statusFormatter,
  } = props;
  const { rejectedFiles, addRejected, removeRejected } = useRejectedFileManager();

  const { fileUploads, removeFileUpload, handlers } = fileManager ?? useFileUploadManager<Response>();
  const mergedObservers = useMemo(
    (): FileUploaderObservers<Response> => ({
      onFileUploadStart: handlers.onFileUploadStart,
      onFileProgressUpdate: handlers.onFileProgressUpdate,
      onFileUploadComplete: (fu) => {
        onSuccessfulUpload?.(fu);
        handlers.onFileUploadComplete(fu);
      },
    }),
    [handlers, onSuccessfulUpload]
  );
  const { upload } = useFileUploader<Response>(uploadService, mergedObservers);

  const memoizedBody = useMemo(() => body ?? <FileDropzoneBody />, [body]);

  return (
    <Stack spacing={2}>
      <MemoizedFileDropzone
        sx={sx?.sx}
        disabled={disabled}
        dragZoneSx={sx?.dragZoneSx}
        dropZoneSx={sx?.dropZoneSx}
        onFilesAccepted={upload}
        onFilesRejected={addRejected}
        acceptsOnly={acceptsOnly}
        error={error}
        helperText={helperText}
      >
        {memoizedBody}
      </MemoizedFileDropzone>
      {(fileUploads.length > 0 || rejectedFiles.length > 0) && (
        <FileUploadResults
          rejected={rejectedFiles}
          failed={fileUploads.failed}
          inProgress={fileUploads.inProgress}
          successful={onSuccessfulUpload != null ? [] : fileUploads.successful}
          onRetry={upload}
          onDismissRejected={removeRejected}
          onRemoveFileUpload={removeFileUpload}
          statusFormatter={statusFormatter}
        />
      )}
    </Stack>
  );
};
