import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Button, ButtonGroup, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';

import GridItem from './GridItem';
import TodoSelect from '../table/TodoSelect';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

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

  const { todoData, todoSeq, category } = useSelector((state) => state.todo);

  return (
    <>
      <Grid container spacing={1} className={classes.gridContainer}>
        <Box className={classes.box}>
          <ButtonGroup>
            <Button startIcon={<PersonAddAltIcon />} className={classes.button}>
              캐릭터 추가
            </Button>
            <Button startIcon={<RestartAltIcon />} className={classes.button}>
              리셋
            </Button>
          </ButtonGroup>
          <TodoSelect />
        </Box>
        {todoSeq.map((seq, index) => (
          <GridItem
            key={index}
            id={seq}
            nickname={todoData[seq].nickname}
            dailyArray={dailyArray}
            weeklyArray={weeklyArray}
            category={category}
            data={todoData[seq]}
          />
        ))}
      </Grid>
    </>
  );
};

export default TodoMobile;
