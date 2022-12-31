import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { login } from '../redux/async/user';

import { Avatar, Box, Button, Typography } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';

import SignContainer from '../components/SignContainer';
import TextFieldComp from '../components/TextFieldComp';

import '../css/pages/login.scss';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [id, setId] = useState('');
  const [pw, setPw] = useState('');

  const { loginErrorMessage } = useSelector((state) => state.user);

  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;

    if (name === 'id') {
      setId(value);
    } else {
      setPw(value);
    }
  };

  const onSubmit = () => {
    const payload = { data: { id, pw }, navigate };
    dispatch(login(payload));
  };

  const onEnterPress = (e) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  };

  return (
    <>
      <SignContainer>
        <Box
          onKeyPress={onEnterPress}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#1976D2' }}>
            <LoginIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
            로그인
          </Typography>
          <Box>
            <TextFieldComp
              id="id"
              label="아이디"
              name="id"
              type="text"
              ok={true}
              onChange={onChange}
            />
            <TextFieldComp
              id="password"
              label="비밀번호"
              name="password"
              type="password"
              ok={true}
              onChange={onChange}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              ok={true}
              onClick={onSubmit}
              sx={{ mt: 3, fontSize: 20, fontWeight: 700 }}
            >
              로그인
            </Button>
            <Box component="span" sx={{ fontSize: 12, color: '#e74c3c' }}>
              {loginErrorMessage}
            </Box>
          </Box>
          <Box sx={{ mt: 1, fontSize: 13, color: '#FFF' }}>
            아이디가 없나요? &nbsp;
            <Link to="/sign-up">회원가입 하러가기 &rarr;</Link>
          </Box>
        </Box>
      </SignContainer>
    </>
  );
};

export default Login;
