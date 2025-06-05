import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import { AssignmentLate, TaskTwoTone, UploadFileTwoTone } from '@mui/icons-material';
import { FileDropzoneStatusUtils } from '../../utils';
import { useFileDropzoneContext } from './hooks';
import { type ReactNode, useMemo } from 'react';
import {
  DEFAULT_BROWSE_FILES_TITLE,
  DEFAULT_FILE_DRAG_REJECTED_TITLE,
  DEFAULT_FILE_DROPZONE_DISABLED,
  DEFAULT_FILE_OVERLOAD_TITLE,
  getDefaultBodyTitle,
  getDefaultDropBodyTitle,
} from './contants';
import { FileDropzoneStatus } from './types';

export type FileDropzoneBodyProps = {
  /** The default title of the zone. */
  title?: ReactNode;
  /** The title of the button that will open the file selector dialog. */
  openFileSelectorTitle?: ReactNode;
  /**
   * The title of the zone that will be displayed when something can be dropped on it.
   */
  dropTitle?: ReactNode;
  /** The title when the there are not many files in the dropzone. */
  fileOverloadTitle?: ReactNode;
  /** The title when invalid file types are being dragged over the zone. */
  dragRejectedTitle?: ReactNode;
  /** The title when the dropzone is disabled */
  disabledTitle?: ReactNode | ((dragActive: boolean) => ReactNode);
};

export const FileDropzoneBody = (props: FileDropzoneBodyProps): JSX.Element => {
  const { dropzoneState, openFileSelector, accept, allowsMultiple } = useFileDropzoneContext();
  const { disabled } = dropzoneState;

  const {
    title: normalTitle = getDefaultBodyTitle(allowsMultiple),
    openFileSelectorTitle = DEFAULT_BROWSE_FILES_TITLE,
    dropTitle = getDefaultDropBodyTitle(allowsMultiple),
    fileOverloadTitle = DEFAULT_FILE_OVERLOAD_TITLE,
    dragRejectedTitle = DEFAULT_FILE_DRAG_REJECTED_TITLE,
    disabledTitle: disabledTitleFn = DEFAULT_FILE_DROPZONE_DISABLED,
  } = props;

  const disabledTitle = useMemo(
    () => (typeof disabledTitleFn === 'function' ? disabledTitleFn(dropzoneState.dragActive != null) : disabledTitleFn),
    [dropzoneState.dragActive, disabledTitleFn]
  );

  const { status, isError } = useMemo(() => FileDropzoneStatusUtils.getInfo(dropzoneState), [dropzoneState]);

  const acceptsFile = useMemo(() => accept?.toString().toLocaleUpperCase(), [accept]);

  const { title, icon, titleColor } = useMemo(() => {
    switch (status) {
      case FileDropzoneStatus.normal:
        return {
          title: normalTitle,
          icon: <UploadFileTwoTone fontSize='inherit' color='primary' />,
          titleColor: 'text.primary',
        };
      case FileDropzoneStatus.dragActive:
        return {
          title: dropTitle,
          icon: <TaskTwoTone fontSize='inherit' color='primary' />,
          titleColor: 'primary',
        };
      case FileDropzoneStatus.overloaded:
        return {
          title: fileOverloadTitle,
          icon: <AssignmentLate fontSize='inherit' color='error' />,
          titleColor: 'error',
        };
      case FileDropzoneStatus.dragRejected:
        return {
          title: dragRejectedTitle,
          icon: <AssignmentLate fontSize='inherit' color='error' />,
          titleColor: 'error',
        };
      case FileDropzoneStatus.disabled:
        return {
          title: disabledTitle,
          icon: <UploadFileTwoTone fontSize='inherit' sx={{ color: 'text.disabled' }} />,
          titleColor: 'text.disabled',
        };
    }
  }, [status, normalTitle, dropTitle, fileOverloadTitle, dragRejectedTitle, disabledTitle]);

  return (
    <Stack spacing={2} padding={5} alignItems='center' justifyContent='center'>
      <Stack>
        <Typography variant='h3'>{icon}</Typography>
        <Typography color={titleColor}>{title}</Typography>
        {acceptsFile != null && (
          <Box>
            <Typography variant='caption' color='text.secondary' display='inline-block'>
              Supports:
            </Typography>
            <Typography
              variant='caption'
              fontWeight={700}
              color='text.secondary'
              display='inline-block'
              sx={{ mx: 0.5 }}
            >
              {acceptsFile}
            </Typography>
          </Box>
        )}
      </Stack>
      <Divider
        sx={(t) => ({
          width: '80%',
          '&::before, &::after': {
            border: disabled ? `0.1px solid ${t.palette.text.disabled}` : '0.1px solid gray',
          },
        })}
      >
        <Typography color={disabled ? 'text.disabled' : 'text.primary'}>OR</Typography>
      </Divider>
      <Button
        disabled={disabled}
        variant='outlined'
        color={isError ? 'error' : undefined}
        onClick={openFileSelector}
        className='upload-button'
      >
        {openFileSelectorTitle}
      </Button>
    </Stack>
  );
};

export default FileDropzoneBody;
