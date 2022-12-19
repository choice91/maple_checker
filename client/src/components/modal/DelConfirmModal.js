import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import modalSlice from '../../redux/slices/modalSlice';
import questSlice from '../../redux/slices/questSlice';

import { deleteCharacter } from '../../redux/async/quest';

import '../../css/components/confirmModal.scss';
import '../../css/components/commonModal.scss';

const DelConfirmModal = ({ type, nickname, id }) => {
  const dispatch = useDispatch();

  const outside = useRef();

  const clickModalOutsideClick = (e) => {
    if (outside.current === e.target) {
      dispatch(modalSlice.actions.openAndCloseDelModal({ type }));
    }
  };

  const closeDelModal = () => {
    dispatch(modalSlice.actions.openAndCloseDelModal({ type }));
  };

  const delCharacterSubmit = () => {
    dispatch(deleteCharacter({ id }));
    dispatch(questSlice.actions.delNicknameInTable({ id }));
    dispatch(modalSlice.actions.openAndCloseDelModal({ type }));
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
