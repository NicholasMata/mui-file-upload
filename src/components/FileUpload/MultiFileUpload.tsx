import { Stack, Box, Grow, Slide } from "@mui/material";
import {
  useFileUploader,
  FileDropzone,
  FileUploadService,
  useRejectedFileManager,
  FileDropzoneBody,
  useFileUploaderManager,
} from "../FileDropzone";
import { FileUploadCard, FileUploadCardActions } from "../FileUploadCard";
import { RejectedFileUploadAlert } from "../RejectedFileUploadAlert";

export type MultiFileUploadProps<Response = string> = {
  uploadService: FileUploadService<Response>;
  acceptsOnly?: string;
};
export const MultiFileUpload = <Response = string,>(
  props: MultiFileUploadProps<Response>
) => {
  const { uploadService, acceptsOnly } = props;
  const { rejectedFiles, addRejected, removeRejected } =
    useRejectedFileManager();

  const { fileUploads, removeFileUpload, handlers } =
    useFileUploaderManager<Response>();
  const { upload } = useFileUploader(uploadService, handlers);

  return (
    <Stack spacing={2}>
      <FileDropzone
        onFilesAccepted={upload}
        onFilesRejected={addRejected}
        acceptsOnly={acceptsOnly}
      >
        <FileDropzoneBody />
      </FileDropzone>
      <Stack spacing={1}>
        {rejectedFiles.map((f, i) => (
          <Grow in key={`rejected-${i}`}>
            <RejectedFileUploadAlert
              filename={f.name}
              severity="warning"
              onClose={() => removeRejected(f)}
            />
          </Grow>
        ))}
        {fileUploads.failed.map((f) => (
          <FileUploadCard
            key={f.id}
            fileUpload={f}
            actions={<FileUploadCardActions onRetry={() => upload(f)} />}
          />
        ))}
        {fileUploads.inProgress.map((f) => (
          <Slide direction="right" in={true} key={f.id}>
            <Box>
              <FileUploadCard fileUpload={f} />
            </Box>
          </Slide>
        ))}
        {fileUploads.successful.map((f) => (
          <FileUploadCard key={f.id} fileUpload={f} />
        ))}
      </Stack>
    </Stack>
  );
};
