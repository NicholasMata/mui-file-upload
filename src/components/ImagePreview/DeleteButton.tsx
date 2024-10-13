import { Delete } from '@mui/icons-material';
import { Fab, type FabProps } from '@mui/material';

export type DeleteButtonProps = Omit<FabProps, 'children'>;

export const DeleteButton = ({ disabled, ...boxProps }: DeleteButtonProps): JSX.Element => {
  return (
    <Fab color='error' size='small' {...boxProps}>
      <Delete />
    </Fab>
  );
};
