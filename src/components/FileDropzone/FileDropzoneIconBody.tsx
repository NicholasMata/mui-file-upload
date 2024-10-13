import { AssignmentLate, TaskTwoTone, UploadFileTwoTone } from '@mui/icons-material';
import { type SxProps, type Theme, Stack } from '@mui/material';
import { type ReactNode, useMemo } from 'react';
import { useFileDropzoneContext } from './hooks';
import { FileDropzoneStatusUtils, mergeSx } from '../../utils';
import { FileDropzoneStatus } from './types';

export type FileDropzoneIconBodyProps = {
  /** The title of the input. Will be prefixed with "Click to upload " */
  title?: ReactNode;
  /**
   * The title of the input that will be displayed when something can be dropped on it.
   * Will be prefixed with "Click to upload "
   * */
  dropTitle?: ReactNode;
  /** The title when the there are not many files in the dropzone. */
  fileOverloadTitle?: ReactNode;
  /** The title when invalid file types are being dragged over the zone. */
  dragRejectedTitle?: ReactNode;
  /** The title when the dropzone is disabled */
  disabledTitle?: ReactNode | ((dragActive: boolean) => ReactNode);
  /** The system prop that allows defining system overrides as well as additional CSS styles. */
  sx?: SxProps<Theme>;
};

export const FileDropzoneIconBody: React.FC<FileDropzoneIconBodyProps> = (props: FileDropzoneIconBodyProps) => {
  const { dropzoneState, openFileSelector } = useFileDropzoneContext();
  const { disabled } = dropzoneState;
  const {
    title = <UploadFileTwoTone fontSize='inherit' color='primary' />,
    dropTitle = <TaskTwoTone fontSize='inherit' color='primary' />,
    fileOverloadTitle = <AssignmentLate fontSize='inherit' color='error' />,
    dragRejectedTitle = <AssignmentLate fontSize='inherit' color='error' />,
    disabledTitle: disabledTitleFn = <UploadFileTwoTone fontSize='inherit' sx={{ color: 'text.disabled' }} />,
    sx,
  } = props;

  const disabledTitle = useMemo(
    () => (typeof disabledTitleFn === 'function' ? disabledTitleFn(dropzoneState.dragActive != null) : disabledTitleFn),
    [dropzoneState.dragActive, disabledTitleFn]
  );

  const { status, isError } = useMemo(() => FileDropzoneStatusUtils.getInfo(dropzoneState), [dropzoneState]);

  const titleComponent = useMemo(() => {
    switch (status) {
      case FileDropzoneStatus.overloaded:
        return fileOverloadTitle;
      case FileDropzoneStatus.dragRejected:
        return dragRejectedTitle;
      case FileDropzoneStatus.disabled:
        return disabledTitle;
      case FileDropzoneStatus.dragActive:
        return dropTitle;
      default:
        return title;
    }
  }, [status, fileOverloadTitle, dragRejectedTitle, disabledTitle, dropTitle, title]);

  return (
    <Stack
      flexGrow={1}
      alignItems='center'
      justifyContent='center'
      onClick={openFileSelector}
      color={isError ? 'error' : disabled ? 'text.disabled' : 'inherit'}
      sx={mergeSx({ cursor: 'pointer', fontSize: 35 }, sx)}
    >
      {titleComponent}
    </Stack>
  );
};
