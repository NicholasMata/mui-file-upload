import { useImageManagerContext } from './ImageManagerContext';
import { SortableImageGrid } from './SortableImageGrid';

/** A grid which can preview, reorder and removing images. Should only be used inside ImageManager */
export const ImageManagerPreviewGrid = (): JSX.Element => {
  const context = useImageManagerContext();
  return <SortableImageGrid value={context.imageUrls} onMove={context.move} onDelete={context.delete} />;
};
