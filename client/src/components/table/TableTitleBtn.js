import React from 'react';
import { useDispatch } from 'react-redux';

import questSlice from '../../redux/slices/questSlice';
import bossSlice from '../../redux/slices/bossSlice';

import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';

const TableTitleBtn = ({ nickname, id, type }) => {
  const dispatch = useDispatch();

  const openUpdateModal = () => {
    if (type === 'quest') {
      dispatch(questSlice.actions.openQuestUpdateModal({ nickname, id }));
    } else {
      dispatch(bossSlice.actions.openBossUpdateModal({ nickname, id }));
    }
  };

  const openDelModal = () => {
    if (type === 'quest') {
      dispatch(questSlice.actions.openQuestDelModal({ nickname, id }));
    } else {
      dispatch(bossSlice.actions.openBossDelModal({ nickname, id }));
    }
  };

  return (
    <>
      <div className="icons">
        <span className="icons__update-btn" onClick={openUpdateModal}>
          <CreateIcon fontSize="small" />
        </span>
        <span className="icons__delete-btn" onClick={openDelModal}>
          <DeleteIcon fontSize="small" />
        </span>
      </div>
    </>
  );
};

export default TableTitleBtn;
