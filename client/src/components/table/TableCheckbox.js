import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

import { todoCheck } from '../../redux/async/todo';
import todoSlice from '../../redux/slices/todoSlice';

import CustomTableCell from './CustomTableCell';

const TableCheckbox = ({ id, dataType, data, category, page }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCheck = () => {
    if (page === 'todo') {
      const data = { todoId: id, category, todoType: dataType };
      const args = { data, navigate };
      dispatch(todoCheck(args));
      dispatch(todoSlice.actions.todoCheckReducer(data));
    }
  };

  return (
    <>
      <CustomTableCell
        align="center"
        bgColor="#222"
        fontColor="#fff"
        cursor="pointer"
        onClick={handleCheck}
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
