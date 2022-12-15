import React from 'react';

const TableTitle = ({ quests }) => {
  return (
    <>
      <th>&nbsp;</th>
      {quests.map(({ nickname }, index) => (
        <th key={index}>{nickname}</th>
      ))}
    </>
  );
};

export default TableTitle;
