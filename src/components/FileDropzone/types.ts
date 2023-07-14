export type FileDropzoneDragActive = {
  hasRejectedFiles: boolean;
};

export type FileDropzoneState = {
  dragActive?: FileDropzoneDragActive;
  hasTooManyFiles: boolean;
};

export enum FileDropzoneStatus {
  normal,
  dragActive,
  overloaded,
  dragRejected,
}