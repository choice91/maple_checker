import React from 'react';
import { useDispatch } from 'react-redux';

import bossSlice from '../redux/slices/bossSlice';

import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';

const TableBtn = ({ type }) => {
  const dispatch = useDispatch();

  const openAddModal = () => {
    if (type === 'quest') {
    } else {
      dispatch(bossSlice.actions.openBossAddModal());
    }
  };

  return (
    <>
      <div className="table-btn">
        <button onClick={openAddModal}>
          <PersonAddAltIcon />
          <span>캐릭터 추가</span>
        </button>
      </div>
    </>
  );
};

export default TableBtn;
