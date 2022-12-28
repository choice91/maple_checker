import React from 'react';
import { useNavigate } from 'react-router-dom';

import CheckBoxIcon from '@mui/icons-material/CheckBox';
import PaidIcon from '@mui/icons-material/Paid';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

import '../css/components/header.scss';

const Header = ({ page }) => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login', { replace: true });
  };

  const changePage = (e) => {
    const { value } = e.currentTarget;

    switch (value) {
      case 0:
        navigate('/quest');
        break;
      case 1:
        navigate('/boss');
        break;
      case 2:
        navigate('/event');
        break;
    }
  };

  return (
    <>
      <header>
        <li
          className={page === 'quest' ? 'header__nav--orange' : ''}
          value={0}
          onClick={changePage}
        >
          <CheckBoxIcon fontSize="large" />
          <span>일퀘</span>
        </li>
        <li
          className={page === 'boss' ? 'header__nav--orange' : ''}
          value={1}
          onClick={changePage}
        >
          <PaidIcon fontSize="large" />
          <span>주보</span>
        </li>
        <li
          className={page === 'event' ? 'header__nav--orange' : ''}
          value={2}
          onClick={changePage}
        >
          <CalendarMonthIcon fontSize="large" />
          <span>이벤트</span>
        </li>
        <li value={3} onClick={logout}>
          <LogoutIcon fontSize="large" />
          <span>로그아웃</span>
        </li>
        <li value={4} onClick={changePage}>
          <AccountBoxIcon fontSize="large" />
          <span>프로필</span>
        </li>
      </header>
    </>
  );
};

export default Header;
