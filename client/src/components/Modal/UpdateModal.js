import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import modalSlice from '../../redux/slices/modalSlice';

import '../../css/components/modal.scss';

const UpdateModal = ({ nickname: curNickname }) => {
  const dispatch = useDispatch();

  const outside = useRef();

  const [nickname, setNickname] = useState(curNickname);

  const clickModalOutsideClick = (e) => {
    if (outside.current === e.target) {
      dispatch(modalSlice.actions.openAndCloseModal());
    }
  };

  const handleCloseModal = () => {
    dispatch(modalSlice.actions.openAndCloseModal());
  };

  const onChangeNickname = (e) => {
    setNickname(e.target.value);
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
          <span className="modal__error-msg"></span>
          <div className="modal__title">
            <h2>닉네임 수정</h2>
          </div>
          <div className="modal__input-block">
            <input
              type="text"
              id="nickname"
              className="modal__input"
              placeholder="닉네임"
              value={nickname}
              onChange={onChangeNickname}
            />
          </div>
          <div className="modal__btn">
            <button className="modal__cancel" onClick={handleCloseModal}>
              취소
            </button>
            <button className="modal__submit">확인</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateModal;
