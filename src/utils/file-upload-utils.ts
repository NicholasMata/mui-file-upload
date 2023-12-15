import { type FileUpload } from '../types';

export type FileUploadStatus = 'Uploading' | 'Failed' | 'Completed';

export const FileUploadUtils = {
  /**
   * Get the upload status string for a FileUpload.
   * @param fileUpload The file upload that will be used to build the status.
   * @returns The upload status string.
   */
  formatStatus<Response = string>(fileUpload: FileUpload<Response>): FileUploadStatus {
    if (!fileUpload.completed) return 'Uploading';
    if (fileUpload.failed === true) return 'Failed';
    return 'Completed';
  },
};
