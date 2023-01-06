import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import todoSlice from '../../redux/slices/todoSlice';
import bossSlice from '../../redux/slices/bossSlice';
import modalSlice from '../../redux/slices/modalSlice';
import { resetQuestData } from '../../redux/async/quest';
import { resetBossData } from '../../redux/async/boss';

import { Box, ButtonGroup, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

const theme = createTheme({
  palette: {
    primary: {
      main: '#fff',
      gray: '#191919',
    },
  },
});

const TableBtn = ({ page }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const openAddModal = () => {
    const args = { page };
    dispatch(modalSlice.actions.openAddModal(args));

    if (page === 'todo') {
      dispatch(todoSlice.actions.clearTodoErrorMsg());
    } else {
      dispatch(bossSlice.actions.clearBossErrorMsg());
    }
  };

  const resetData = () => {
    const args = { navigate };

    if (page === 'todo') {
      dispatch(resetQuestData(args));
    } else {
      dispatch(resetBossData(args));
    }
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            backgroundColor: 'primary.gray',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <ButtonGroup>
            <Button startIcon={<PersonAddAltIcon />} onClick={openAddModal}>
              캐릭터 추가
            </Button>
            <Button startIcon={<RestartAltIcon />} onClick={resetData}>
              리셋
            </Button>
          </ButtonGroup>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default TableBtn;
