import React from 'react';

import TableCheckbox from './TableCheckbox';

const TableTd = ({ ids, data, type }) => {
  return (
    <>
      {ids.map((id, index) => (
        <td key={index}>
          <TableCheckbox
            nickname={data[`${id}`].nickname}
            questValue={data[`${id}`]}
            questType={type}
            questId={id}
          />
        </td>
      ))}
    </>
  );
};

export default TableTd;
