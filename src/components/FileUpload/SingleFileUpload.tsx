import { Fade, Box } from '@mui/material';
import { useRejectedFileManager, FileDropzone, FileDropzoneInputBody } from '../FileDropzone';
import { FileUploadResults } from './FileUploadResults';
import { useFileUploadManager, useFileUploader, type FileUploaderObservers } from '../../hooks';
import { type BaseFileUploadProps } from './types';
import { useMemo } from 'react';

export type SingleFileUploadProps<Response = string> = BaseFileUploadProps<Response>;

export const SingleFileUpload = <Response = string,>(props: SingleFileUploadProps<Response>): JSX.Element => {
  const {
    uploadService,
    acceptsOnly,
    onSuccessfulUpload,
    fileManager,
    body = <FileDropzoneInputBody />,
    sx,
    disabled,
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
  const { upload } = useFileUploader(uploadService, mergedObservers);

  const hasFiles = rejectedFiles.length + fileUploads.length > 0;

  return (
    <Box display='flex' flexDirection='column'>
      <Fade
        appear={false}
        unmountOnExit
        in={!hasFiles}
        timeout={{
          appear: 0,
          enter: 500,
          exit: 200,
        }}
      >
        <Box flexGrow={1}>
          <FileDropzone
            disabled={disabled}
            sx={sx?.sx}
            allowsMultiple={false}
            dragZoneSx={sx != null ? sx.dragZoneSx : () => ({ borderRadius: '5px' })}
            dropZoneSx={sx != null ? sx.dropZoneSx : { borderRadius: '5px' }}
            onFilesAccepted={upload}
            onFilesRejected={addRejected}
            acceptsOnly={acceptsOnly}
          >
            {body}
          </FileDropzone>
        </Box>
      </Fade>
      <Fade in={hasFiles} style={{ transitionDelay: '200ms' }}>
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
      </Fade>
    </Box>
  );
};
