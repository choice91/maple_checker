import React from "react";
import { useNavigate } from "react-router-dom";

import {
  AppBar,
  BottomNavigation,
  BottomNavigationAction,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import CheckBoxIcon from "@mui/icons-material/CheckBox";
import PaidIcon from "@mui/icons-material/Paid";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { removeCookie } from "../utils/Cookies";
import { removeLocalStorage } from "../utils/LocalStorage";

import theme from "../shared/Theme";

const Header = ({ page }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeLocalStorage("token");
    removeCookie("refresh");
    navigate("/login", { replace: true });
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <AppBar position="static">
          <BottomNavigation
            showLabels
            sx={{ backgroundColor: theme.palette.grey["900"] }}
          >
            <BottomNavigationAction
              label="메할일"
              icon={<CheckBoxIcon fontSize="medium" />}
              onClick={() => navigate("/todo")}
              sx={{
                color:
                  page === "todo"
                    ? theme.palette.secondary.main
                    : theme.palette.primary.main,
              }}
            />
            <BottomNavigationAction
              label="보스"
              icon={<PaidIcon fontSize="medium" />}
              onClick={() => navigate("/boss")}
              sx={{
                color:
                  page === "boss"
                    ? theme.palette.secondary.main
                    : theme.palette.primary.main,
              }}
            />
            <BottomNavigationAction
              label="내정보"
              icon={<AccountCircleIcon fontSize="medium" />}
              onClick={() => navigate("/user")}
              sx={{
                color:
                  page === "user"
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
