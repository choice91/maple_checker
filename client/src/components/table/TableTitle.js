import React from 'react';

import TableTitleBtn from './TableTitleBtn';

const TableTitle = ({ ids, quests }) => {
  return (
    <>
      <th>&nbsp;</th>
      {ids.map((questId, index) => (
        <th key={index}>
          <span>{quests[`${questId}`].nickname}</span>
          <TableTitleBtn
            nickname={quests[`${questId}`].nickname}
            questId={questId}
          />
        </th>
      ))}
    </>
  );
};

export default TableTitle;
