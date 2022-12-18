import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';

import modalSlice from '../../redux/slices/modalSlice';

import '../../css/components/commonModal.scss';
import '../../css/components/inputModal.scss';

const AddModal = () => {
  const dispatch = useDispatch();

  const outside = useRef();

  const clickModalOutsideClick = (e) => {
    if (outside.current === e.target) {
      dispatch(modalSlice.actions.openAndCloseAddModal());
    }
  };

  const closeModal = () => {
    dispatch(modalSlice.actions.openAndCloseAddModal());
  };

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
            <h2>닉네임 추가</h2>
          </div>
          <div className="modal__input-block">
            <input
              type="text"
              id="nickname"
              className="modal__input"
              placeholder="닉네임"
            />
            <span className="modal__err-msg"></span>
          </div>
          <div className="modal__btn">
            <button className="modal__cancel" onClick={closeModal}>
              취소
            </button>
            <button className="modal__submit">확인</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddModal;
