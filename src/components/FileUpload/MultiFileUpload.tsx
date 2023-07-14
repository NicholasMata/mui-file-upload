import { Stack } from "@mui/material";
import { useFileUploaderManager, useFileUploader } from "../../hooks";
import {
  useRejectedFileManager,
  FileDropzone,
  FileDropzoneBody,
} from "../FileDropzone";
import { BaseFileUploadProps } from "./types";
import { FileUploadResults } from "./FileUploadResults";

export type MultiFileUploadProps<Response = string> =
  BaseFileUploadProps<Response>;
export const MultiFileUpload = <Response = string,>(
  props: MultiFileUploadProps<Response>
) => {
  const {
    uploadService,
    acceptsOnly,
    onSuccessfulUpload,
    fileManager,
    body = <FileDropzoneBody />,
  } = props;
  const { rejectedFiles, addRejected, removeRejected } =
    useRejectedFileManager();

  const { fileUploads, removeFileUpload, handlers } =
    fileManager ?? useFileUploaderManager<Response>();
  const { upload } = useFileUploader(uploadService, {
    onFileUploadStart: handlers.onFileUploadStart,
    onFileProgressUpdate: handlers.onFileProgressUpdate,
    onFileUploadComplete: (fu) => {
      onSuccessfulUpload?.(fu);
      handlers.onFileUploadComplete(fu);
    },
  });

  return (
    <Stack spacing={2}>
      <FileDropzone
        onFilesAccepted={upload}
        onFilesRejected={addRejected}
        acceptsOnly={acceptsOnly}
      >
        {body}
      </FileDropzone>
      <FileUploadResults
        rejected={rejectedFiles}
        failed={fileUploads.failed}
        inProgress={fileUploads.inProgress}
        successful={onSuccessfulUpload ? [] : fileUploads.successful}
        onRetry={upload}
        onDismissRejected={removeRejected}
        onRemoveFileUpload={removeFileUpload}
      />
    </Stack>
  );
};
