import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Box, Button, Menu, MenuItem, IconButton } from '@mui/material';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

import CustomTableCell from './CustomTableCell';
import modalSlice from '../../redux/slices/modalSlice';
import todoSlice from '../../redux/slices/todoSlice';
import { swapTodo } from '../../redux/async/todo';
import { swapBoss } from '../../redux/async/boss';
import bossSlice from '../../redux/slices/bossSlice';

const style = {
  menuItem: {
    justifyContent: 'center',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#5f5f5f',
    },
  },
};

const TableTitle = ({ index, id, nickname, page, maxLength }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const handleMoveLeft = () => {
    if (index > 0) {
      const data = { index, direction: 'left' };
      const args = { data, navigate };

      if (page === 'todo') {
        dispatch(swapTodo(args));
        dispatch(todoSlice.actions.swapTodo(data));
      } else if (page === 'boss') {
        dispatch(swapBoss(args));
        dispatch(bossSlice.actions.swapBoss(data));
      }
    }
  };

  const handleMoveRight = () => {
    if (index < maxLength - 1) {
      const data = { index, direction: 'right' };
      const args = { data, navigate };

      if (page === 'todo') {
        dispatch(swapTodo(args));
        dispatch(todoSlice.actions.swapTodo(data));
      } else if (page === 'boss') {
        dispatch(swapBoss(args));
        dispatch(bossSlice.actions.swapBoss(data));
      }
    }
  };

  return (
    <>
      <CustomTableCell
        bgColor="#212121"
        fontColor="#fff"
        fontSize={16}
        minWidth={190}
        fontWeight={700}
        align="center"
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <IconButton
            sx={{
              color: '#e74c3c',
              '&:hover': {
                backgroundColor: 'rgba(231, 76, 60, 0.1)',
              },
              '&:hover .MuiSvgIcon-root': {
                color: '#e74c3c',
              },
            }}
            disabled={index === 0 ? true : false}
            onClick={handleMoveLeft}
          >
            <ArrowLeftIcon sx={{ color: '#3f3f3f' }} />
          </IconButton>
          <Button
            sx={{
              fontWeight: 700,
              fontSize: 14,
              color: '#e74c3c',
              '&:hover': {
                backgroundColor: 'rgba(231, 76, 60, 0.1)',
              },
            }}
            onClick={handleClick}
          >
            {nickname}
          </Button>
          <IconButton
            sx={{
              color: '#e74c3c',
              '&:hover': {
                backgroundColor: 'rgba(231, 76, 60, 0.1)',
              },
              '&:hover .MuiSvgIcon-root': {
                color: '#e74c3c',
              },
            }}
            disabled={index === maxLength - 1 ? true : false}
            onClick={handleMoveRight}
          >
            <ArrowRightIcon sx={{ color: '#3f3f3f' }} />
          </IconButton>
        </Box>

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
