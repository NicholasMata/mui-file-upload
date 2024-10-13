import { MoreVert } from '@mui/icons-material';
import { IconButton, type IconButtonProps, Menu, MenuItem, type MenuProps, type PopoverProps } from '@mui/material';
import { type ReactNode, useState } from 'react';

export type OptionMenuItem = {
  label: ReactNode;
  action: (event: React.MouseEvent<HTMLLIElement>) => boolean | undefined | void;
};

export type OptionsButtonProps = {
  options: OptionMenuItem[];
  slotProps?: {
    menu: MenuProps;
  };
} & IconButtonProps;

export const OptionsButton = (props: OptionsButtonProps): JSX.Element => {
  const { options, onClick, slotProps, ...buttonProps } = props;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
    onClick?.(event);
  };

  const handleClose: PopoverProps['onClose'] = (e, reason): void => {
    setAnchorEl(null);
    slotProps?.menu.onClose?.(e, reason);
  };

  return (
    <div>
      <IconButton
        aria-label='more'
        id='long-button'
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup='true'
        {...buttonProps}
        onClick={handleClick}
      >
        <MoreVert />
      </IconButton>
      <Menu
        id='long-menu'
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        {...slotProps?.menu}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {options.map((option, index) => (
          <MenuItem
            key={index}
            onClick={(e) => {
              const result = option.action(e);
              if (result !== undefined && result) setAnchorEl(null);
            }}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};
