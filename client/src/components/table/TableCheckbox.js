import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, TableCell } from '@mui/material';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

import { todoCheck } from '../../redux/async/todo';
import { bossCheck } from '../../redux/async/boss';
import todoSlice from '../../redux/slices/todoSlice';
import bossSlice from '../../redux/slices/bossSlice';

const TableCheckbox = ({ id, dataType, category, isChecked }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleCheck = () => {
    if (location.pathname === '/todo') {
      const data = { todoId: id, category, todoType: dataType };
      const args = { data, navigate };
      dispatch(todoCheck(args));
      dispatch(todoSlice.actions.todoCheckReducer(data));
    } else if (location.pathname === '/boss') {
      const data = { bossId: id, category, bossType: dataType };
      const args = { data, navigate };
      dispatch(bossCheck(args));
      dispatch(bossSlice.actions.bossCheckReducer(data));
    }
  };

  return (
    <>
      <TableCell
        align="center"
        sx={{
          cursor: 'pointer',
          p: 0,
          '&:hover .MuiButtonBase-root': {
            backgroundColor: 'rgba(128, 128, 128, 0.1)',
          },
        }}
        onClick={handleCheck}
      >
        <Button
          sx={{
            width: '100%',
            height: '100%',
            pl: 0,
            pr: 0,
            pt: 2,
            pb: 2,
            color: '#808080',
          }}
        >
          {isChecked ? (
            <CheckBoxIcon style={{ color: '#ff6f61' }} />
          ) : (
            <CheckBoxOutlineBlankIcon style={{ color: '#fff' }} />
          )}
        </Button>
      </TableCell>
    </>
  );
};

export default TableCheckbox;
