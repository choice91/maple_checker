import React from 'react';
import { useNavigate } from 'react-router-dom';

import {
  AppBar,
  BottomNavigation,
  BottomNavigationAction,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import CheckBoxIcon from '@mui/icons-material/CheckBox';
import PaidIcon from '@mui/icons-material/Paid';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { removeCookie } from '../utils/Cookies';

const theme = createTheme({
  palette: {
    primary: {
      main: '#fff',
      gray: '#191919',
      orange: '#e74c3c',
    },
  },
});

const Header = ({ page }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // localStorage.removeItem('token');
    removeCookie('access');
    removeCookie('refresh');
    navigate('/login', { replace: true });
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <AppBar position="static" sx={{ backgroundColor: 'primary.gray' }}>
          <BottomNavigation showLabels sx={{ backgroundColor: 'primary.gray' }}>
            <BottomNavigationAction
              label="메할일"
              icon={<CheckBoxIcon fontSize="medium" />}
              onClick={() => navigate('/todo')}
              sx={{
                color: page === 'todo' ? 'primary.orange' : 'primary.main',
              }}
            />
            <BottomNavigationAction
              label="보스"
              icon={<PaidIcon fontSize="medium" />}
              onClick={() => navigate('/boss')}
              sx={{
                color: page === 'boss' ? 'primary.orange' : 'primary.main',
              }}
            />
            <BottomNavigationAction
              label="이벤트"
              icon={<CalendarMonthIcon fontSize="medium" />}
              onClick={() => navigate('/event')}
              sx={{
                color: page === 'event' ? 'primary.orange' : 'primary.main',
              }}
            />
            <BottomNavigationAction
              label="로그아웃"
              icon={<LogoutIcon fontSize="medium" />}
              onClick={handleLogout}
              sx={{ color: 'primary.main' }}
            />
          </BottomNavigation>
        </AppBar>
      </ThemeProvider>
    </>
  );
};

export default Header;
