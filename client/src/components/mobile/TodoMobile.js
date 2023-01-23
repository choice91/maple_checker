import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@mui/styles';
import { Grid } from '@mui/material';

import modalSlice from '../../redux/slices/modalSlice';
import todoSlice from '../../redux/slices/todoSlice';

import CardTitle from './common/CardTitle';
import GridCard from './common/GridCard';

const useStyles = makeStyles({
  gridContainer: {
    marginTop: '1.5rem',
    paddingLeft: '0.5rem',
    paddingRight: '0.5rem',
  },
  box: {
    paddingLeft: '0.5rem',
    paddingRight: '0.5rem',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    color: '#fff',
    border: '1px solid rgba(255, 255, 255, 0.5)',
    '&:hover': {
      border: '1px solid rgba(255, 255, 255, 1)',
    },
  },
});

const TodoMobile = ({ dailyArray, weeklyArray }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { todoData, todoSeq, category } = useSelector((state) => state.todo);

  const handleOpenAddModal = () => {
    const args = { page: 'todo' };
    dispatch(modalSlice.actions.openAddModal(args));
    dispatch(todoSlice.actions.clearTodoErrorMsg());
  };

  return (
    <>
      <Grid container spacing={1} className={classes.gridContainer}>
        <CardTitle openAddModalFn={handleOpenAddModal} category={category} />
        {todoSeq.map((seq, index) => (
          <GridCard
            id={seq}
            index={index}
            maxLength={todoSeq.length}
            nickname={todoData[seq].nickname}
            job={todoData[seq].job}
            array={category === 'daily' ? dailyArray : weeklyArray}
            category={category}
            data={todoData[seq]}
          />
        ))}
      </Grid>
    </>
  );
};

export default TodoMobile;
