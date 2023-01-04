import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { IconButton, Menu, MenuItem } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import modalSlice from '../../redux/slices/modalSlice';

const style = {
  menuItem: {
    justifyContent: 'center',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#5f5f5f',
    },
  },
};

const TableMoreBtn = ({ id, nickname }) => {
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleOpenUpdateModal = () => {
    const args = { id, nickname };
    dispatch(modalSlice.actions.openUpdateModal(args));
  };

  const handleOpenDelModal = () => {
    const args = { id, nickname };
    dispatch(modalSlice.actions.openDelModal(args));
  };

  return (
    <>
      <IconButton
        id="more-button"
        aria-label="more"
        aria-controls={open ? 'more-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        sx={{ color: '#fff' }}
      >
        <ExpandMoreIcon />
      </IconButton>
      <Menu
        id="more-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: 48 * 4.5,
            width: '8ch',
            backgroundColor: '#3f3f3f',
          },
        }}
      >
        <MenuItem onClick={handleOpenUpdateModal} sx={style.menuItem}>
          수정
        </MenuItem>
        <MenuItem onClick={handleOpenDelModal} sx={style.menuItem}>
          삭제
        </MenuItem>
      </Menu>
    </>
  );
};

export default TableMoreBtn;
