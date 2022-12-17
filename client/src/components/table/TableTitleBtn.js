import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { deleteCharacter } from '../../redux/async/quest';
import modalSlice from '../../redux/slices/modalSlice';

import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';

const TableTitleBtn = ({ nickname }) => {
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch(modalSlice.actions.openAndCloseModal());
    dispatch(modalSlice.actions.setNickname({ nickname }));
  };

  const handleDeleteChar = () => {
    dispatch(deleteCharacter({ nickname }));
  };

  return (
    <>
      <div className="icons">
        <span className="icons__update-btn" onClick={handleOpenModal}>
          <CreateIcon />
        </span>
        <span className="icons__delete-btn" onClick={handleDeleteChar}>
          <DeleteIcon />
        </span>
      </div>
    </>
  );
};

export default TableTitleBtn;
