import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';
import { Box, Button, ButtonGroup, Grid } from '@mui/material';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

import modalSlice from '../../redux/slices/modalSlice';
import todoSlice from '../../redux/slices/todoSlice';
import BossSelect from '../table/BossSelect';
import BossCard from './BossCard';

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

const BossMobile = ({ weeklyArray, monthlyArray }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { bossData, bossSeq, category } = useSelector((state) => state.boss);

  const openAddModal = () => {
    const args = { page: 'boss' };
    dispatch(modalSlice.actions.openAddModal(args));
    dispatch(todoSlice.actions.clearTodoErrorMsg());
  };

  return (
    <>
      <Grid container spacing={1} className={classes.gridContainer}>
        <Box className={classes.box}>
          <ButtonGroup>
            <Button
              startIcon={<PersonAddAltIcon />}
              className={classes.button}
              onClick={openAddModal}
            >
              캐릭터 추가
            </Button>
            <Button startIcon={<RestartAltIcon />} className={classes.button}>
              리셋
            </Button>
          </ButtonGroup>
          <BossSelect />
        </Box>
        {bossSeq.map((seq, index) => (
          <BossCard
            kye={index}
            id={seq}
            index={index}
            maxLength={bossSeq.length}
            nickname={bossData[seq].nickname}
            weeklyArray={weeklyArray}
            monthlyArray={monthlyArray}
            category={category}
            data={bossData[seq]}
          />
        ))}
      </Grid>
    </>
  );
};

export default BossMobile;
