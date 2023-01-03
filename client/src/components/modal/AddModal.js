import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import modalSlice from '../../redux/slices/modalSlice';
import questSlice from '../../redux/slices/questSlice';
import bossSlice from '../../redux/slices/bossSlice';
import { addCharacter } from '../../redux/async/quest';
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

// import '../../css/components/commonModal.scss';
// import '../../css/components/inputModal.scss';

const AddModal = ({ page, isAddModalOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { errorMessage } = useSelector((state) => state.boss);
  //
  // const outside = useRef();
  // const inputRef = useRef();
  //
  const [nickname, setNickname] = useState('');
  //
  // const clickModalOutsideClick = (e) => {
  //   if (outside.current === e.target) {
  //     if (page === 'quest') {
  //       dispatch(questSlice.actions.closeQuestAddModal());
  //     } else {
  //       dispatch(bossSlice.actions.closeBossAddModal());
  //     }
  //   }
  // };
  //
  // const closeModal = () => {
  //   if (page === 'quest') {
  //     dispatch(questSlice.actions.closeQuestAddModal());
  //   } else {
  //     dispatch(bossSlice.actions.closeBossAddModal());
  //   }
  // };
  //
  const onChangeNickname = (e) => {
    const {
      target: { value },
    } = e;

    setNickname(value);
  };
  //
  const addCharacterSubmit = () => {
    if (page === 'todo') {
      dispatch(addCharacter({ data: { nickname }, navigate }));
    } else {
      dispatch(addCharacterToBoss({ data: { nickname }, navigate }));
    }
  };

  const addCharacterSubmitEnter = (e) => {
    if (e.key === 'Enter') {
      if (page === 'todo') {
        dispatch(addCharacter({ data: { nickname }, navigate }));
      } else {
        dispatch(addCharacterToBoss({ data: { nickname }, navigate }));
      }
    }
  };

  const handleClose = () => {
    dispatch(modalSlice.actions.closeAddModal());
  };
  //
  // useEffect(() => {
  //   if (inputRef.current !== null) {
  //     inputRef.current.focus();
  //   }
  // }, []);

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
              ok={true}
            />
          </DialogContent>
          <DialogActions sx={{ textAlign: 'right', mt: 1 }}>
            <CustomButton text="취소" onClick={handleClose} />
            <CustomButton
              text="추가"
              onClick={addCharacterSubmit}
              onKeyPress={addCharacterSubmitEnter}
            />
          </DialogActions>
        </Box>
      </Dialog>
      {/*<div*/}
      {/*  className="modal"*/}
      {/*  aria-hidden="true"*/}
      {/*  ref={outside}*/}
      {/*  onMouseDown={clickModalOutsideClick}*/}
      {/*>*/}
      {/*  <div className="modal__container">*/}
      {/*    <div className="modal__title">*/}
      {/*      <h2>닉네임 추가</h2>*/}
      {/*    </div>*/}
      {/*    <div className="modal__input-block">*/}
      {/*      <input*/}
      {/*        type="text"*/}
      {/*        id="nickname"*/}
      {/*        className="modal__input"*/}
      {/*        placeholder="닉네임"*/}
      {/*        onChange={onChangeNickname}*/}
      {/*        onKeyPress={addCharacterSubmitEnter}*/}
      {/*        ref={inputRef}*/}
      {/*      />*/}
      {/*      <span className="modal__err-msg">*/}
      {/*        {errorMessage === '' ? '' : errorMessage}*/}
      {/*      </span>*/}
      {/*    </div>*/}
      {/*    <div className="modal__btn">*/}
      {/*      <button className="modal__cancel" onClick={closeModal}>*/}
      {/*        취소*/}
      {/*      </button>*/}
      {/*      <button className="modal__submit" onClick={addCharacterSubmit}>*/}
      {/*        확인*/}
      {/*      </button>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}
    </>
  );
};

export default AddModal;
