export type FileDropzoneDragActive = {
  hasRejectedFiles: boolean;
};

export type FileDropzoneState = {
  disabled: boolean;
  dragActive?: FileDropzoneDragActive;
  hasTooManyFiles: boolean;
};

export enum FileDropzoneStatus {
  normal,
  dragActive,
  overloaded,
  dragRejected,
  disabled,
}
