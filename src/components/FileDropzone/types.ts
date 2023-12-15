export interface FileDropzoneDragActive {
  hasRejectedFiles: boolean;
}

export interface FileDropzoneState {
  disabled: boolean;
  dragActive?: FileDropzoneDragActive;
  hasTooManyFiles: boolean;
}

export enum FileDropzoneStatus {
  normal,
  dragActive,
  overloaded,
  dragRejected,
  disabled,
}
