import {
  type FileDropzoneDragActive,
  type FileDropzoneState,
  FileDropzoneStatus,
} from '../components/FileDropzone/types';
import { type Property } from 'csstype';

export type StatusColorOptions = {
  default?: Property.Color;
  dragActive?: Property.Color;
  disabled?: Property.Color;
  error?: Property.Color;
};

export const FileDropzoneStatusUtils = {
  errorStatuses: [FileDropzoneStatus.overloaded, FileDropzoneStatus.dragRejected],

  isError(status: FileDropzoneStatus) {
    return FileDropzoneStatusUtils.errorStatuses.includes(status);
  },

  getInfo(state: FileDropzoneState) {
    let status = FileDropzoneStatus.normal;
    if (state.disabled) {
      status = FileDropzoneStatus.disabled;
    } else if (state.hasTooManyFiles) {
      status = FileDropzoneStatus.overloaded;
    } else if (state.dragActive != null) {
      if (state.dragActive.hasRejectedFiles) {
        status = FileDropzoneStatus.dragRejected;
      } else {
        status = FileDropzoneStatus.dragActive;
      }
    }
    return {
      isError: FileDropzoneStatusUtils.isError(status),
      status,
    };
  },

  selectTitleColor(status: FileDropzoneStatus, colorOptions: StatusColorOptions): Property.Color {
    if (status === FileDropzoneStatus.disabled) return colorOptions.disabled ?? 'text.disabled';
    if (FileDropzoneStatusUtils.isError(status)) return colorOptions.error ?? 'error';
    if (status === FileDropzoneStatus.dragActive) return colorOptions.dragActive ?? 'primary.main';
    return colorOptions.default ?? 'text.main';
  },

  selectColor(status: FileDropzoneStatus, colorOptions: StatusColorOptions): Property.Color {
    if (status === FileDropzoneStatus.disabled) return colorOptions.disabled ?? 'text.disabled';
    if (FileDropzoneStatusUtils.isError(status)) return colorOptions.error ?? 'error';
    if (status === FileDropzoneStatus.dragActive) return colorOptions.dragActive ?? 'primary.main';
    return colorOptions.default ?? 'primary.main';
  },
};

export const FileDropzoneUtils = {
  selectTitleColor(state: FileDropzoneState, colorOptions: StatusColorOptions): Property.Color {
    const { status } = FileDropzoneStatusUtils.getInfo(state);
    return FileDropzoneStatusUtils.selectTitleColor(status, colorOptions);
  },

  selectColor(state: FileDropzoneState, colorOptions: StatusColorOptions): Property.Color {
    const { status } = FileDropzoneStatusUtils.getInfo(state);
    return FileDropzoneStatusUtils.selectColor(status, colorOptions);
  },

  isSameDragActive(
    dragActive1: FileDropzoneDragActive | undefined,
    dragActive2: FileDropzoneDragActive | undefined
  ): boolean {
    return dragActive1?.hasRejectedFiles === dragActive2?.hasRejectedFiles;
  },

  isSameState(state1: FileDropzoneState, state2: FileDropzoneState): boolean {
    return (
      FileDropzoneUtils.isSameDragActive(state1.dragActive, state2.dragActive) &&
      state1.hasTooManyFiles === state2.hasTooManyFiles
    );
  },
};
