import { Box, type SxProps, type Theme, alpha, Stack, FormHelperText } from '@mui/material';
import {
  type ChangeEventHandler,
  type DragEventHandler,
  type PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  forwardRef,
} from 'react';
import { Accept, FileDropzoneUtils } from '../../utils';
import { FileDropzoneProvider } from './FileDropzoneContext';
import { type FileDropzoneState } from './types';
import { DEFAULT_BACKGROUND_ALPHA, DEFAULT_BORDER_ALPHA, DEFAULT_DRAG_ACTIVE_BACKGROUND_ALPHA } from './contants';
import { type MinimumMUIFieldProps } from '../types';

export type FileDropzoneProps = {
  /** Whether of not the FileDropzone can handle multiple files. */
  allowsMultiple?: boolean;
  /** An accepts string indicating that the FileDropzone should only accept specific files. */
  acceptsOnly?: string;
  /** Allows defining system overrides as well as additional CSS styles to the applied to the top level container. */
  sx?: SxProps<Theme>;
  /**
   * Allows defining system overrides as well as additional CSS styles to the applied to container
   * around chilren this typically contains borders background color etc.
   * */
  dragZoneSx?: (state: FileDropzoneState) => SxProps<Theme>;
  /**
   * Allows defining system overrides as well as additional CSS styles to the container which the user is allowed to drop files onto
   * By default has no visible styling
   * */
  dropZoneSx?: SxProps<Theme>;
  /** Called when dropzone accepts valid files. */
  onFilesAccepted: (files: File[]) => void;
  /** Called when dropzone files are rejected. */
  onFilesRejected: (files: File[]) => void;
} & MinimumMUIFieldProps;

const defaultSx: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'center',
};

const requiredDefaultSx: SxProps<Theme> = {
  position: 'relative',
};

type SxPropBuilder = (disabled: boolean, error: boolean) => SxProps<Theme>;

const dragActiveSx: SxPropBuilder = (disabled, error) => (t) => {
  return {
    borderColor: disabled || error ? undefined : t.palette.primary.main,
    backgroundColor:
      disabled || error ? undefined : alpha(t.palette.primary.main, DEFAULT_DRAG_ACTIVE_BACKGROUND_ALPHA),
  };
};

const dragActiveRejectedSx: SxProps<Theme> = (t) => ({
  borderColor: t.palette.error.main,
  backgroundColor: alpha(t.palette.error.main, DEFAULT_DRAG_ACTIVE_BACKGROUND_ALPHA),
});

const defaultDragZoneSx: SxPropBuilder = (disabled, error) => (t) => {
  let color = t.palette.primary.main;
  if (error) {
    color = t.palette.error.main;
  } else if (disabled) {
    color = t.palette.text.disabled;
  }

  return {
    height: '100%',
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'center',
    borderWidth: '2px',
    borderRadius: '1rem',
    borderStyle: 'dashed',
    borderColor: alpha(color, DEFAULT_BORDER_ALPHA),
    backgroundColor: alpha(color, DEFAULT_BACKGROUND_ALPHA),
  };
};

const defaultDragZoneOverloadSx: SxProps<Theme> = (t) => ({
  borderColor: alpha(t.palette.error.main, DEFAULT_BORDER_ALPHA),
  backgroundColor: alpha(t.palette.error.main, DEFAULT_BACKGROUND_ALPHA),
});

const requiredDefaultDropZoneSx: SxProps<Theme> = {
  position: 'absolute',
  width: '100%',
  height: '100%',
  top: '0px',
  right: '0px',
  bottom: '0px',
  left: '0px',
};

const defaultDropZoneSx: SxProps<Theme> = {
  borderRadius: '1rem',
};

const defaultFileDropzoneState = (disabled: boolean): FileDropzoneState => ({ hasTooManyFiles: false, disabled });

