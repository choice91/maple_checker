import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import modalSlice from '../../redux/slices/modalSlice';
import questSlice from '../../redux/slices/questSlice';
import { updateNickname } from '../../redux/async/quest';

import '../../css/components/modal.scss';

const UpdateModal = ({ nickname: prevNickname, questId }) => {
  const dispatch = useDispatch();

  const outside = useRef();

  const [nickname, setNickname] = useState(prevNickname);
  const [nicknameEqualErrMsg, setNicknameEqualErrMsg] = useState('');

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

  const submitNickname = () => {
    const regExp = /\s/g;

    if (prevNickname === nickname.replaceAll(regExp, '')) {
      setNicknameEqualErrMsg('동일한 닉네임입니다.');
    } else {
      dispatch(
        updateNickname({
          prevNickname,
          newNickname: nickname.replaceAll(regExp, ''),
        })
      );
      dispatch(
        questSlice.actions.updateNicknameInTable({
          questId,
          newNickname: nickname.replaceAll(regExp, ''),
        })
      );
      dispatch(modalSlice.actions.openAndCloseModal());
    }
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
            <span className="modal__err-msg">{nicknameEqualErrMsg}</span>
          </div>
          <div className="modal__btn">
            <button className="modal__cancel" onClick={handleCloseModal}>
              취소
            </button>
            <button className="modal__submit" onClick={submitNickname}>
              확인
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateModal;
