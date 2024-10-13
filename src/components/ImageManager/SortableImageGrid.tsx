import { DndContext, type DragEndEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import { Grid } from '@mui/material';
import { memo, useCallback } from 'react';
import { DefaultDraggableImagePreview } from './DefaultDraggableImagePreview';

const MemoizedDefaultDraggableImagePreview = memo(DefaultDraggableImagePreview);

export type SortableImageGridProps<ExtraImagePreviewProps> = {
  /** The image urls to be sorted. */
  value: string[];
  /** Called when an image needs to be moved from one position to another. */
  onMove: (from: number, to: number) => void;
  /** Called when an image needs to be delete. */
  onDelete: (index: number) => void;
} & BaseSortableImageGridProps<ExtraImagePreviewProps>;

export type RequiredImagePreviewProps = { index: number; imageUrl: string; onDelete: () => void; disabled: boolean };

export type BaseSortableImageGridProps<ExtraImagePreviewProps> = {
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

export const SortableImageGrid = <ExtraImagePreviewProps,>(
  props: SortableImageGridProps<ExtraImagePreviewProps>
): JSX.Element => {
  const { value: imageUrls, onMove, onDelete, disabled = false, slots = {}, slotProps = {} } = props;

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
          {imageUrls.map((imageUrl, index) => (
            <Grid item sm={6} md={2} key={imageUrl}>
              <ImagePreviewComponent
                index={index}
                imageUrl={imageUrl}
                onDelete={deleteAtIndex(index)}
                disabled={disabled}
                {...imagePreviewProps}
              />
            </Grid>
          ))}
        </Grid>
      </SortableContext>
    </DndContext>
  );
};
