import { type ReactNode } from 'react';
import { type FileUploadService, type FileUploadManager } from '../../hooks';
import { type FileUpload } from '../../types';
import { type SxProps, type Theme } from '@mui/material';
import { type FileDropzoneState } from '../FileDropzone/types';
import { type MinimumMUIFieldProps } from '../types';

export type BaseFileUploadProps<Response = string> = {
  /** A service that is responsible for handling file uploads. */
  uploadService: FileUploadService<Response>;
  /** Called when a upload was successful. If this is provided then successful file uploads need to be rendered externally. */
  onSuccessfulUpload?: (fileUpload: FileUpload<Response>) => void;
  /**
   * Returns a custom status label for a file upload e.g. "Uploading", "Failed" or "Completed".
   * @param fileUpload File upload for which the status should be formatted
   * @returns Status label for the file upload
   */
  statusFormatter?: (fileUpload: FileUpload<Response>) => string;
  /** A file manager responsible for handling different states.  */
  fileManager?: FileUploadManager<Response>;
  /** A accept string which states which file types are allowed to be uploaded. */
  acceptsOnly?: string;
  /** The FileDropzone body component */
  body?: ReactNode;
  /** sx that will applied to the FileDropzone */
  sx?: FileUploadSx;
} & MinimumMUIFieldProps;

export type FileUploadSx = {
  /** Allows defining system overrides as well as additional CSS styles for the root container. **/
  sx?: SxProps<Theme>;
  /** Allows defining system overrides as well as additional CSS styles for the drag zone container. **/
  dragZoneSx?: (state: FileDropzoneState) => SxProps<Theme>;
  /** Allows defining system overrides as well as additional CSS styles for the drop zone container. **/
  dropZoneSx?: SxProps<Theme>;
};
