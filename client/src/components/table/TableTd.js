import React from 'react';

import TableCheckbox from './TableCheckbox';

const TableTd = ({ nicknames, quests, type }) => {
  return (
    <>
      {nicknames.map((nickname, index) => (
        <td key={index}>
          <TableCheckbox
            nickname={nickname}
            questValue={quests[`${nickname}`]}
            questType={type}
          />
        </td>
      ))}
    </>
  );
};

export default TableTd;
