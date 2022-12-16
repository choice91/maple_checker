import React from 'react';

import TableTitleBtn from './TableTitleBtn';

const TableTitle = ({ nicknames }) => {
  return (
    <>
      <th>&nbsp;</th>
      {nicknames.map((nickname, index) => (
        <th key={index}>
          <span>{nickname}</span>
          <TableTitleBtn nickname={nickname} />
        </th>
      ))}
    </>
  );
};

export default TableTitle;
