import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@mui/styles';
import { Box, Button, ButtonGroup } from '@mui/material';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

import TodoSelect from '../../table/TodoSelect';
import BossSelect from '../../table/BossSelect';
import { resetTodo } from '../../../redux/async/todo';
import { resetBoss } from '../../../redux/async/boss';

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

const CardTitle = ({ openAddModalFn, category }) => {
  const classes = useStyles();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleReset = () => {
    const args = { data: { category }, navigate };

    if (location.pathname === '/todo') {
      dispatch(resetTodo(args));
    } else if (location.pathname === '/boss') {
      dispatch(resetBoss(args));
    }
  };

  return (
    <>
      <Box className={classes.box}>
        <ButtonGroup>
          <Button
            startIcon={<PersonAddAltIcon />}
            className={classes.button}
            onClick={openAddModalFn}
          >
            캐릭터 추가
          </Button>
          <Button
            startIcon={<RestartAltIcon />}
            className={classes.button}
            onClick={handleReset}
          >
            리셋
          </Button>
        </ButtonGroup>
        {location.pathname === '/todo' ? <TodoSelect /> : <BossSelect />}
      </Box>
    </>
  );
};

export default CardTitle;
