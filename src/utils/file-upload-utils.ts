import { FileUpload } from '../types';

export type FileUploadStatus = 'Uploading' | 'Failed' | 'Completed';

export class FileUploadUtils {
  /**
   * Get the upload status string for a FileUpload.
   * @param fileUpload The file upload that will be used to build the status.
   * @returns The upload status string.
   */
  static formatStatus<Response = string>(fileUpload: FileUpload<Response>): FileUploadStatus {
    if (!fileUpload.completed) return 'Uploading';
    return fileUpload.failed ? 'Failed' : 'Completed';
  }
}
