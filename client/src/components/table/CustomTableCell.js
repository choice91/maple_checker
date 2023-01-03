import React from 'react';

import { TableCell } from '@mui/material';

const CustomTableCell = (props) => {
  const {
    bgColor,
    fontColor,
    minWidth,
    width,
    align,
    colSpan,
    fontWeight,
    fontSize,
    cursor,
    onClick,
    children,
  } = props;

  return (
    <>
      <TableCell
        align={align}
        colSpan={colSpan}
        sx={{
          backgroundColor: bgColor,
          color: fontColor,
          width: width,
          minWidth: minWidth,
          fontWeight: fontWeight,
          fontSize: fontSize,
          cursor: cursor ? cursor : 'default',
        }}
        onClick={onClick}
      >
        {children}
      </TableCell>
    </>
  );
};

export default CustomTableCell;
