import { arrayMove } from '@dnd-kit/sortable';
import { useMemo, useState } from 'react';

export type ImageManagerState = {
  value: string[];
  onAdd: (url: string) => void;
  onMove: (from: number, to: number) => void;
  onDelete: (index: number) => void;
};

export const useImageManagerState = (defaultValue?: string[] | (() => string[])): ImageManagerState => {
  const [imageUrls, setImageUrls] = useState<string[]>(defaultValue ?? []);

  return useMemo(
    () => ({
      value: imageUrls,
      onAdd: (url) => {
        setImageUrls((p) => [...p, url]);
      },
      onMove: (from, to) => {
        setImageUrls((p) => arrayMove(p, from, to));
      },
      onDelete: (index) => {
        setImageUrls((p) => p.filter((_, i) => i !== index));
      },
    }),
    [imageUrls]
  );
};
