import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';

import CustomButton from '../CustomButton';

import modalSlice from '../../redux/slices/modalSlice';
import { deleteCharacter } from '../../redux/async/todo';

const DelConfirmModal = ({ page, isDelModalOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id, nickname } = useSelector((state) => state.modal);

  const handleClose = () => {
    dispatch(modalSlice.actions.closeDelModal());
  };

  const handleDelete = () => {
    if (page === 'todo') {
      const args = { data: { todoId: id }, navigate };
      dispatch(deleteCharacter(args));
    }
  };

  return (
    <>
      <Dialog
        open={isDelModalOpen}
        onClose={handleClose}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        aria-labelledby="character del modal"
      >
        <Box sx={{ maxWidth: 400, backgroundColor: '#424242', p: 1 }}>
          <DialogTitle sx={{ color: '#fff' }}>캐릭터 삭제</DialogTitle>
          <DialogContent
            dividers={true}
            sx={{
              p: 2,
              borderTop: '1px solid #b2b2b2',
              borderBottom: '1px solid #b2b2b2',
            }}
          >
            <DialogContentText sx={{ color: '#fff' }}>
              정말{' '}
              <Box component="span" sx={{ color: '#3498db', fontWeight: 700 }}>
                {nickname}
              </Box>
              을 삭제하시겠습니까?
              <br />
              삭제된 데이터는 되돌릴 수 없습니다.
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ textAlign: 'right', mt: 1 }}>
            <CustomButton text="취소" onClick={handleClose} />
            <CustomButton text="삭제" onClick={handleDelete} />
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
};

export default DelConfirmModal;
