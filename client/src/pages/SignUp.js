import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { idCheck, signUp } from '../redux/async/user';
import userSlice from '../redux/slices/userSlice';

import { Avatar, Box, Button, Typography } from '@mui/material';

import SignContainer from '../components/SignContainer';
import TextFieldComp from '../components/TextFieldComp';

import SensorOccupiedIcon from '@mui/icons-material/SensorOccupied';

import '../css/pages/signUp.scss';

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [pw2, setPw2] = useState('');
  const [name, setName] = useState('');
  const [idCheckResult, setIdCheckResult] = useState({ ok: true, message: '' });
  const [pwCheckResult, setPwCheckResult] = useState({ ok: true, message: '' });
  const [signUpMsg, setSignUpMsg] = useState('');

  const { idDupMsg, isIdOk, errorMessage } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(userSlice.actions.initIdCheckMsg());
  }, []);

  useEffect(() => {
    setIdCheckResult({ ok: isIdOk, message: idDupMsg });
  }, [isIdOk, idDupMsg]);

  useEffect(() => {
    setSignUpMsg(errorMessage);
  }, [errorMessage]);

  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;

    if (name === 'id') {
      setId(value);
    } else if (name === 'password') {
      setPw(value);
    } else if (name === 'password2') {
      setPw2(value);
    } else {
      setName(value);
    }
  };

  const checkId = () => {
    const regExp = /^[a-z]+[a-z0-9]{4,19}$/g;

    if (id === '') {
      setIdCheckResult({ ok: false, message: '아이디를 입력해주세요.' });
    } else if (id.length < 5) {
      setIdCheckResult({
        ok: false,
        message: '아이디를 5글자 이상 입력해주세요.',
      });
    } else if (!regExp.test(id)) {
      setIdCheckResult({
        ok: false,
        message: '영문자 또는 숫자 5~20자로 입력해주세요.',
      });
    } else {
      const data = { id: id.replaceAll(/\s/g, '') };
      dispatch(idCheck(data));
    }
  };

  const checkPw = () => {
    if (pw !== '' && pw2 !== '' && pw == pw2) {
      setPwCheckResult({ ok: true, message: '비밀번호가 일치합니다.' });
    } else {
      setPwCheckResult({
        ok: false,
        message: '비밀번호가 일치하지 않습니다.',
      });
    }
  };

  const signUpHandler = () => {
    if (!idCheckResult.ok && !pwCheckResult.ok) {
      setSignUpMsg('ID와 PW를 확인해주세요');
    } else if (!idCheckResult.ok) {
      setSignUpMsg('ID를 확인해주세요');
    } else if (!pwCheckResult.ok) {
      setSignUpMsg('PW를 확인해주세요');
    } else if (!name) {
      setSignUpMsg('이름을 입력해주세요');
    } else if (idCheckResult.ok) {
      const data = { data: { id, pw, pw2, name }, navigate };
      dispatch(signUp(data));
    }
  };

  return (
    <>
      <SignContainer>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#1976D2' }}>
            <SensorOccupiedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
            회원가입
          </Typography>
          <Box>
            <TextFieldComp
              id="id"
              label="아이디"
              name="id"
              type="text"
              onChange={onChange}
              onBlur={checkId}
              ok={idCheckResult.ok}
              helperText={idCheckResult.message}
            />
            <TextFieldComp
              id="password"
              label="비밀번호"
              name="password"
              type="password"
              onChange={onChange}
              ok={pwCheckResult.ok}
              helperText={pwCheckResult.message}
            />
            <TextFieldComp
              id="password2"
              label="비밀번호 확인"
              name="password2"
              type="password"
              onChange={onChange}
              onBlur={checkPw}
              ok={pwCheckResult.ok}
              helperText={pwCheckResult.message}
            />
            <TextFieldComp
              id="name"
              label="이름"
              name="name"
              type="text"
              ok={true}
              onChange={onChange}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              onClick={signUpHandler}
              sx={{ mt: 3, fontSize: 20, fontWeight: 700 }}
            >
              회원가입
            </Button>
            <Box component="span" sx={{ fontSize: 12, color: '#e74c3c' }}>
              {signUpMsg}
            </Box>
          </Box>
          <Box sx={{ mt: 1, fontSize: 13, color: '#fff' }}>
            이미 계정이 있나요? &nbsp;
            <Link to="/login">로그인 하러가기 &rarr;</Link>
          </Box>
        </Box>
      </SignContainer>
      {/*<div className="sign-up-container">*/}
      {/*  <div className="sign-up-container__form">*/}
      {/*    <h2 className="sign-up-container__title">회원가입</h2>*/}
      {/*    <div className="sign-up-container__id-block">*/}
      {/*      <span>아이디</span>*/}
      {/*      <div>*/}
      {/*        <input*/}
      {/*          type="text"*/}
      {/*          className="sign-up-container__id"*/}
      {/*          name="id"*/}
      {/*          placeholder="아이디"*/}
      {/*          onChange={onChange}*/}
      {/*          onBlur={checkId}*/}
      {/*        />*/}
      {/*        <span*/}
      {/*          className={`sign-up-container__id-msg ${*/}
      {/*            idCheckMessage.color === 'red'*/}
      {/*              ? 'sign-up-container__msg--red'*/}
      {/*              : 'sign-up-container__msg--blue'*/}
      {/*          }`}*/}
      {/*        >*/}
      {/*          {idCheckMessage && idCheckMessage.message}*/}
      {/*        </span>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*    <div className="sign-up-container__pw-block">*/}
      {/*      <span>비밀번호</span>*/}
      {/*      <input*/}
      {/*        type="password"*/}
      {/*        className="sign-up-container__pw"*/}
      {/*        name="password"*/}
      {/*        placeholder="비밀번호"*/}
      {/*        onChange={onChange}*/}
      {/*      />*/}
      {/*    </div>*/}
      {/*    <div className="sign-up-container__pw-check-block">*/}
      {/*      <span>비밀번호 확인</span>*/}
      {/*      <div>*/}
      {/*        <input*/}
      {/*          type="password"*/}
      {/*          className="sign-up-container__pw2"*/}
      {/*          name="password2"*/}
      {/*          placeholder="비밀번호 확인"*/}
      {/*          onChange={onChange}*/}
      {/*          onBlur={checkPw}*/}
      {/*        />*/}
      {/*        <span*/}
      {/*          className={*/}
      {/*            pwCheckMessage.color === 'red'*/}
      {/*              ? 'sign-up-container__msg--red'*/}
      {/*              : 'sign-up-container__msg--blue'*/}
      {/*          }*/}
      {/*        >*/}
      {/*          {pwCheckMessage && pwCheckMessage.message}*/}
      {/*        </span>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*    <div className="sign-up-container__name-block">*/}
      {/*      <span>이름</span>*/}
      {/*      <input*/}
      {/*        type="text"*/}
      {/*        className="sign-up-container__name"*/}
      {/*        name="name"*/}
      {/*        placeholder="이름"*/}
      {/*        onChange={onChange}*/}
      {/*      />*/}
      {/*    </div>*/}
      {/*    <button*/}
      {/*      className="sign-up-container__submit-btn"*/}
      {/*      onClick={signUpHandler}*/}
      {/*    >*/}
      {/*      가입하기*/}
      {/*    </button>*/}
      {/*    <span className={signUpErrMsg && 'sign-up-container__msg--red'}>*/}
      {/*      {signUpErrMsg}*/}
      {/*    </span>*/}
      {/*  </div>*/}
      {/*  <div className="auth-switch">*/}
      {/*    <span>이미 계정이 있나요? &nbsp;</span>*/}
      {/*    <Link to="/login">로그인 하러가기 &rarr;</Link>*/}
      {/*  </div>*/}
      {/*</div>*/}
    </>
  );
};

export default SignUp;
