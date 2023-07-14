import {
  FileDropzoneDragActive,
  FileDropzoneState,
  FileDropzoneStatus,
} from "../components/FileDropzone/types";

export class FileDropzoneStatusUtils {
  static errorStatuses = [
    FileDropzoneStatus.overloaded,
    FileDropzoneStatus.dragRejected,
  ];
  static isError(status: FileDropzoneStatus) {
    return FileDropzoneStatusUtils.errorStatuses.includes(status);
  }

  static getInfo(state: FileDropzoneState) {
    let status = FileDropzoneStatus.normal;
    if (state.hasTooManyFiles) {
      status = FileDropzoneStatus.overloaded;
    } else if (state.dragActive?.hasRejectedFiles === true) {
      status = FileDropzoneStatus.dragRejected;
    } else if (state.dragActive) {
      status = FileDropzoneStatus.dragActive;
    }
    return {
      isError: FileDropzoneStatusUtils.isError(status),
      status,
    };
  }
}
export class FileDropzoneUtils {
  static isSameDragActive(
    dragActive1: FileDropzoneDragActive | undefined,
    dragActive2: FileDropzoneDragActive | undefined
  ): boolean {
    return (
      dragActive1?.hasRejectedFiles === dragActive2?.hasRejectedFiles ||
      (!dragActive1 && !dragActive2)
    );
  }

  static isSameState(
    state1: FileDropzoneState,
    state2: FileDropzoneState
  ): boolean {
    return (
      FileDropzoneUtils.isSameDragActive(
        state1.dragActive,
        state2.dragActive
      ) && state1.hasTooManyFiles === state2.hasTooManyFiles
    );
  }
}
