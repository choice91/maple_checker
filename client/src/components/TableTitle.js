import React from 'react';

import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';

const TableTitle = ({ quests }) => {
  const updateCharacter = (e) => {};

  const deleteCharacter = (e) => {};

  return (
    <>
      <th>&nbsp;</th>
      {quests.map(({ nickname }, index) => (
        <th key={index}>
          <span>{nickname}</span>
          <div className="icons">
            <span className="icons__update-btn" onClick={updateCharacter}>
              <CreateIcon />
            </span>
            <span className="icons__delete-btn" onClick={deleteCharacter}>
              <DeleteIcon />
            </span>
          </div>
        </th>
      ))}
    </>
  );
};

export default TableTitle;
