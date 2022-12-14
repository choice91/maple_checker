import React from 'react';

const TableTitle = ({ quests }) => {
  return (
    <>
      <th>&nbsp;</th>
      {quests.map(({ nickname }) => (
        <th>{nickname}</th>
      ))}
    </>
  );
};

export default TableTitle;
