import { useCallback, useMemo, useState } from "react";

export type FileUpload<Response = string> = {
  id: string;
  file: File;
  progress: number;
  completed: boolean;
  failed?: boolean;
  responseBody?: Response;
};

export type FileUploader<Response> = {
  /** A list of file uploads in progress. */
  // inProgressFileUploads: FileUpload<Response>[];
  /** A list of file uploads which were completed successfully. */
  // completedFileUploads: FileUpload<Response>[];
  /** A list of file uploads which have failed. */
  // failedFileUploads: FileUpload<Response>[];
  /** A function that can be called to upload a file or retry a failed file upload. */
  upload: (fileOrFileUpload: File | File[] | FileUpload<Response>) => void;
  // removeCompletedFileUpload: (fileUpload: FileUpload<Response>) => void;
};

/** A type for a function that can be called to upload a file and track it's progress. */
export type FileUploadService<Response> = (
  file: File,
  onProgress: (progress: number) => void
) => Promise<Response>;

export type FileUploaderObservers<Response = string> = {
  onFileUploadStart: (
    newFileUpload: FileUpload<Response>,
    isRetry: boolean
  ) => void;
  onFileProgressUpdate: (updatedFileUpload: FileUpload<Response>) => void;
  onFileUploadComplete: (completedFileUpload: FileUpload<Response>) => void;
};

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

export const useFileUploader = <Response = string>(
  networkService: FileUploadService<Response>,
  observers: FileUploaderObservers<Response>
  // onFileUploadStart: (
  //   newFileUpload: FileUpload<Response>,
  //   isRetry: boolean
  // ) => void,
  // onFileProgressUpdate: (id: string, progress: number) => void,
  // onFileUploadComplete: (completedFileUpload: FileUpload<Response>) => void
): FileUploader<Response> => {
  const { onFileUploadStart, onFileProgressUpdate, onFileUploadComplete } =
    observers;
  // const [inProgressFileUploads, setInProgressFileUploads] = useState<
  //   FileUpload<Response>[]
  // >([]);
  // const [completedFileUploads, setCompletedFileUploads] = useState<
  //   FileUpload<Response>[]
  // >([]);
  // const [failedFileUploads, setFailedFileUploads] = useState<
  //   FileUpload<Response>[]
  // >([]);

  // const removeCompletedFileUpload = (fileUpload: FileUpload<Response>) => {
  //   setCompletedFileUploads((prev) =>
  //     prev.filter((fu) => fu.id !== fileUpload.id)
  //   );
  // };

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
        // setInProgressFileUploads(update(updatedFileUpload));
      };

      const handleCompletion = (failed: boolean, responseBody?: Response) => {
        const completedFileUpload: FileUpload<Response> = {
          ...fileUpload,
          progress: 100,
          completed: true,
          failed,
          responseBody,
        };
        // setInProgressFileUploads(update(completedFileUpload));
        onFileUploadComplete(completedFileUpload);
        // setTimeout(() => {
        //   setInProgressFileUploads(remove(completedFileUpload));
        //   if (failed) {
        //     setFailedFileUploads(append(completedFileUpload));
        //   } else {
        //     setCompletedFileUploads(append(completedFileUpload));
        //   }
        // }, completedDelay);
      };

      // if (isRetry) {
      //   // setFailedFileUploads(remove(fileUpload));
      //   setInProgressFileUploads((prev) => [...prev, fileUpload]);
      // } else {
      //   setInProgressFileUploads(append(fileUpload));
      // }

      networkService(fileUpload.file, onProgress)
        .then((result) => handleCompletion(false, result))
        .catch(() => handleCompletion(true));
      onFileUploadStart(fileUpload, isRetry);
    },
    [networkService]
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
    // inProgressFileUploads,
    // completedFileUploads,
    // failedFileUploads,
    upload,
    // removeCompletedFileUpload,
  };
};

function generateGUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

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
