import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import questSlice from '../redux/slices/questSlice';
import bossSlice from '../redux/slices/bossSlice';
import { resetQuestData } from '../redux/async/quest';
import { resetBossData } from '../redux/async/boss';

import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

const TableBtn = ({ type }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const openAddModal = () => {
    if (type === 'quest') {
      dispatch(questSlice.actions.openQuestAddModal());
    } else {
      dispatch(bossSlice.actions.openBossAddModal());
    }
  };

  const resetData = () => {
    if (type === 'quest') {
      dispatch(resetQuestData({ navigate }));
    } else {
      dispatch(resetBossData({ navigate }));
    }
  };

  return (
    <>
      <div className="table-btn">
        <button onClick={openAddModal}>
          <PersonAddAltIcon />
          <span>캐릭터 추가</span>
        </button>
        <button onClick={resetData}>
          <RestartAltIcon />
          <span>리셋</span>
        </button>
      </div>
    </>
  );
};

export default TableBtn;
