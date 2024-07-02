import { createContext, useContext } from 'react';

export type ImageManagerContext = {
  imageUrls: string[];
  move: (from: number, to: number) => void;
  delete: (index: number) => void;
};

export const ImageManagerContextInner = createContext<ImageManagerContext | undefined>(undefined);

export const useImageManagerContext = (): ImageManagerContext => {
  const context = useContext(ImageManagerContextInner);
  if (context === undefined) {
    throw new Error('useImageManagerContext must be inside an ImageManager');
  }
  return context;
};
