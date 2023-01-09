import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

import TextFieldComp from '../TextFieldComp';
import CustomButton from '../CustomButton';

import modalSlice from '../../redux/slices/modalSlice';
import todoSlice from '../../redux/slices/todoSlice';
import { updateCharacter } from '../../redux/async/todo';
import { updateCharacterToBoss } from '../../redux/async/boss';

const UpdateModal = ({ page, isUpdateModalOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id, nickname: currentNickname } = useSelector((state) => state.modal);
  const { errorMessage: todoErrorMessage } = useSelector((state) => state.todo);

  const [replaceNickname, setReplaceNickname] = useState(undefined);
  const [errorMessage, setErrorMessage] = useState(undefined);

  const handleClose = () => {
    const args = { replaceNickname };
    dispatch(modalSlice.actions.closeUpdateModal(args));

    if (page === 'todo') {
      dispatch(todoSlice.actions.clearTodoErrorMsg());
    }
  };

  const handleUpdate = () => {
    const args = { data: { id, newNickname: replaceNickname }, navigate };

    if (page === 'todo') {
      dispatch(updateCharacter(args));
    } else if (page === 'boss') {
      dispatch(updateCharacterToBoss(args));
    }
  };

  const handleUpdateEnter = (e) => {
    if (e.key === 'Enter') {
      handleUpdate();
    }
  };

  const onChangeNickname = (e) => {
    const {
      target: { value },
    } = e;

    setReplaceNickname(value);
  };

  useEffect(() => {
    setReplaceNickname(currentNickname);
  }, [currentNickname]);

  useEffect(() => {
    setErrorMessage(todoErrorMessage);
  }, [todoErrorMessage]);

  return (
    <>
      <Dialog
        open={isUpdateModalOpen}
        onClose={handleClose}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        aria-labelledby="character add modal"
      >
        <Box sx={{ maxWidth: 400, backgroundColor: '#424242', p: 1 }}>
          <DialogTitle sx={{ color: '#fff' }}>닉네임 수정</DialogTitle>
          <DialogContent
            dividers={true}
            sx={{
              p: 2,
              borderTop: '1px solid #b2b2b2',
              borderBottom: '1px solid #b2b2b2',
            }}
          >
            <TextFieldComp
              label="닉네임"
              value={currentNickname}
              onChange={onChangeNickname}
              onKeyPress={handleUpdateEnter}
              ok={errorMessage ? false : true}
              helperText={errorMessage}
              autoFocus={true}
            />
          </DialogContent>
          <DialogActions sx={{ textAlign: 'right', mt: 1 }}>
            <CustomButton text="취소" onClick={handleClose} />
            <CustomButton text="수정" onClick={handleUpdate} />
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
};

export default UpdateModal;
