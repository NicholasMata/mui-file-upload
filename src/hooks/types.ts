import { type FileUpload } from '../types';

export interface FileUploaderObservers<Response = string> {
  onFileUploadStart: (newFileUpload: FileUpload<Response>, isRetry: boolean) => void;
  onFileProgressUpdate: (updatedFileUpload: FileUpload<Response>) => void;
  onFileUploadComplete: (completedFileUpload: FileUpload<Response>) => void;
}
