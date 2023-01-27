import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import {
  Box,
  Button,
  Menu,
  MenuItem,
  IconButton,
  TableCell,
  Typography,
} from '@mui/material';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

import theme from '../../Theme';

import modalSlice from '../../../redux/slices/modalSlice';
import todoSlice from '../../../redux/slices/todoSlice';
import { swapTodo } from '../../../redux/async/todo';
import { swapBoss } from '../../../redux/async/boss';
import bossSlice from '../../../redux/slices/bossSlice';

const TableTitle = ({ index, id, nickname, job, page, maxLength }) => {
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
    const args = { id, nickname, job, page };
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
      <ThemeProvider theme={theme}>
        <TableCell
          align="center"
          sx={{
            backgroundColor: theme.palette.grey['900'],
            color: '#fff',
            fontSize: 16,
            fontWeight: 700,
            p: 0,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <IconButton
              color="secondary"
              disabled={index === 0 ? true : false}
              onClick={handleMoveLeft}
            >
              <ArrowLeftIcon />
            </IconButton>
            <Button
              sx={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                fontWeight: 700,
                fontSize: 14,
                color: '#ff6f61',
                p: 1,
                minWidth: 120,
              }}
              onClick={handleClick}
            >
              <Typography>{nickname}</Typography>
              <Typography sx={{ fontSize: 12 }}>({job})</Typography>
            </Button>
            <IconButton
              color="secondary"
              disabled={index === maxLength - 1 ? true : false}
              onClick={handleMoveRight}
            >
              <ArrowRightIcon />
            </IconButton>
          </Box>

          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            <MenuItem onClick={handleOpenUpdateModal}>수정</MenuItem>
            <MenuItem onClick={handleOpenDelModal}>삭제</MenuItem>
          </Menu>
        </TableCell>
      </ThemeProvider>
    </>
  );
};

export default TableTitle;
