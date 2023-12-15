import { useCallback, useState } from 'react';

interface RejectedFileManager {
  /** An array of files that have been rejected and should not be uploaded. */
  rejectedFiles: File[];
  /** Add an array of files to `rejectedFiles` */
  addRejected: (files: File | File[]) => void;
  /** Remove a file from `rejectedFiles` */
  removeRejected: (files: File | File[]) => void;
}
export const useRejectedFileManager = (): RejectedFileManager => {
  const [rejectedFiles, setRejectedFiles] = useState<File[]>([]);

  const addRejected = useCallback(
    (files: File | File[]) => {
      setRejectedFiles(append(files));
    },
    [setRejectedFiles, append]
  );
  const removeRejected = useCallback(
    (file: File | File[]) => {
      setRejectedFiles(remove(file));
    },
    [setRejectedFiles, remove]
  );
  return {
    rejectedFiles,
    addRejected,
    removeRejected,
  };
};

function append(fileToAppend: File | File[]) {
  return (prev: File[]) => [...prev, ...(Array.isArray(fileToAppend) ? fileToAppend : [fileToAppend])];
}

function remove(fileToRemove: File | File[]) {
  return (prev: File[]) =>
    Array.isArray(fileToRemove)
      ? prev.filter((p) => !fileToRemove.includes(p))
      : prev.filter((p) => p !== fileToRemove);
}
