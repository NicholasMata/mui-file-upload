import { Box, SxProps, Theme, alpha } from '@mui/material';
import {
  ChangeEventHandler,
  DragEventHandler,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Accept, FileDropzoneUtils } from '../../utils';
import { FileDropzoneProvider } from './FileDropzoneContext';
import { FileDropzoneState } from './types';
import { DEFAULT_BACKGROUND_ALPHA, DEFAULT_BORDER_ALPHA, DEFAULT_DRAG_ACTIVE_BACKGROUND_ALPHA } from './contants';

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
  /** Whether the FileDropzone is disabled or not. Default: false*/
  disabled?: boolean;
};

const defaultSx: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'center',
};

const requiredDefaultSx: SxProps<Theme> = {
  position: 'relative',
};

type SxPropBuilder = (disabled: boolean) => SxProps<Theme>;

const dragActiveSx: SxPropBuilder = (disabled) => (t) => ({
  borderColor: disabled ? undefined : t.palette.primary.main,
  backgroundColor: disabled ? undefined : alpha(t.palette.primary.main, DEFAULT_DRAG_ACTIVE_BACKGROUND_ALPHA),
});

const dragActiveRejectedSx: SxProps<Theme> = (t) => ({
  borderColor: t.palette.error.main,
  backgroundColor: alpha(t.palette.error.main, DEFAULT_DRAG_ACTIVE_BACKGROUND_ALPHA),
});

const defaultDragZoneSx: SxPropBuilder = (disabled) => (t) => ({
  height: '100%',
  display: 'flex',
  alignItems: 'stretch',
  justifyContent: 'center',
  borderWidth: '2px',
  borderRadius: '1rem',
  borderStyle: 'dashed',
  borderColor: disabled ? t.palette.text.disabled : alpha(t.palette.primary.main, DEFAULT_BORDER_ALPHA),
  backgroundColor: alpha(disabled ? t.palette.text.disabled : t.palette.primary.main, DEFAULT_BACKGROUND_ALPHA),
});

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

const defaultFileDropzoneState = (disabled: boolean) => ({ hasTooManyFiles: false, disabled });

export const FileDropzone: React.FC<PropsWithChildren<FileDropzoneProps>> = ({
  allowsMultiple = true,
  acceptsOnly,
  sx,
  dragZoneSx,
  dropZoneSx,
  onFilesAccepted,
  onFilesRejected,
  disabled = false,
  children,
}) => {
  const [state, setState] = useState<FileDropzoneState>(defaultFileDropzoneState(disabled));

  const accept = useMemo(() => (acceptsOnly ? new Accept(acceptsOnly) : undefined), [acceptsOnly]);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag: DragEventHandler<HTMLElement> = function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      const newState = {
        dragActive: {
          hasRejectedFiles: false,
        },
        disabled,
        hasTooManyFiles: !allowsMultiple && e.dataTransfer.items.length > 1,
      };

      if (accept && e.dataTransfer.items.length > 0) {
        const rejectedFiles = Array.from(e.dataTransfer.items).filter((f) => !accept.acceptsMimeType(f.type));
        console.log('rejectedFiles', rejectedFiles)
        newState.dragActive.hasRejectedFiles = rejectedFiles.length > 0;
      }
      const stateChanged = !FileDropzoneUtils.isSameState(state, newState);
      if (stateChanged) setState(newState);
    } else if (e.type === 'dragleave') {
      setState(defaultFileDropzoneState(disabled));
    }
  };

  const handleDrop: DragEventHandler<HTMLElement> = function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files.length === 0 || disabled) {
      setState(defaultFileDropzoneState(disabled));
      return;
    }
    handleFiles(e.dataTransfer.files);
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = function (e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files: FileList) => {
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
    if (accept) {
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
  };

  const openFileSelector = useCallback(() => {
    inputRef.current?.click();
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

  const customDragZoneSx = useMemo(() => (dragZoneSx ? dragZoneSx(state) : null), [state, dragZoneSx]);

  return (
    <Box
      component='form'
      onDragEnter={handleDrag}
      onSubmit={(e) => e.preventDefault()}
      sx={[defaultSx, ...(Array.isArray(sx) ? sx : [sx]), requiredDefaultSx]}
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
      {/**
       * I can no longer remember why I opted for this new box instead of putting it on parent
       **/}
      <Box
        sx={[
          defaultDragZoneSx(disabled),
          state.dragActive ? dragActiveSx : null,
          state.dragActive?.hasRejectedFiles ? dragActiveRejectedSx : null,
          ...(Array.isArray(customDragZoneSx) ? customDragZoneSx : [customDragZoneSx]),
          state.hasTooManyFiles ? defaultDragZoneOverloadSx : null,
        ]}
      >
        <FileDropzoneProvider value={contextValue}>{children}</FileDropzoneProvider>
      </Box>
      {/**
       * I can no longer remember why I opted for this new box displaying
       * when file is dragged over it instead of putting triggers on the parent box.
       **/}
      {state.dragActive && (
        <Box
          sx={[
            defaultDropZoneSx,
            ...(Array.isArray(dropZoneSx) ? dropZoneSx : [dropZoneSx]),
            requiredDefaultDropZoneSx,
          ]}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        />
      )}
    </Box>
  );
};

export default FileDropzone;
