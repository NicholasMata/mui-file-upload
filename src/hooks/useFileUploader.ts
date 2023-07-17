import { useCallback } from "react";
import { FileUploaderObservers } from "./types";
import { FileUpload } from "../types";

export type FileUploader<Response> = {
  /** A function that can be called to upload a file or retry a failed file upload. */
  upload: (fileOrFileUpload: File | File[] | FileUpload<Response>) => void;
};

/** A type for a function that can be called to upload a file and track it's progress. */
export type FileUploadService<Response> = (
  file: File,
  onProgress: (progress: number) => void
) => Promise<Response>;

export const useFileUploader = <Response = string>(
  networkService: FileUploadService<Response>,
  observers: FileUploaderObservers<Response>
): FileUploader<Response> => {
  const { onFileUploadStart, onFileProgressUpdate, onFileUploadComplete } =
    observers;

  const uploader = useCallback(
    (fileOrFileUpload: File | FileUpload<Response>) => {
      const isRetry = "id" in fileOrFileUpload;
      const fileUpload: FileUpload<Response> = !isRetry
        ? {
            id: generateGUID(),
            file: fileOrFileUpload,
            progress: 0,
            completed: false,
            failed: false,
          }
        : { ...fileOrFileUpload, completed: false, failed: false, progress: 0 };

      const onProgress = (progress: number) => {
        const updatedFileUpload: FileUpload<Response> = {
          ...fileUpload,
          progress,
        };
        onFileProgressUpdate(updatedFileUpload);
      };

      const handleCompletion = (failed: boolean, responseBody?: Response) => {
        const completedFileUpload: FileUpload<Response> = {
          ...fileUpload,
          progress: 100,
          completed: true,
          failed,
          responseBody,
        };
        onFileUploadComplete(completedFileUpload);
      };

      networkService(fileUpload.file, onProgress)
        .then((result) => handleCompletion(false, result))
        .catch(() => handleCompletion(true));
      onFileUploadStart(fileUpload, isRetry);
    },
    [networkService, observers]
  );

  const upload = useCallback(
    (p: File | File[] | FileUpload<Response>) => {
      let itemsToUpload: (File | FileUpload<Response>)[];
      if (Array.isArray(p)) {
        itemsToUpload = p;
      } else {
        itemsToUpload = [p];
      }
      itemsToUpload.forEach(uploader);
    },
    [uploader]
  );

  return {
    upload,
  };
};

function generateGUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
