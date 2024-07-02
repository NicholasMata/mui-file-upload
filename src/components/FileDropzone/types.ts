export type FileDropzoneDragActive = {
  /** A boolean indicating if the files currently being dragged over the FileDropzone would be rejected. */
  hasRejectedFiles: boolean;
};

export type FileDropzoneState = {
  /** Whether the FileDropzone is disabled or not. */
  disabled: boolean;
  /** A value which is defined when a file is dragged over the FileDropzone and undefined otherwise. */
  dragActive?: FileDropzoneDragActive;
  /** A boolean indicating if too many files are dragged over the FileDropzone. */
  hasTooManyFiles: boolean;
};

export enum FileDropzoneStatus {
  normal,
  dragActive,
  overloaded,
  dragRejected,
  disabled,
}
