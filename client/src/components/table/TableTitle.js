import React from 'react';

import TableTitleBtn from './TableTitleBtn';

const TableTitle = ({ quests }) => {
  return (
    <>
      <th>&nbsp;</th>
      {quests.map(({ nickname }, index) => (
        <th key={index}>
          <span>{nickname}</span>
          <TableTitleBtn nickname={nickname} />
        </th>
      ))}
    </>
  );
};

export default TableTitle;
