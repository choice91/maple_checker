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
import questSlice from '../../redux/slices/questSlice';
import bossSlice from '../../redux/slices/bossSlice';

import { deleteCharacter } from '../../redux/async/quest';
import { delCharacterToBoss } from '../../redux/async/boss';

// import '../../css/components/confirmModal.scss';
// import '../../css/components/commonModal.scss';

const DelConfirmModal = ({ page, isDelModalOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { nickname } = useSelector((state) => state.modal);

  const handleClose = () => {
    dispatch(modalSlice.actions.closeDelModal());
  };

  // const outside = useRef();
  //
  // const clickModalOutsideClick = (e) => {
  //   if (outside.current === e.target) {
  //     if (type === 'quest') {
  //       dispatch(questSlice.actions.closeQuestDelModal());
  //     } else {
  //       dispatch(bossSlice.actions.closeBossDelModal());
  //     }
  //   }
  // };
  //
  // const closeDelModal = () => {
  //   if (type === 'quest') {
  //     dispatch(questSlice.actions.closeQuestDelModal());
  //   } else {
  //     dispatch(bossSlice.actions.closeBossDelModal());
  //   }
  // };
  //
  // const delCharacterSubmit = () => {
  //   if (type === 'quest') {
  //     const data = { questId: id };
  //     dispatch(deleteCharacter({ data, navigate }));
  //     dispatch(questSlice.actions.delCharacterInTable(data));
  //   } else {
  //     const data = { bossId: id };
  //     dispatch(delCharacterToBoss({ data, navigate }));
  //     dispatch(bossSlice.actions.delCharacterInTable(data));
  //   }
  // };
  //
  // const handleEscKey = useCallback(
  //   (e) => {
  //     if (e.key === 'Escape') {
  //       closeDelModal();
  //     }
  //   },
  //   [closeDelModal]
  // );
  //
  // const handleEnterKey = useCallback(
  //   (e) => {
  //     if (e.key === 'Enter') {
  //       delCharacterSubmit();
  //     }
  //   },
  //   [delCharacterSubmit]
  // );
  //
  // useEffect(() => {
  //   document.addEventListener('keyup', handleEscKey, false);
  //   document.addEventListener('keyup', handleEnterKey, false);
  //
  //   return () => {
  //     document.removeEventListener('keyup', handleEscKey, false);
  //     document.removeEventListener('keyup', handleEnterKey, false);
  //   };
  // }, [handleEscKey, handleEnterKey]);

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
            <CustomButton text="삭제" />
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
      {/*      <h2>캐릭터 삭제</h2>*/}
      {/*    </div>*/}
      {/*    <div className="modal__del-msg">*/}
      {/*      정말 <span>{nickname}</span>을 삭제하시겠습니까?*/}
      {/*    </div>*/}
      {/*    <div className="modal__btn">*/}
      {/*      <button className="modal__cancel" onClick={closeDelModal}>*/}
      {/*        취소*/}
      {/*      </button>*/}
      {/*      <button className="modal__submit" onClick={delCharacterSubmit}>*/}
      {/*        삭제*/}
      {/*      </button>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}
    </>
  );
};

export default DelConfirmModal;
