import { useState } from "react";
import { FileUpload } from "types";
import { FileUploaderObservers } from "./useFileUploader";

export type FileUploadManager<Response = string> = {
  fileUploads: {
    inProgress: FileUpload<Response>[];
    successful: FileUpload<Response>[];
    failed: FileUpload<Response>[];
    length: number;
  };
  removeFileUpload: (fileUploadToRemove: FileUpload<Response>) => void;
  handlers: FileUploaderObservers<Response>;
};

export const useFileUploaderManager = <
  Response = string
>(): FileUploadManager<Response> => {
  const [fileUploads, setFileUploads] = useState<FileUpload<Response>[]>([]);

  const inProgress = fileUploads.filter((fu) => !fu.completed);
  const successful = fileUploads.filter((fu) => fu.completed && !fu.failed);
  const failed = fileUploads.filter((fu) => fu.completed && fu.failed);

  const handlers: FileUploaderObservers<Response> = {
    onFileUploadStart: (fileUpload, isRetry) => {
      if (isRetry) {
        setFileUploads(update(fileUpload));
      } else {
        setFileUploads(append(fileUpload));
      }
    },
    onFileProgressUpdate: (updatedFileUpload) => {
      setFileUploads(update(updatedFileUpload));
    },
    onFileUploadComplete: (completedFileUpload) => {
      setFileUploads(update(completedFileUpload));
    },
  };

  const removeFileUpload = (fileUploadToRemove: FileUpload<Response>) => {
    setFileUploads(remove(fileUploadToRemove));
  };

  return {
    fileUploads: {
      inProgress,
      failed,
      successful,
      length: fileUploads.length,
    },
    handlers,
    removeFileUpload,
  };
};

function remove(fileToRemove: FileUpload<any>) {
  return (prev: FileUpload<any>[]) =>
    prev.filter((p) => p.id !== fileToRemove.id);
}

function update(fileToUpdate: FileUpload<any>) {
  return (prev: FileUpload<any>[]) =>
    prev.map((p) => (p.id === fileToUpdate.id ? fileToUpdate : p));
}

function append(fileToAppend: FileUpload<any>) {
  return (prev: FileUpload<any>[]) => [...prev, fileToAppend];
}
