import { useImageManagerContext } from './ImageManagerContext';
import { type BaseSortableImageGridProps, SortableImageGrid } from './SortableImageGrid';

/** A grid which can preview, reorder and removing images. Should only be used inside ImageManager */
export const ImageManagerPreviewGrid = <UploadResponse = string, ExtraImagePreviewProps = unknown>(
  props: BaseSortableImageGridProps<UploadResponse, ExtraImagePreviewProps>
): JSX.Element => {
  const context = useImageManagerContext<UploadResponse>();
  return <SortableImageGrid {...props} value={context.imageUrls} onMove={context.move} onDelete={context.delete} />;
};
