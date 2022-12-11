import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { signUp } from '../redux/async/user';

const SignUp = () => {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [pw2, setPw2] = useState('');
  const [name, setName] = useState('');

  const dispatch = useDispatch();

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

  const signUpHandler = () => {
    const data = { id, pw, pw2, name };
    dispatch(signUp(data));
  };

  return (
    <>
      <div className="sign-up-container">
        <div className="sign-up-container__form-block">
          <h2 className="sign-up-container__title">회원가입</h2>
          <div className="sign-up-container__id-block">
            <span>아이디</span>
            <input
              type="text"
              className="sign-up-container__id"
              name="id"
              placeholder="아이디"
              onChange={onChange}
            />
            <span className="sign-up-container__id-msg"></span>
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
          <div className="sign-up-container__pw-block">
            <span>비밀번호</span>
            <input
              type="password"
              className="sign-up-container__pw2"
              name="password2"
              placeholder="비밀번호 확인"
              onChange={onChange}
            />
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
