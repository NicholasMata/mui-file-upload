import { ReactNode } from "react";
import { FileUploadService, FileUploadManager } from "../../hooks";
import { FileUpload } from "../../types";

export type BaseFileUploadProps<Response = string> = {
  /** A service that is responsible for handling file uploads. */
  uploadService: FileUploadService<Response>;
  /** Called when a upload was successful. If this is provided then successful file uploads need to be rendered externally. */
  onSuccessfulUpload?: (fileUpload: FileUpload<Response>) => void;
  /** A file manager responsible for handling different states.  */
  fileManager?: FileUploadManager<Response>;
  /** A accept string which states which file types are allowed to be uploaded. */
  acceptsOnly?: string;

  body?: ReactNode;
};
