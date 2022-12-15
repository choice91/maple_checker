import React from 'react';

import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';

const TableTitleBtn = ({ nickname }) => {
  const updateCharacter = (e) => {
    console.log(nickname);
  };

  const deleteCharacter = (e) => {};

  return (
    <>
      <div className="icons">
        <span className="icons__update-btn" onClick={updateCharacter}>
          <CreateIcon />
        </span>
        <span className="icons__delete-btn" onClick={deleteCharacter}>
          <DeleteIcon />
        </span>
      </div>
    </>
  );
};

export default TableTitleBtn;
