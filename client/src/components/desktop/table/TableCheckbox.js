import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { Button, TableCell } from '@mui/material';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

import { todoCheck } from '../../../redux/async/todo';
import { bossCheck } from '../../../redux/async/boss';
import todoSlice from '../../../redux/slices/todoSlice';
import bossSlice from '../../../redux/slices/bossSlice';

import theme from '../../Theme';

const TableCheckbox = ({ id, dataType, category, isChecked }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleCheck = () => {
    if (location.pathname === '/todo') {
      const data = { todoId: id, todoType: dataType };
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
      <ThemeProvider theme={theme}>
        <TableCell
          align="center"
          sx={{
            cursor: 'pointer',
            p: 0,
          }}
          onClick={handleCheck}
        >
          <Button
            sx={{
              width: '100%',
              height: '100%',
              pt: 2,
              pb: 2,
              pl: 0,
              pr: 0,
            }}
          >
            {isChecked ? (
              <CheckBoxIcon color="secondary" />
            ) : (
              <CheckBoxOutlineBlankIcon color="primary" />
            )}
          </Button>
        </TableCell>
      </ThemeProvider>
    </>
  );
};

export default TableCheckbox;
