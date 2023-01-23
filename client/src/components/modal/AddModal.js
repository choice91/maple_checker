import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import modalSlice from '../../redux/slices/modalSlice';
import { addCharacter } from '../../redux/async/todo';
import { addCharacterToBoss } from '../../redux/async/boss';

import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

import TextFieldComp from '../TextFieldComp';
import CustomButton from '../CustomButton';
import JobSelect from './common/JobSelect';

const AddModal = ({ page, isAddModalOpen, errorMessage }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [nickname, setNickname] = React.useState('');
  const [job, setJob] = React.useState('');

  const onChangeNickname = (e) => {
    setNickname(e.target.value);
  };

  const handleClose = () => {
    dispatch(modalSlice.actions.closeAddModal());
    setJob('');
  };

  const handleAddCharacter = () => {
    const args = { data: { nickname, job }, navigate };

    if (page === 'todo') {
      dispatch(addCharacter(args));
    } else if (page === 'boss') {
      dispatch(addCharacterToBoss(args));
    }

    setJob('');
  };

  const handleAddCharacterEnter = (e) => {
    if (e.key === 'Enter') {
      handleAddCharacter();
      setJob('');
    }
  };

  const handleChangeJob = (e) => {
    setJob(e.target.value);
  };

  return (
    <>
      <Dialog
        open={isAddModalOpen}
        onClose={handleClose}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        aria-labelledby="character add modal"
      >
        <Box sx={{ maxWidth: 400, backgroundColor: '#424242', p: 1 }}>
          <DialogTitle sx={{ color: '#fff' }}>캐릭터 추가</DialogTitle>
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
              onChange={onChangeNickname}
              onKeyPress={handleAddCharacterEnter}
              ok={errorMessage ? false : true}
              helperText={errorMessage}
              autoFocus={true}
            />
            <JobSelect job={job} onChange={handleChangeJob} />
          </DialogContent>
          <DialogActions sx={{ textAlign: 'right', mt: 1 }}>
            <CustomButton text="취소" onClick={handleClose} />
            <CustomButton text="추가" onClick={handleAddCharacter} />
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
};

export default AddModal;
