import React from 'react';

import { TableRow } from '@mui/material';

import CustomTableCell from './CustomTableCell';
import TableCheckbox from './TableCheckbox';

const TableCheckboxCell = (props) => {
  const { ids, dataType, dataName, data, category, page } = props;

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
            page={page}
          />
        ))}
      </TableRow>
    </>
  );
};

export default TableCheckboxCell;
