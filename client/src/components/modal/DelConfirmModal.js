import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import modalSlice from '../../redux/slices/modalSlice';
import questSlice from '../../redux/slices/questSlice';
import bossSlice from '../../redux/slices/bossSlice';

import { deleteCharacter } from '../../redux/async/quest';
import { delCharacterToBoss } from '../../redux/async/boss';

import '../../css/components/confirmModal.scss';
import '../../css/components/commonModal.scss';

const DelConfirmModal = ({ type, nickname, id }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const outside = useRef();

  const clickModalOutsideClick = (e) => {
    if (outside.current === e.target) {
      if (type === 'quest') {
        dispatch(questSlice.actions.closeQuestDelModal());
      } else {
        dispatch(bossSlice.actions.closeBossDelModal());
      }
    }
  };

  const closeDelModal = () => {
    if (type === 'quest') {
      dispatch(questSlice.actions.closeQuestDelModal());
    } else {
      dispatch(bossSlice.actions.closeBossDelModal());
    }
  };

  const delCharacterSubmit = () => {
    if (type === 'quest') {
      dispatch(deleteCharacter({ id }));
      dispatch(questSlice.actions.delCharacterInTable({ id }));
    } else {
      dispatch(delCharacterToBoss({ data: { bossId: id }, navigate }));
      dispatch(bossSlice.actions.delCharacterInTable({ id }));
    }
  };

  const handleEscKey = useCallback(
    (e) => {
      if (e.key === 'Escape') {
        closeDelModal();
      }
    },
    [closeDelModal]
  );

  const handleEnterKey = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        delCharacterSubmit();
      }
    },
    [delCharacterSubmit]
  );

  useEffect(() => {
    document.addEventListener('keyup', handleEscKey, false);
    document.addEventListener('keyup', handleEnterKey, false);

    return () => {
      document.removeEventListener('keyup', handleEscKey, false);
      document.removeEventListener('keyup', handleEnterKey, false);
    };
  }, [handleEscKey, handleEnterKey]);

  return (
    <>
      <div
        className="modal"
        aria-hidden="true"
        ref={outside}
        onMouseDown={clickModalOutsideClick}
      >
        <div className="modal__container">
          <div className="modal__title">
            <h2>캐릭터 삭제</h2>
          </div>
          <div className="modal__del-msg">
            정말 <span>{nickname}</span>을 삭제하시겠습니까?
          </div>
          <div className="modal__btn">
            <button className="modal__cancel" onClick={closeDelModal}>
              취소
            </button>
            <button className="modal__submit" onClick={delCharacterSubmit}>
              삭제
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DelConfirmModal;
