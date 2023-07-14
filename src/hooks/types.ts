import { FileUpload } from "../types";

export type FileUploaderObservers<Response = string> = {
  onFileUploadStart: (
    newFileUpload: FileUpload<Response>,
    isRetry: boolean
  ) => void;
  onFileProgressUpdate: (updatedFileUpload: FileUpload<Response>) => void;
  onFileUploadComplete: (completedFileUpload: FileUpload<Response>) => void;
};
