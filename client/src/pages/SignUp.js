import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { idCheck, signUp } from '../redux/async/user';

import '../css/pages/signUp.scss';

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [pw2, setPw2] = useState('');
  const [name, setName] = useState('');
  const [idCheckMessage, setIdCheckMessage] = useState({
    color: '',
    message: '',
  });
  const [pwCheckMessage, setPwCheckMessage] = useState({
    color: '',
    message: '',
  });
  const [signUpErrMsg, setSignUpErrMsg] = useState('');

  const { idDupMsg, idDupColor, errorMessage } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    setIdCheckMessage({ color: idDupColor, message: idDupMsg });
  }, [idDupMsg]);

  useEffect(() => {
    setSignUpErrMsg(errorMessage);
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
      setIdCheckMessage({ color: 'red', message: '아이디를 입력해주세요.' });
    } else if (id.length < 5) {
      setIdCheckMessage({
        color: 'red',
        message: '아이디를 5글자 이상 입력해주세요.',
      });
    } else if (!regExp.test(id)) {
      setIdCheckMessage({
        color: 'red',
        message: '영문자 또는 숫자 5~20자로 입력해주세요.',
      });
    } else {
      const payload = { id };
      dispatch(idCheck(payload));
    }
  };

  const checkPw = () => {
    if (pw !== '' && pw2 !== '' && pw == pw2) {
      setPwCheckMessage({ color: 'blue', message: '비밀번호가 일치합니다.' });
    } else {
      setPwCheckMessage({
        color: 'red',
        message: '비밀번호가 일치하지 않습니다.',
      });
    }
  };

  const signUpHandler = () => {
    if (idCheckMessage.color === 'red' && pwCheckMessage.color === 'red') {
      setSignUpErrMsg('ID와 PW를 확인해주세요.');
    } else if (idCheckMessage.color === 'red') {
      setSignUpErrMsg('ID 중복확인을 해주세요.');
    } else if (pwCheckMessage.color === 'red') {
      setSignUpErrMsg('PW를 체크해주세요.');
    } else if (name === '') {
      setSignUpErrMsg('이름을 입력해주세요.');
    } else {
      const payload = { data: { id, pw, pw2, name }, navigate };
      dispatch(signUp(payload));
    }
  };

  return (
    <>
      <div className="sign-up-container">
        <div className="sign-up-container__form">
          <h2 className="sign-up-container__title">회원가입</h2>
          <div className="sign-up-container__id-block">
            <span>아이디</span>
            <div>
              <input
                type="text"
                className="sign-up-container__id"
                name="id"
                placeholder="아이디"
                onChange={onChange}
                onBlur={checkId}
              />
              <span
                className={`sign-up-container__id-msg ${
                  idCheckMessage.color === 'red'
                    ? 'sign-up-container__msg--red'
                    : 'sign-up-container__msg--blue'
                }`}
              >
                {idCheckMessage && idCheckMessage.message}
              </span>
            </div>
          </div>
          <div className="sign-up-container__pw-block">
            <span>비밀번호</span>
            <input
              type="password"
              className="sign-up-container__pw"
              name="password"
              placeholder="비밀번호"
              onChange={onChange}
            />
          </div>
          <div className="sign-up-container__pw-check-block">
            <span>비밀번호 확인</span>
            <div>
              <input
                type="password"
                className="sign-up-container__pw2"
                name="password2"
                placeholder="비밀번호 확인"
                onChange={onChange}
                onBlur={checkPw}
              />
              <span
                className={
                  pwCheckMessage.color === 'red'
                    ? 'sign-up-container__msg--red'
                    : 'sign-up-container__msg--blue'
                }
              >
                {pwCheckMessage && pwCheckMessage.message}
              </span>
            </div>
          </div>
          <div className="sign-up-container__name-block">
            <span>이름</span>
            <input
              type="text"
              className="sign-up-container__name"
              name="name"
              placeholder="이름"
              onChange={onChange}
            />
          </div>
          <button
            className="sign-up-container__submit-btn"
            onClick={signUpHandler}
          >
            가입하기
          </button>
          <span className={signUpErrMsg && 'sign-up-container__msg--red'}>
            {signUpErrMsg}
          </span>
        </div>
        <div className="auth-switch">
          <span>이미 계정이 있나요? &nbsp;</span>
          <Link to="/login">로그인 하러가기 &rarr;</Link>
        </div>
      </div>
    </>
  );
};

export default SignUp;
