import { Link, type SxProps, type Theme, Typography } from '@mui/material';
import { type ReactNode, useMemo } from 'react';
import { useFileDropzoneContext } from './hooks';
import {
  DEFAULT_CLICK_TO_UPLOAD_TITLE,
  DEFAULT_FILE_DRAG_REJECTED_TITLE,
  DEFAULT_FILE_DROPZONE_DISABLED,
  DEFAULT_FILE_OVERLOAD_TITLE,
  getDefaultBodyTitle,
  getDefaultDropBodyTitle,
} from './contants';
import { FileDropzoneStatus } from './types';
import { FileDropzoneStatusUtils } from '../../utils';

export type FileDropzoneInputBodyProps = {
  /** The title of the input. Will be prefixed with "Click to upload " */
  title?: ReactNode;
  /** The title of the button that will open the file selector dialog. */
  openFileSelectorTitle?: ReactNode;
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

export const FileDropzoneInputBody = (props: FileDropzoneInputBodyProps): JSX.Element => {
  const { dropzoneState, openFileSelector, allowsMultiple } = useFileDropzoneContext();
  const { disabled } = dropzoneState;
  const {
    title = `or ${getDefaultBodyTitle(allowsMultiple).toLowerCase()}`,
    openFileSelectorTitle = DEFAULT_CLICK_TO_UPLOAD_TITLE,
    dropTitle = `or ${getDefaultDropBodyTitle(allowsMultiple).toLowerCase()}`,
    fileOverloadTitle = DEFAULT_FILE_OVERLOAD_TITLE,
    dragRejectedTitle = DEFAULT_FILE_DRAG_REJECTED_TITLE,
    disabledTitle: disabledTitleFn = DEFAULT_FILE_DROPZONE_DISABLED,
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
  }, [status, isError, disabled, fileOverloadTitle, dragRejectedTitle, disabledTitle, dropTitle, title]);

  return (
    <Typography
      paddingX={2}
      paddingY={1}
      color={isError ? 'error' : disabled ? 'text.disabled' : 'inherit'}
      minWidth={400}
      sx={sx}
    >
      {!isError && !disabled && (
        <Link sx={{ cursor: 'pointer' }} onClick={openFileSelector}>
          {openFileSelectorTitle}
        </Link>
      )}{' '}
      {titleComponent}
    </Typography>
  );
};
