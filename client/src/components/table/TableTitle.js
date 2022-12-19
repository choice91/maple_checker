import React from 'react';

import TableTitleBtn from './TableTitleBtn';

const TableTitle = ({ ids, data }) => {
  return (
    <>
      <th>&nbsp;</th>
      {ids.map((id, index) => (
        <th key={index}>
          <span>{data[`${id}`].nickname}</span>
          <TableTitleBtn nickname={data[`${id}`].nickname} id={id} />
        </th>
      ))}
    </>
  );
};

export default TableTitle;
