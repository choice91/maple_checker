import React from 'react';

import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

import CustomTableCell from './CustomTableCell';

const TableCheckbox = ({ id, dataType, data, category }) => {
  return (
    <>
      <CustomTableCell
        align="center"
        bgColor="#222"
        fontColor="#fff"
        cursor="pointer"
      >
        {data[category][dataType] ? (
          <CheckBoxIcon style={{ color: '#3498db' }} />
        ) : (
          <CheckBoxOutlineBlankIcon style={{ color: '#fff' }} />
        )}
      </CustomTableCell>
    </>
  );
};

export default TableCheckbox;
