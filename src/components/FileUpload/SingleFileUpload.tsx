import { Fade, Box } from "@mui/material";
import {
  useRejectedFileManager,
  FileDropzone,
  FileDropzoneInputBody,
} from "../FileDropzone";
import { FileUploadResults } from "./FileUploadResults";
import { useFileUploaderManager, useFileUploader } from "../../hooks";
import { BaseFileUploadProps } from "./types";

export type SingleFileUploadProps<Response = string> =
  BaseFileUploadProps<Response>;

export const SingleFileUpload = <Response = string,>(
  props: SingleFileUploadProps<Response>
) => {
  const {
    uploadService,
    acceptsOnly,
    onSuccessfulUpload,
    fileManager,
    body = <FileDropzoneInputBody />,
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

  const hasFiles = rejectedFiles.length + fileUploads.length > 0;

  return (
    <Box display="flex" flexDirection="column">
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
            allowsMultiple={false}
            dragZoneSx={{ borderRadius: "5px" }}
            dropZoneSx={{ borderRadius: "5px" }}
            onFilesAccepted={upload}
            onFilesRejected={addRejected}
            acceptsOnly={acceptsOnly}
          >
            {body}
          </FileDropzone>
        </Box>
      </Fade>
      <Fade in={hasFiles} style={{ transitionDelay: "200ms" }}>
        <FileUploadResults
          rejected={rejectedFiles}
          failed={fileUploads.failed}
          inProgress={fileUploads.inProgress}
          successful={onSuccessfulUpload ? [] : fileUploads.successful}
          onRetry={upload}
          onDismissRejected={removeRejected}
          onRemoveFileUpload={removeFileUpload}
        />
      </Fade>
    </Box>
  );
};
