import { Stack } from '@mui/material';
import { useFileUploaderManager, useFileUploader, type FileUploaderObservers } from '../../hooks';
import { useRejectedFileManager, FileDropzone, FileDropzoneBody } from '../FileDropzone';
import { type BaseFileUploadProps } from './types';
import { FileUploadResults } from './FileUploadResults';
import { type ReactNode, useMemo } from 'react';

export type MultiFileUploadProps<Response = string> = BaseFileUploadProps<Response>;

export const MultiFileUpload = <Response = string,>(props: MultiFileUploadProps<Response>): ReactNode => {
  const { uploadService, acceptsOnly, onSuccessfulUpload, fileManager, body, sx, disabled } = props;
  const { rejectedFiles, addRejected, removeRejected } = useRejectedFileManager();

  const { fileUploads, removeFileUpload, handlers } = fileManager ?? useFileUploaderManager<Response>();
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
      <FileDropzone
        disabled={disabled}
        sx={sx?.sx}
        dragZoneSx={sx?.dragZoneSx}
        dropZoneSx={sx?.dropZoneSx}
        onFilesAccepted={upload}
        onFilesRejected={addRejected}
        acceptsOnly={acceptsOnly}
      >
        {memoizedBody}
      </FileDropzone>
      <FileUploadResults
        rejected={rejectedFiles}
        failed={fileUploads.failed}
        inProgress={fileUploads.inProgress}
        successful={onSuccessfulUpload != null ? [] : fileUploads.successful}
        onRetry={upload}
        onDismissRejected={removeRejected}
        onRemoveFileUpload={removeFileUpload}
      />
    </Stack>
  );
};
