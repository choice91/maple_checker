import React from 'react';
import { useDispatch } from 'react-redux';

import modalSlice from '../../redux/slices/modalSlice';

import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';

const TableTitleBtn = ({ nickname, questId }) => {
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch(modalSlice.actions.openAndCloseModal());
    dispatch(modalSlice.actions.setNickAndId({ nickname, questId }));
  };

  const handleDeleteChar = () => {
    dispatch(modalSlice.actions.openAndCloseDelModal());
    dispatch(modalSlice.actions.setDelNickAndId({ nickname, questId }));
  };

  return (
    <>
      <div className="icons">
        <span className="icons__update-btn" onClick={handleOpenModal}>
          <CreateIcon fontSize="small" />
        </span>
        <span className="icons__delete-btn" onClick={handleDeleteChar}>
          <DeleteIcon fontSize="small" />
        </span>
      </div>
    </>
  );
};

export default TableTitleBtn;
