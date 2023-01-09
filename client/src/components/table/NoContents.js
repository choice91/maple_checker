import React from 'react';
import { useDispatch } from 'react-redux';

import { Box, Button } from '@mui/material';

import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';

import bossSlice from '../../redux/slices/bossSlice';
import modalSlice from '../../redux/slices/modalSlice';

const NoContents = ({ page }) => {
  const dispatch = useDispatch();

  // const openAddModal = () => {
  //   if (type === 'quest') {
  //   } else {
  //     dispatch(bossSlice.actions.openBossAddModal());
  //   }
  // };

  const handleOpenModal = () => {
    const args = { page };
    dispatch(modalSlice.actions.openAddModal(args));
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          p: 10,
        }}
      >
        <Box component="span" sx={{ color: '#fff' }}>
          데이터 없음
        </Box>
        <Box component="span" sx={{ color: '#fff' }}>
          캐릭터 추가 버튼을 눌러 캐릭터를 추가해주세요.
        </Box>
        <br />
        <Button
          startIcon={<PersonAddAltIcon />}
          sx={{
            border: '1px solid #5f5f5f',
            color: '#fff',
            pl: 2,
            pr: 2,
            '&:hover': {
              border: '1px solid #fff',
              backgroundColor: 'inherit',
            },
          }}
          onClick={handleOpenModal}
        >
          캐릭터 추가
        </Button>
      </Box>
    </>
  );
};

export default NoContents;
