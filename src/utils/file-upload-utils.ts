import { FileUpload } from "../components/FileDropzone/hooks";

export type FileUploadStatus = "Uploading" | "Failed" | "Completed";

export class FileUploadUtils {
  /**
   * Get the upload status string for a FileUpload.
   * @param fileUpload The file upload that will be used to build the status.
   * @returns The upload status string.
   */
  static formatStatus(fileUpload: FileUpload<any>): FileUploadStatus {
    if (!fileUpload.completed) return "Uploading";
    return fileUpload.failed ? "Failed" : "Completed";
  }
}
