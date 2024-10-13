import { useSortable } from '@dnd-kit/sortable';
import { type PropsWithChildren } from 'react';
import { CSS } from '@dnd-kit/utilities';

export type DraggableContainerProps = PropsWithChildren<{ id: string }>;

export const DraggableContainer = (props: DraggableContainerProps): JSX.Element => {
  const { id, children } = props;
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id,
  });
  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} {...listeners} {...attributes} style={style}>
      {children}
    </div>
  );
};
