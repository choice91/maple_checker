import React from 'react';

import { useNavigate } from 'react-router-dom';

import '../css/components/header.scss';

const Header = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('user');
    navigate('/login', { replace: true });
  };

  return (
    <>
      <header>
        <div className="header">
          <button className="header__title">메할일</button>
          <ul className="header__btn">
            <li className="header__logout-btn" onClick={logout}>
              logout
            </li>
            <li className="header__profile-btn">profile</li>
          </ul>
        </div>
        <nav>
          <li>일퀘</li>
          <li>주보</li>
          <li>이벤트</li>
        </nav>
      </header>
    </>
  );
};

export default Header;
