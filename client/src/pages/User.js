import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, ThemeProvider } from '@mui/material';

import { getProfile } from '../redux/async/user';

import Header from '../components/Header';

import theme from '../components/Theme';

const User = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { username } = useSelector((state) => state.user);

  const [name, setName] = React.useState('');
  const [curPw, setCurPw] = React.useState('');
  const [newPw, setNewPw] = React.useState('');
  const [verifyPw, setVerifyPw] = React.useState('');

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeCurPw = (e) => {
    setCurPw(e.target.value);
  };

  const handleChangeNewPw = (e) => {
    setNewPw(e.target.value);
  };

  const handleChangeVerifyPw = (e) => {
    setVerifyPw(e.target.value);
  };

  const handleSubmit = () => {
    console.log(name, curPw, newPw, verifyPw);

    if (!name || !curPw || !newPw || !verifyPw) {
      alert('빈 칸을 모두 채워주세요.');
    }

    if (newPw !== verifyPw) {
      alert('비밀번호가 일치하지 않습니다.');
    }
  };

  React.useEffect(() => {
    const args = { navigate };
    dispatch(getProfile(args));
  }, []);

  return (
    <>
      <Header page="user" />
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            mt: 15,
          }}
        >
          <Box
            sx={{
              border: '1px solid #fff',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              p: 3,
            }}
          >
            <Box sx={{ mb: 2 }}>{username}</Box>
            <TextField
              label="이름"
              value={username}
              color="success"
              onChange={handleChangeName}
              sx={{ mb: 2 }}
            />
            <TextField
              label="현재 비밀번호"
              color="success"
              type="password"
              onChange={handleChangeCurPw}
              sx={{ mb: 2 }}
              autoFocus={true}
            />
            <TextField
              label="새 비밀번호"
              color="success"
              type="password"
              onChange={handleChangeNewPw}
              sx={{ mb: 2 }}
            />
            <TextField
              label="새 비밀번호 확인"
              color="success"
              type="password"
              onChange={handleChangeVerifyPw}
              sx={{ mb: 2 }}
            />
            <Button variant="contained" color="success" onClick={handleSubmit}>
              변경하기
            </Button>
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default User;
