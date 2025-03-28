import { arrayMove } from '@dnd-kit/sortable';
import { useMemo, useState } from 'react';

export type ImageManagerState<UploadResponse = string> = {
  value: UploadResponse[];
  onAdd: (url: UploadResponse) => void;
  onMove: (from: number, to: number) => void;
  onDelete: (index: number) => void;
};

export const useImageManagerState = <UploadResponse = string>(
  defaultValue?: UploadResponse[] | (() => UploadResponse[])
): ImageManagerState<UploadResponse> => {
  const [imageUrls, setImageUrls] = useState<UploadResponse[]>(defaultValue ?? []);

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
