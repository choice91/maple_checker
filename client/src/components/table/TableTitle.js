import React from 'react';

import { Box, TableRow } from '@mui/material';

import CustomTableCell from './CustomTableCell';
import TableMoreBtn from './TableMoreBtn';

const TableTitle = ({ ids, data, page }) => {
  return (
    <>
      <TableRow>
        <CustomTableCell
          bgColor="#212121"
          fontColor="#fff"
          width={90}
          minWidth={90}
          fontWeight={700}
          align="center"
        >
          &nbsp;
        </CustomTableCell>
        {ids.map((id, index) => (
          <CustomTableCell
            key={index}
            bgColor="#212121"
            fontColor="#fff"
            fontSize={16}
            minWidth={115}
            fontWeight={700}
            align="center"
          >
            <Box component="span">{data[id].nickname}</Box>
            <TableMoreBtn id={id} nickname={data[id].nickname} />
          </CustomTableCell>
        ))}
      </TableRow>
    </>
  );
};

export default TableTitle;
