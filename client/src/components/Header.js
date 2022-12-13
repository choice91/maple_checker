import React from 'react';
import { useNavigate } from 'react-router-dom';

import CheckBoxIcon from '@mui/icons-material/CheckBox';
import PaidIcon from '@mui/icons-material/Paid';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

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
        <li>
          <CheckBoxIcon fontSize="large" />
          <span>일퀘</span>
        </li>
        <li>
          <PaidIcon fontSize="large" />
          <span>주보</span>
        </li>
        <li>
          <CalendarMonthIcon fontSize="large" />
          <span>이벤트</span>
        </li>
        <li onClick={logout}>
          <LogoutIcon fontSize="large" />
          <span>로그아웃</span>
        </li>
        <li>
          <AccountBoxIcon fontSize="large" />
          <span>프로필</span>
        </li>
      </header>
    </>
  );
};

export default Header;
