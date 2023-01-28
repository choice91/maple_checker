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
import { removeLocalStorage } from '../utils/LocalStorage';

import theme from './Theme';

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#fff',
//       gray: '#191919',
//       orange: '#ff6f61',
//     },
//   },
// });

const Header = ({ page }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeLocalStorage('token');
    removeCookie('refresh');
    navigate('/login', { replace: true });
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <AppBar position="static">
          <BottomNavigation
            showLabels
            sx={{ backgroundColor: theme.palette.grey['900'] }}
          >
            <BottomNavigationAction
              label="메할일"
              icon={<CheckBoxIcon fontSize="medium" />}
              onClick={() => navigate('/todo')}
              sx={{
                color:
                  page === 'todo'
                    ? theme.palette.secondary.main
                    : theme.palette.primary.main,
              }}
            />
            <BottomNavigationAction
              label="보스"
              icon={<PaidIcon fontSize="medium" />}
              onClick={() => navigate('/boss')}
              sx={{
                color:
                  page === 'boss'
                    ? theme.palette.secondary.main
                    : theme.palette.primary.main,
              }}
            />
            <BottomNavigationAction
              label="이벤트"
              icon={<CalendarMonthIcon fontSize="medium" />}
              onClick={() => navigate('/event')}
              sx={{
                color:
                  page === 'event'
                    ? theme.palette.secondary.main
                    : theme.palette.primary.main,
              }}
            />
            <BottomNavigationAction
              label="로그아웃"
              icon={<LogoutIcon fontSize="medium" />}
              onClick={handleLogout}
              sx={{ color: theme.palette.primary.main }}
            />
          </BottomNavigation>
        </AppBar>
      </ThemeProvider>
    </>
  );
};

export default Header;
