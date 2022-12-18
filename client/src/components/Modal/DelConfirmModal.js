import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import modalSlice from '../../redux/slices/modalSlice';
import questSlice from '../../redux/slices/questSlice';

import { deleteCharacter } from '../../redux/async/quest';

import '../../css/components/confirmModal.scss';

const DelConfirmModal = ({ delNickname, delQuestId }) => {
  const dispatch = useDispatch();

  const outside = useRef();

  const clickModalOutsideClick = (e) => {
    if (outside.current === e.target) {
      dispatch(modalSlice.actions.openAndCloseDelModal());
    }
  };

  const closeDelModal = () => {
    dispatch(modalSlice.actions.openAndCloseDelModal());
  };

  const delCharacterSubmit = () => {
    dispatch(deleteCharacter({ delQuestId }));
    dispatch(questSlice.actions.delNicknameInTable({ delQuestId }));
    dispatch(modalSlice.actions.openAndCloseDelModal());
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
        className="del-modal"
        aria-hidden="true"
        ref={outside}
        onMouseDown={clickModalOutsideClick}
      >
        <div className="del-modal__container">
          <div className="del-modal__title">
            <h2>캐릭터 삭제</h2>
          </div>
          <div className="del-modal__msg">
            정말 {delNickname}을 삭제하시겠습니까?
          </div>
          <div className="del-modal__btn">
            <button className="del-modal__cancel" onClick={closeDelModal}>
              취소
            </button>
            <button className="del-modal__submit" onClick={delCharacterSubmit}>
              삭제
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DelConfirmModal;
