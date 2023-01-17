import React from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

import { todoCheck } from '../../redux/async/todo';
import { bossCheck } from '../../redux/async/boss';
import todoSlice from '../../redux/slices/todoSlice';
import bossSlice from '../../redux/slices/bossSlice';

const useStyles = makeStyles({
  box: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #333',
  },
  title: {
    width: '100%',
    textAlign: 'center',
  },
  checkButton: {
    color: '#808080',
    width: '30%',
  },
  checkIcon: {
    color: '#ff6f61',
  },
  blankIcon: {
    color: '#fff',
  },
});

const Item = ({ id, name, category, dataType, isChecked }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleCheck = () => {
    if (location.pathname === '/todo') {
      const data = { todoId: id, category, todoType: dataType };
      const args = { data, navigate };
      dispatch(todoCheck(args));
      dispatch(todoSlice.actions.todoCheckReducer(data));
    } else if (location.pathname == '/boss') {
      const data = { bossId: id, category, bossType: dataType };
      const args = { data, navigate };
      dispatch(bossCheck(args));
      dispatch(bossSlice.actions.bossCheckReducer(data));
    }
  };

  return (
    <>
      <Box className={classes.box}>
        <Box component="span" className={classes.title}>
          {name}
        </Box>
        <Button className={classes.checkButton} onClick={handleCheck}>
          {isChecked ? (
            <CheckBoxIcon className={classes.checkIcon} />
          ) : (
            <CheckBoxOutlineBlankIcon className={classes.blankIcon} />
          )}
        </Button>
      </Box>
    </>
  );
};

export default Item;
