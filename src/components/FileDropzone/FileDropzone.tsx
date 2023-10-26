import { Box, SxProps, Theme, alpha } from "@mui/material";
import {
  ChangeEventHandler,
  DragEventHandler,
  PropsWithChildren,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import { Accept, FileDropzoneUtils } from "../../utils";
import { FileDropzoneProvider } from "./FileDropzoneContext";
import { FileDropzoneState } from "./types";

export type FileDropzoneProps = {
  /** Whether of not the FileDropzone can handle multiple files. */
  allowsMultiple?: boolean;
  /** An accepts string indicating that the FileDropzone should only accept specific files. */
  acceptsOnly?: string;
  /** The system prop that allows defining system overrides as well as additional CSS styles. */
  sx?: SxProps<Theme>;
  /** The drag zone system prop that allows defining system overrides as well as additional CSS styles. */
  dragZoneSx?: (state: FileDropzoneState) => SxProps<Theme>;
  /** The drop zone system prop that allows defining system overrides as well as additional CSS styles. */
  dropZoneSx?: SxProps<Theme>;
  /** Called when dropzone accepts valid files. */
  onFilesAccepted: (files: File[]) => void;
  /** Called when dropzone files are rejected. */
  onFilesRejected: (files: File[]) => void;
};

const defaultSx: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  textAlign: "center",
};

const requiredDefaultSx: SxProps<Theme> = {
  position: "relative",
};

const dragActiveSx: SxProps<Theme> = (t) => ({
  borderColor: t.palette.primary.main,
  backgroundColor: alpha(t.palette.primary.main, 0.1),
});

const dragActiveRejectedSx: SxProps<Theme> = (t) => ({
  borderColor: t.palette.error.main,
  backgroundColor: alpha(t.palette.error.main, 0.1),
});
const defaultDragZoneSx: SxProps<Theme> = (t) => ({
  height: "100%",
  display: "flex",
  alignItems: "stretch",
  justifyContent: "center",
  borderWidth: "2px",
  borderRadius: "1rem",
  borderStyle: "dashed",
  borderColor: alpha(t.palette.primary.main, 0.5),
  backgroundColor: alpha(t.palette.primary.main, 0.03),
});

const defaultDragZoneOverloadSx: SxProps<Theme> = (t) => ({
  borderColor: alpha(t.palette.error.main, 0.5),
  backgroundColor: alpha(t.palette.error.main, 0.03),
});

const requiredDefaultDropZoneSx: SxProps<Theme> = {
  position: "absolute",
  width: "100%",
  height: "100%",
  top: "0px",
  right: "0px",
  bottom: "0px",
  left: "0px",
}

const defaultDropZoneSx: SxProps<Theme> = {
  borderRadius: "1rem",
};

const defaultFileDropzoneState = { hasTooManyFiles: false };

export const FileDropzone: React.FC<PropsWithChildren<FileDropzoneProps>> = ({
  allowsMultiple = true,
  acceptsOnly,
  sx,
  dragZoneSx,
  dropZoneSx,
  onFilesAccepted,
  onFilesRejected,
  children,
}) => {
  const [state, setState] = useState<FileDropzoneState>(
    defaultFileDropzoneState
  );

  const accept = useMemo(
    () => (acceptsOnly ? new Accept(acceptsOnly) : undefined),
    [acceptsOnly]
  );

  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag: DragEventHandler<HTMLElement> = function(e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      const newState = {
        dragActive: {
          hasRejectedFiles: false,
        },
        hasTooManyFiles: !allowsMultiple && e.dataTransfer.items.length > 1,
      };

      if (accept && e.dataTransfer.items.length > 0) {
        const rejectedFiles = Array.from(e.dataTransfer.items).filter(
          (f) => !accept.acceptsMimeType(f.type)
        );
        newState.dragActive.hasRejectedFiles = rejectedFiles.length > 0;
      }
      const stateChanged = !FileDropzoneUtils.isSameState(state, newState);
      if (stateChanged) setState(newState);
    } else if (e.type === "dragleave") {
      setState(defaultFileDropzoneState);
    }
  };

  const handleDrop: DragEventHandler<HTMLElement> = function(e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files.length === 0) {
      setState(defaultFileDropzoneState);
      return;
    }
    handleFiles(e.dataTransfer.files);
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = function(e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files: FileList) => {
    const fileOverload = !allowsMultiple && files.length > 1;
    if (fileOverload) {
      setState((prev) => ({ ...prev, hasTooManyFiles: true }));
    } else {
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
    }
    // Delay state change for animations.
    setTimeout(() => {
      setState(defaultFileDropzoneState);
    }, 500);
  };

  const openFileSelector = useCallback(() => {
    inputRef.current?.click();
  }, [inputRef.current]);

  const contextValue = useMemo(
    () => ({
      dropzoneState: state,
      openFileSelector,
      accept,
      allowsMultiple,
    }),
    [state, openFileSelector, accept, allowsMultiple]
  );

  const customDragZoneSx = useMemo(() => dragZoneSx ? dragZoneSx(state) : null, [state, dragZoneSx]);

  return (
    <Box
      component="form"
      onDragEnter={handleDrag}
      onSubmit={(e) => e.preventDefault()}
      sx={[defaultSx, ...(Array.isArray(sx) ? sx : [sx]), requiredDefaultSx]}
    >
      <input
        ref={inputRef}
        type="file"
        id="input-file-upload"
        multiple={allowsMultiple}
        accept={acceptsOnly}
        onChange={handleChange}
        style={{ display: "none" }}
      />
      <Box
        component="label"
        htmlFor="input-file-upload"
        sx={[
          defaultDragZoneSx,
          state.dragActive ? dragActiveSx : null,
          state.dragActive?.hasRejectedFiles ? dragActiveRejectedSx : null,
          ...(Array.isArray(customDragZoneSx) ? customDragZoneSx : [customDragZoneSx]),
          state.hasTooManyFiles ? defaultDragZoneOverloadSx : null,
        ]}
      >
        <FileDropzoneProvider value={contextValue}>
          {children}
        </FileDropzoneProvider>
      </Box>
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
