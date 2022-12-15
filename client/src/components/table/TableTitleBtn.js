import React from 'react';
import { useDispatch } from 'react-redux';

import { deleteCharacter } from '../../redux/async/quest';

import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';

const TableTitleBtn = ({ nickname }) => {
  const dispatch = useDispatch();

  const updateCharacter = () => {
    console.log(nickname);
  };

  const handleDeleteChar = () => {
    console.log(nickname);

    const payload = { nickname };
    dispatch(deleteCharacter(payload));
  };

  return (
    <>
      <div className="icons">
        <span className="icons__update-btn" onClick={updateCharacter}>
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
