import { useContext } from "react";
import { FileDropzoneContext } from "../FileDropzoneContext";

export const useFileDropzoneContext = () => {
  const context = useContext(FileDropzoneContext);
  if (!context)
    throw new Error(
      "'useFileDropzoneContext' can only be used inside a 'FileDropzone' component"
    );
  return context;
};
