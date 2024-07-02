import { DndContext, type DragEndEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import { Grid } from '@mui/material';
import { memo, useCallback } from 'react';
import { SortableImageDisplay } from './SortableImage';

const MemoizedSortableImageDisplay = memo(SortableImageDisplay);

export type SortableImageGridProps = {
  /** The image urls to be sorted. */
  value: string[];
  /** Called when an image needs to be moved from one position to another. */
  onMove: (from: number, to: number) => void;
  /** Called when an image needs to be delete. */
  onDelete: (index: number) => void;
  /**
   * Whether the grid should be disabled.
   *
   * @default
   * false
   **/
  disabled?: boolean;
};

export const buildId = (imageUrl: string, index: number): string => `${index}.${imageUrl}`;

export const SortableImageGrid = (props: SortableImageGridProps): JSX.Element => {
  const { value: imageUrls, onMove, onDelete, disabled = false } = props;

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
        <Grid container rowSpacing={2} columnSpacing={2}>
          {imageUrls.map((imageUrl, index) => (
            <Grid item sm={6} md={2} key={imageUrl}>
              <MemoizedSortableImageDisplay
                id={imageUrl}
                imageUrl={imageUrl}
                onDelete={deleteAtIndex(index)}
                disabled={disabled}
              />
            </Grid>
          ))}
        </Grid>
      </SortableContext>
    </DndContext>
  );
};
