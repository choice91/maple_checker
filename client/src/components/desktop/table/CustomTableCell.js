import React from 'react';
import { TableCell, ThemeProvider } from '@mui/material';

import theme from '../../Theme';

const CustomTableCell = (props) => {
  const { align, colSpan, onClick, children } = props;

  return (
    <>
      <ThemeProvider theme={theme}>
        <TableCell
          align={align}
          colSpan={colSpan}
          sx={{
            backgroundColor: props.bgColor,
            color: props.fontColor,
            width: props.width,
            minWidth: props.minWidth,
            fontWeight: props.fontWeight,
            fontSize: props.fontSize,
            cursor: props.cursor ? props.cursor : 'default',
            left: props.left,
            zIndex: props.zIndex,
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              backgroundColor: props.hover ? '#3f3f3f' : '',
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

export default CustomTableCell;
