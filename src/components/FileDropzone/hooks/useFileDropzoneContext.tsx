import { useContext } from 'react';
import { FileDropzoneContext, type FileDropzoneContextType } from '../FileDropzoneContext';

export const useFileDropzoneContext = (): FileDropzoneContextType => {
  const context = useContext(FileDropzoneContext);
  if (context == null) throw new Error("'useFileDropzoneContext' can only be used inside a 'FileDropzone' component");
  return context;
};
