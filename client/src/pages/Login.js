import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../redux/async/user';

import '../css/pages/login.scss';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [id, setId] = useState('');
  const [pw, setPw] = useState('');

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
    dispatch(
      login({
        data: {
          id,
          pw,
        },
        navigate,
      })
    );
  };

  const onEnterPress = (e) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  };

  return (
    <>
      <div className="login-container">
        <div className="login-container__form" onKeyPress={onEnterPress}>
          <h2 className="login-container__title">로그인</h2>
          <div className="login-container__id-block">
            <span>ID</span>
            <input
              type="text"
              className="login-container__id"
              name="id"
              placeholder="ID"
              onChange={onChange}
            />
          </div>
          <div className="login-container__pw-block">
            <span>PW</span>
            <input
              type="password"
              className="login-container__pw"
              name="password"
              placeholder="password"
              onChange={onChange}
            />
          </div>
          <button className="login-container__submit-btn" onClick={onSubmit}>
            로그인
          </button>
        </div>
        <div className="auth-switch">
          <span>계정이 없나요? &nbsp;</span>
          <Link to="/sign-up">회원가입 하러가기 &rarr;</Link>
        </div>
      </div>
    </>
  );
};

export default Login;
