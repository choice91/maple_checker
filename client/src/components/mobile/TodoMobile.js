import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@mui/styles';
import { Grid } from '@mui/material';

import modalSlice from '../../redux/slices/modalSlice';
import todoSlice from '../../redux/slices/todoSlice';

import CardTitle from './element/CardTitle';
import GridCard from './element/GridCard';

const TodoMobile = ({ dailyArray, weeklyArray }) => {
  const dispatch = useDispatch();

  const { todoData, todoSeq, category } = useSelector((state) => state.todo);

  const handleOpenAddModal = () => {
    const args = { page: 'todo' };
    dispatch(modalSlice.actions.openAddModal(args));
    dispatch(todoSlice.actions.clearTodoErrorMsg());
  };

  return (
    <>
      <Grid
        container
        spacing={1}
        sx={{
          mt: 2,
          pl: 1,
          pr: 1,
        }}
      >
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
