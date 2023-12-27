import { useMemo, useState } from 'react';
import { type FileUploaderObservers } from './types';
import { type FileUpload } from '../types';

export interface FileUploadManager<Response = string> {
  fileUploads: {
    inProgress: Array<FileUpload<Response>>;
    successful: Array<FileUpload<Response>>;
    failed: Array<FileUpload<Response>>;
    length: number;
  };
  removeFileUpload: (fileUploadToRemove: FileUpload<Response>) => void;
  handlers: FileUploaderObservers<Response>;
}

export const useFileUploadManager = <Response = string>(): FileUploadManager<Response> => {
  const [fileUploads, setFileUploads] = useState<Array<FileUpload<Response>>>([]);

  const inProgress = fileUploads.filter((fu) => !fu.completed);
  const successful = fileUploads.filter((fu) => fu.completed && !(fu.failed ?? false));
  const failed = fileUploads.filter((fu) => fu.completed && fu.failed);

  const handlers: FileUploaderObservers<Response> = useMemo(
    () => ({
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
    }),
    [setFileUploads, append, update]
  );

  const removeFileUpload = (fileUploadToRemove: FileUpload<Response>): void => {
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

function remove<Response = unknown>(fileToRemove: FileUpload<Response>) {
  return (prev: Array<FileUpload<Response>>) => prev.filter((p) => p.id !== fileToRemove.id);
}

function update<Response = unknown>(fileToUpdate: FileUpload<Response>) {
  return (prev: Array<FileUpload<Response>>) => prev.map((p) => (p.id === fileToUpdate.id ? fileToUpdate : p));
}

function append<Response = unknown>(fileToAppend: FileUpload<Response>) {
  return (prev: Array<FileUpload<Response>>) => [...prev, fileToAppend];
}
