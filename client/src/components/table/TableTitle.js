import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { Button, Menu, MenuItem } from '@mui/material';

import CustomTableCell from './CustomTableCell';
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

const TableTitle = ({ index, id, nickname, page }) => {
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenUpdateModal = () => {
    const args = { id, nickname, page };
    dispatch(modalSlice.actions.openUpdateModal(args));
  };

  const handleOpenDelModal = () => {
    const args = { id, nickname, page };
    dispatch(modalSlice.actions.openDelModal(args));
  };

  return (
    <>
      <CustomTableCell
        bgColor="#212121"
        fontColor="#fff"
        fontSize={16}
        minWidth={130}
        fontWeight={700}
        align="center"
      >
        <Button
          sx={{
            fontWeight: 700,
            fontSize: 14,
            color: '#fff',
            '&:hover': {
              backgroundColor: '#3f3f3f',
            },
          }}
          onClick={handleClick}
        >
          {nickname}
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          sx={{
            '& .MuiPaper-root': {
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
      </CustomTableCell>
    </>
  );
};

export default TableTitle;