export const FileDropzone = forwardRef(function FileDropzone(props: PropsWithChildren<FileDropzoneProps>, ref) {
  const {
    allowsMultiple = true,
    acceptsOnly,
    sx,
    dragZoneSx,
    dropZoneSx,
    onFilesAccepted,
    onFilesRejected,
    disabled = false,
    error = false,
    helperText,
    children,
  } = props;

  const [state, setState] = useState<FileDropzoneState>(defaultFileDropzoneState(disabled));

  const accept = useMemo(() => (acceptsOnly !== undefined ? new Accept(acceptsOnly) : undefined), [acceptsOnly]);

  const inputRef = useRef<HTMLInputElement>(null);

  // const handleRef = useForkRef(inputRef, ref);

  const previousEventType = useRef<string>();

  const handleDrag: DragEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();

      if (previousEventType.current === e.type) {
        return;
      }

      previousEventType.current = e.type;

      if (e.type === 'dragenter' || e.type === 'dragover') {
        const newState = {
          dragActive: {
            hasRejectedFiles: false,
          },
          disabled,
          hasTooManyFiles: !allowsMultiple && e.dataTransfer.items.length > 1,
        };

        if (accept !== undefined && e.dataTransfer.items.length > 0) {
          const rejectedFiles = Array.from(e.dataTransfer.items).filter((f) => !accept.acceptsMimeType(f.type));
          newState.dragActive.hasRejectedFiles = rejectedFiles.length > 0;
        }
        setState((prevState) => {
          const isSameState = FileDropzoneUtils.isSameState(prevState, newState);
          if (isSameState) {
            return prevState;
          }
          return newState;
        });
      } else if (e.type === 'dragleave') {
        setState(defaultFileDropzoneState(disabled));
      }
    },
    [allowsMultiple, disabled, accept]
  );

  const handleFiles = useCallback(
    (files: FileList): void => {
      console.log('Handle Files');
      const fileOverload = !allowsMultiple && files.length > 1;
      if (fileOverload) {
        setState((prev) => ({ ...prev, hasTooManyFiles: true }));
        // Delay state change for animations.
        setTimeout(() => {
          setState(defaultFileDropzoneState(disabled));
        }, 1000);
        return;
      }

      let acceptedFiles: File[] = [];
      let rejectedFiles: File[] = [];
      if (accept !== undefined) {
        const result = Array.from(files).reduce(
          (acc, file) => {
            if (accept.acceptsFilename(file.name)) {
              acc.acceptedFiles.push(file);
            } else {
              acc.rejectedFiles.push(file);
            }
            return acc;
          },
          { acceptedFiles: [] as File[], rejectedFiles: [] as File[] }
        );
        acceptedFiles = result.acceptedFiles;
        rejectedFiles = result.rejectedFiles;
      } else {
        acceptedFiles = Array.from(files);
      }

      if (acceptedFiles.length > 0) {
        onFilesAccepted(acceptedFiles);
      }
      if (rejectedFiles.length > 0) {
        onFilesRejected(rejectedFiles);
      }
      setState(defaultFileDropzoneState(disabled));
    },
    [allowsMultiple, disabled, accept, onFilesAccepted, onFilesRejected]
  );

  const handleDrop: DragEventHandler<HTMLElement> = useCallback(
    function (e) {
      e.preventDefault();
      e.stopPropagation();

      if (e.dataTransfer.files.length === 0 || disabled) {
        setState(defaultFileDropzoneState(disabled));
        return;
      }
      handleFiles(e.dataTransfer.files);
    },
    [disabled, handleFiles]
  );

  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    function (e) {
      console.log('handleChange', e);
      e.preventDefault();
      e.stopPropagation();

      const files = e.target.files;
      if (files != null && files.length > 0) {
        handleFiles(files);
      }
    },
    [handleFiles]
  );

  const openFileSelector = useCallback(() => {
    console.log('clicked');
    inputRef.current?.click();
    if (inputRef.current != null) inputRef.current.value = ''; // Believe this fixes issue where browse files stops working.
  }, [inputRef.current]);

  useEffect(() => {
    setState((p) => ({ ...p, disabled }));
  }, [disabled]);

  const contextValue = useMemo(
    () => ({
      dropzoneState: state,
      openFileSelector,
      accept,
      allowsMultiple,
      disabled,
    }),
    [state, openFileSelector, accept, allowsMultiple, disabled]
  );

  const customDragZoneSx = useMemo(() => dragZoneSx?.(state) ?? null, [state, dragZoneSx]);

  const helperTextComp = useMemo(() => {
    if (helperText === null || helperText === undefined) return undefined;

    return (
      <FormHelperText error={error} disabled={disabled}>
        {helperText}
      </FormHelperText>
    );
  }, [disabled, error, helperText]);

  return (
    <Stack spacing={0}>
      <Box
        id='testing'
        ref={ref}
        sx={[
          defaultSx,
          ...(Array.isArray(sx) ? sx : [sx]),
          requiredDefaultSx,
          defaultDropZoneSx,
          ...(Array.isArray(dropZoneSx) ? dropZoneSx : [dropZoneSx]),
        ]}
        onDragEnter={handleDrag}
      >
        <input
          disabled={disabled}
          ref={inputRef}
          type='file'
          multiple={allowsMultiple}
          accept={acceptsOnly}
          onChange={handleChange}
          style={{ display: 'none' }}
        />
        <Box
          sx={[
            defaultDragZoneSx(disabled, error),
            state.dragActive != null ? dragActiveSx(disabled, error) : null,
            state.dragActive?.hasRejectedFiles === true ? dragActiveRejectedSx : null,
            ...(Array.isArray(customDragZoneSx) ? customDragZoneSx : [customDragZoneSx]),
            state.hasTooManyFiles ? defaultDragZoneOverloadSx : null,
          ]}
        >
          <FileDropzoneProvider value={contextValue}>{children}</FileDropzoneProvider>
        </Box>
        {state.dragActive !== undefined && (
          <Box
            sx={[
              defaultDropZoneSx,
              ...(Array.isArray(dropZoneSx) ? dropZoneSx : [dropZoneSx]),
              requiredDefaultDropZoneSx,
            ]}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          />
        )}
      </Box>
      {helperTextComp}
    </Stack>
  );
});
