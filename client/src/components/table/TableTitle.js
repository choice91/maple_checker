import React from 'react';

import { Box } from '@mui/material';

import CustomTableCell from './CustomTableCell';
import TableMoreBtn from './TableMoreBtn';

const TableTitle = ({ id, data, page }) => {
  return (
    <>
      <CustomTableCell
        bgColor="#212121"
        fontColor="#fff"
        fontSize={16}
        minWidth={115}
        fontWeight={700}
        align="center"
      >
        <Box component="span">{data.nickname}</Box>
        <TableMoreBtn id={id} nickname={data.nickname} page={page} />
      </CustomTableCell>
    </>
  );
};

export default TableTitle;
