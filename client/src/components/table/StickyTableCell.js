import React from 'react';
import { TableCell } from '@mui/material';

const StickyTableCell = (props) => {
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
    hover,
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
          transition: 'all 0.2s ease-in-out',
          position: 'sticky',
          left: 0,
          zIndex: 99,
          '&:hover': {
            backgroundColor: hover ? '#3f3f3f' : '',
          },
        }}
        onClick={onClick}
      >
        {children}
      </TableCell>
    </>
  );
};

export default StickyTableCell;
