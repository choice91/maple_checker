import React, { useRef, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import modalSlice from '../../redux/slices/modalSlice';
import { addCharacter } from '../../redux/async/quest';

import '../../css/components/commonModal.scss';
import '../../css/components/inputModal.scss';

const AddModal = () => {
  const dispatch = useDispatch();

  const outside = useRef();
  const inputRef = useRef();

  const [nickname, setNickname] = useState('');

  const clickModalOutsideClick = (e) => {
    if (outside.current === e.target) {
      dispatch(modalSlice.actions.openAndCloseAddModal());
    }
  };

  const closeModal = () => {
    dispatch(modalSlice.actions.openAndCloseAddModal());
  };

  const onChangeNickname = (e) => {
    const {
      target: { value },
    } = e;

    setNickname(value);
  };

  const addCharacterSubmit = () => {
    dispatch(addCharacter({ nickname }));
  };

  useEffect(() => {
    if (inputRef.current !== null) {
      inputRef.current.focus();
    }
  }, []);

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
              onChange={onChangeNickname}
              onKeyPress={addCharacterSubmit}
              ref={inputRef}
            />
            <span className="modal__err-msg"></span>
          </div>
          <div className="modal__btn">
            <button className="modal__cancel" onClick={closeModal}>
              취소
            </button>
            <button className="modal__submit" onClick={addCharacterSubmit}>
              확인
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddModal;
