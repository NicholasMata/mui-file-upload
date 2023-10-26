import { ReactNode } from "react";
import { FileUploadService, FileUploadManager } from "../../hooks";
import { FileUpload } from "../../types";
import { SxProps, Theme } from "@mui/material";
import { FileDropzoneState } from "../FileDropzone/types";

export type BaseFileUploadProps<Response = string> = {
  /** A service that is responsible for handling file uploads. */
  uploadService: FileUploadService<Response>;
  /** Called when a upload was successful. If this is provided then successful file uploads need to be rendered externally. */
  onSuccessfulUpload?: (fileUpload: FileUpload<Response>) => void;
  /** A file manager responsible for handling different states.  */
  fileManager?: FileUploadManager<Response>;
  /** A accept string which states which file types are allowed to be uploaded. */
  acceptsOnly?: string;
  /** The FileDropzone body component */
  body?: ReactNode;
  /** sx that will applied to the FileDropzone */
  sx?: FileUploadSx;
};

type FileUploadSx = {
  /** Allows defining system overrides as well as additional CSS styles for the root container. **/ 
  sx?: SxProps<Theme>;
  /** Allows defining system overrides as well as additional CSS styles for the drag zone container. **/ 
  dragZoneSx?: (state: FileDropzoneState) => SxProps<Theme>;
  /** Allows defining system overrides as well as additional CSS styles for the drop zone container. **/ 
  dropZoneSx?: SxProps<Theme>;
}
