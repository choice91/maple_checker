import React from 'react';

import { TableRow } from '@mui/material';

import CustomTableCell from './CustomTableCell';
import TableCheckbox from './TableCheckbox';

const TableCheckboxCell = ({ ids, dataType, dataName, data, category }) => {
  return (
    <>
      <TableRow>
        <CustomTableCell align="center" bgColor="#222" fontColor="#fff">
          {dataName}
        </CustomTableCell>

        {ids.map((id, index) => (
          <TableCheckbox
            key={index}
            id={id}
            dataType={dataType}
            data={data[id]}
            category={category}
          />
        ))}
      </TableRow>
    </>
  );
};

export default TableCheckboxCell;
