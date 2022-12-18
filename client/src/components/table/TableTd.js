import React from 'react';

import TableCheckbox from './TableCheckbox';

const TableTd = ({ ids, quests, type }) => {
  return (
    <>
      {ids.map((id, index) => (
        <td key={index}>
          <TableCheckbox
            nickname={quests[`${id}`].nickname}
            questValue={quests[`${id}`]}
            questType={type}
            questId={id}
          />
        </td>
      ))}
    </>
  );
};

export default TableTd;
