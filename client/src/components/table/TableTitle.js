import React from 'react';

import TableTitleBtn from './TableTitleBtn';

const TableTitle = ({ ids, quests }) => {
  return (
    <>
      <th>&nbsp;</th>
      {ids.map((id, index) => (
        <th key={index}>
          <span>{quests[`${id}`].nickname}</span>
          <TableTitleBtn nickname={quests[`${id}`].nickname} />
        </th>
      ))}
    </>
  );
};

export default TableTitle;
