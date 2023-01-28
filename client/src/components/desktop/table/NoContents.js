import React from 'react';
import { useDispatch } from 'react-redux';
import { Box, Button, ThemeProvider } from '@mui/material';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';

import modalSlice from '../../../redux/slices/modalSlice';

import theme from '../../Theme';

const NoContents = ({ page }) => {
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    const args = { page };
    dispatch(modalSlice.actions.openAddModal(args));
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            padding: '80px',
          }}
        >
          <Box component="span" sx={{ color: theme.palette.primary.main }}>
            데이터 없음
          </Box>
          <Box component="span" sx={{ color: theme.palette.primary.main }}>
            캐릭터 추가 버튼을 눌러 캐릭터를 추가해주세요.
          </Box>
          <br />
          <Button
            variant="outlined"
            startIcon={<PersonAddAltIcon />}
            onClick={handleOpenModal}
          >
            캐릭터 추가
          </Button>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default NoContents;
