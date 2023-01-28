import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Box, Button, ButtonGroup, ThemeProvider } from '@mui/material';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

import { resetTodo } from '../../../redux/async/todo';
import { resetBoss } from '../../../redux/async/boss';

import TodoSelect from '../../desktop/table/TodoSelect';
import BossSelect from '../../desktop/table/BossSelect';

import theme from '../../Theme';

const CardTitle = ({ openAddModalFn, category }) => {
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
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            pl: 1,
          }}
        >
          <ButtonGroup sx={{ height: '100%' }}>
            <Button startIcon={<PersonAddAltIcon />} onClick={openAddModalFn}>
              캐릭터 추가
            </Button>
            <Button startIcon={<RestartAltIcon />} onClick={handleReset}>
              리셋
            </Button>
          </ButtonGroup>
          {location.pathname === '/todo' ? <TodoSelect /> : <BossSelect />}
        </Box>
      </ThemeProvider>
    </>
  );
};

export default CardTitle;
