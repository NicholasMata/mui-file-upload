import { DndContext, type DragEndEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import { Grid } from '@mui/material';
import { memo, useCallback, useMemo } from 'react';
import { DefaultDraggableImagePreview } from './DefaultDraggableImagePreview';

const MemoizedDefaultDraggableImagePreview = memo(DefaultDraggableImagePreview);

export type SortableImageGridProps<UploadResponse = string, ExtraImagePreviewProps = unknown> = {
  /** The image urls to be sorted. */
  value: UploadResponse[];
  /** Called when an image needs to be moved from one position to another. */
  onMove: (from: number, to: number) => void;
  /** Called when an image needs to be delete. */
  onDelete: (index: number) => void;
} & BaseSortableImageGridProps<UploadResponse, ExtraImagePreviewProps>;

export type RequiredImagePreviewProps = {
  index: number;
  imageUrl: string;
  fullSizeImageUrl?: string;
  onDelete: () => void;
  disabled: boolean;
};

export type BaseSortableImageGridProps<UploadResponse = string, ExtraImagePreviewProps = unknown> = {
  /**
   * Can be used to get image url from a UploadResponse which is not a string.
   * IS NOT REQUIRED IF UploadResponse is a string
   */
  getImageUrl?: (uploadResponse: UploadResponse) => string;

  /**
   * Can be used to specify a different image url for the fullscreen / full size image preview.
   */
  getFullSizeImageUrl?: (uploadResponse: UploadResponse) => string;

  /**
   * Whether the grid should be disabled.
   *
   * @default
   * false
   **/
  disabled?: boolean;

  slots?: {
    imagePreview?: React.ComponentType<RequiredImagePreviewProps & ExtraImagePreviewProps>;
  };

  slotProps?: {
    imagePreview?: ExtraImagePreviewProps;
  };
};

export const buildId = (imageUrl: string, index: number): string => `${index}.${imageUrl}`;

export const defaultGetImageUrl = <UploadResponse = string,>(uploadResponse: UploadResponse): string => {
  if (typeof uploadResponse !== 'string')
    throw new Error('value provided to SortableImageGrid is a not a string define `getImageUrl` to correct the issue.');
  return uploadResponse;
};

export const SortableImageGrid = <UploadResponse = string, ExtraImagePreviewProps = unknown>(
  props: SortableImageGridProps<UploadResponse, ExtraImagePreviewProps>
): JSX.Element => {
  const {
    value,
    onMove,
    onDelete,
    getImageUrl,
    getFullSizeImageUrl,
    disabled = false,
    slots = {},
    slotProps = {},
  } = props;

  const imageUrls = useMemo(() => value.map(getImageUrl ?? defaultGetImageUrl), [value, getImageUrl]);

  const ImagePreviewComponent = slots.imagePreview ?? MemoizedDefaultDraggableImagePreview;
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const imagePreviewProps: ExtraImagePreviewProps = slotProps.imagePreview ?? ({} as ExtraImagePreviewProps);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragEnd = ({ active, over }: DragEndEvent): void => {
    const from = imageUrls.findIndex((item) => item === active.id);
    const to = imageUrls.findIndex((item) => item === over?.id);
    if (from === -1 || to === -1) return;
    onMove(from, to);
  };

  const deleteAtIndex = useCallback(
    (index: number) => () => {
      onDelete(index);
    },
    [onDelete]
  );

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <SortableContext items={imageUrls} disabled={disabled}>
        <Grid container rowSpacing={3} columnSpacing={3}>
          {imageUrls.map((imageUrl, index) => {
            const response = value[index];
            const fullSizeImageUrl = response !== undefined ? getFullSizeImageUrl?.(response) ?? imageUrl : imageUrl;
            return (
              <Grid item sm={6} md={2} key={imageUrl}>
                <ImagePreviewComponent
                  index={index}
                  imageUrl={imageUrl}
                  fullSizeImageUrl={fullSizeImageUrl}
                  onDelete={deleteAtIndex(index)}
                  disabled={disabled}
                  {...imagePreviewProps}
                />
              </Grid>
            );
          })}
        </Grid>
      </SortableContext>
    </DndContext>
  );
};
