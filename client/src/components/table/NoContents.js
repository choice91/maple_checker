import React from 'react';
import { useDispatch } from 'react-redux';

import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';

import modalSlice from '../../redux/slices/modalSlice';
import bossSlice from '../../redux/slices/bossSlice';

import '../../css/components/noContents.scss';

const NoContents = ({ type }) => {
  const dispatch = useDispatch();

  const openAddModal = () => {
    if (type === 'quest') {
    } else {
      dispatch(bossSlice.actions.bossErrorMessageClear());
    }
    dispatch(modalSlice.actions.openAndCloseAddModal({ type }));
  };

  return (
    <>
      <div className="no-content">
        <span>데이터 없음</span>
        <span>캐릭터 추가 버튼을 눌러 캐릭터를 추가해주세요.</span>
        <button onClick={openAddModal}>
          <PersonAddAltIcon />
          <span>캐릭터 추가</span>
        </button>
      </div>
    </>
  );
};

export default NoContents;
