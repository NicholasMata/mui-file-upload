import { createContext, type ProviderProps, useContext } from 'react';

export type ImageManagerContext<UploadResponse = unknown> = {
  imageUrls: UploadResponse[];
  move: (from: number, to: number) => void;
  delete: (index: number) => void;
};

const ImageManagerContextInner = createContext<ImageManagerContext | undefined>(undefined);

export const ImageManagerProvider = <UploadResponse = string,>({
  value,
  children,
}: ProviderProps<ImageManagerContext<UploadResponse>>): JSX.Element => {
  return <ImageManagerContextInner.Provider value={value}>{children}</ImageManagerContextInner.Provider>;
};

export const useImageManagerContext = <UploadResponse = string,>(): ImageManagerContext<UploadResponse> => {
  const context = useContext(ImageManagerContextInner);
  if (context === undefined) {
    throw new Error('useImageManagerContext must be inside an ImageManager');
  }
  return context as ImageManagerContext<UploadResponse>;
};
