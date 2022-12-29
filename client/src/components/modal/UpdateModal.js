import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import questSlice from '../../redux/slices/questSlice';
import bossSlice from '../../redux/slices/bossSlice';
import { updateNickname } from '../../redux/async/quest';
import { updateNicknameInBossTable } from '../../redux/async/boss';

import '../../css/components/commonModal.scss';
import '../../css/components/inputModal.scss';

const UpdateModal = ({ type, nickname: prevNickname, id }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const outside = useRef();
  const inputRef = useRef();

  const [nickname, setNickname] = useState(prevNickname);
  const [nicknameEqualErrMsg, setNicknameEqualErrMsg] = useState('');

  const clickModalOutsideClick = (e) => {
    if (outside.current === e.target) {
      if (type === 'quest') {
        dispatch(questSlice.actions.closeQuestUpdateModal());
      } else {
        dispatch(bossSlice.actions.closeBossUpdateModal());
      }
    }
  };

  const handleCloseModal = () => {
    if (type === 'quest') {
      dispatch(questSlice.actions.closeQuestUpdateModal());
    } else {
      dispatch(bossSlice.actions.closeBossUpdateModal());
    }
  };

  const onChangeNickname = (e) => {
    setNickname(e.target.value);
  };

  const submitNickname = () => {
    const regExp = /\s/g;

    if (prevNickname === nickname.replaceAll(regExp, '')) {
      setNicknameEqualErrMsg('동일한 닉네임입니다.');
    } else {
      if (type === 'quest') {
        const data = {
          questId: id,
          newNickname: nickname.replaceAll(regExp, ''),
        };
        dispatch(updateNickname({ data, navigate }));
        dispatch(questSlice.actions.updateNicknameInTable(data));
      } else {
        const data = {
          bossId: id,
          newNickname: nickname.replaceAll(regExp, ''),
        };
        dispatch(updateNicknameInBossTable({ data, navigate }));
        dispatch(bossSlice.actions.updateNicknameInTable(data));
      }
    }
  };

  const submitNicknameEnter = (e) => {
    const regExp = /\s/g;

    if (e.key === 'Enter') {
      if (prevNickname === nickname.replaceAll(regExp, '')) {
        setNicknameEqualErrMsg('동일한 닉네임입니다.');
      } else {
        if (type === 'quest') {
          const data = {
            questId: id,
            newNickname: nickname.replaceAll(regExp, ''),
          };
          dispatch(updateNickname({ data, navigate }));
          dispatch(questSlice.actions.updateNicknameInTable(data));
        } else {
          const data = {
            bossId: id,
            newNickname: nickname.replaceAll(regExp, ''),
          };
          dispatch(updateNicknameInBossTable({ data, navigate }));
          dispatch(bossSlice.actions.updateNicknameInTable(data));
        }
      }
    }
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
              onKeyPress={submitNicknameEnter}
              ref={inputRef}
            />
            <span className="modal__err-msg">{nicknameEqualErrMsg}</span>
          </div>
          <div className="modal__btn">
            <button className="modal__cancel" onClick={handleCloseModal}>
              취소
            </button>
            <button className="modal__submit" onClick={submitNickname}>
              수정
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateModal;
