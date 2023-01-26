import React from 'react';
import { TableCell, ThemeProvider } from '@mui/material';

import theme from '../../Theme';

const StickyTableCell = (props) => {
  const {
    bgColor,
    fontColor,
    width,
    minWidth,
    fontWeight,
    fontSize,
    cursor,
    hover,
    align,
    colSpan,
    onClick,
    children,
  } = props;

  return (
    <>
      <ThemeProvider theme={theme}>
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
            left: 0,
            zIndex: 10,
            position: 'sticky',
            transition: 'all 0.2s ease-in-out',
            padding: 0,
            '&:hover': {
              backgroundColor: hover ? '#3f3f3f' : '',
            },
          }}
          onClick={onClick}
        >
          {children}
        </TableCell>
      </ThemeProvider>
    </>
  );
};

export default StickyTableCell;
