import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import questSlice from '../../redux/slices/questSlice';
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
    if (page === 'todo') {
      // dispatch(questSlice.actions.openQuestAddModal());
      // setAddModalOpen(true);
      dispatch(modalSlice.actions.openAddModal());
    } else {
      dispatch(bossSlice.actions.openBossAddModal());
    }
  };

  const resetData = () => {
    if (page === 'todo') {
      dispatch(resetQuestData({ navigate }));
    } else {
      dispatch(resetBossData({ navigate }));
    }
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Box sx={{ backgroundColor: 'primary.gray' }}>
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
      {/*<div className="table-btn">*/}
      {/*  <button onClick={openAddModal}>*/}
      {/*    <PersonAddAltIcon />*/}
      {/*    <span>캐릭터 추가</span>*/}
      {/*  </button>*/}
      {/*  <button onClick={resetData}>*/}
      {/*    <RestartAltIcon />*/}
      {/*    <span>리셋</span>*/}
      {/*  </button>*/}
      {/*</div>*/}
    </>
  );
};

export default TableBtn;
