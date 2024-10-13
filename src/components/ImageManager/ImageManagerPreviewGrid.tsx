import { useImageManagerContext } from './ImageManagerContext';
import { type BaseSortableImageGridProps, SortableImageGrid } from './SortableImageGrid';

/** A grid which can preview, reorder and removing images. Should only be used inside ImageManager */
export const ImageManagerPreviewGrid = <ExtraImagePreviewProps,>(
  props: BaseSortableImageGridProps<ExtraImagePreviewProps>
): JSX.Element => {
  const context = useImageManagerContext();
  return <SortableImageGrid {...props} value={context.imageUrls} onMove={context.move} onDelete={context.delete} />;
};
