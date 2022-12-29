import React from 'react';

import TableCheckbox from './TableCheckbox';

const TableTd = ({ ids, data, type }) => {
  return (
    <>
      {ids.map((id, index) => (
        <TableCheckbox
          index={index}
          nickname={data[`${id}`].nickname}
          questValue={data[`${id}`]}
          questType={type}
          questId={id}
        />
      ))}
    </>
  );
};

export default TableTd;
