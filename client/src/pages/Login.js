import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";

import { login } from "../redux/async/user";
import userSlice from "../redux/slices/userSlice";

import SignLayout from "../layout/SignLayout";

import theme from "../shared/Theme";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loginState } = useSelector((state) => state.user);

  const [id, setId] = React.useState("");
  const [pw, setPw] = React.useState("");

  const handleChangeId = (e) => {
    setId(e.target.value);
  };

  const handleChangePw = (e) => {
    setPw(e.target.value);
  };

  const handleSubmit = () => {
    const payload = { data: { id, pw }, navigate };
    dispatch(login(payload));
  };

  const onEnterPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  React.useEffect(() => {
    dispatch(userSlice.actions.initLoginState());
  }, []);

  return (
    <>
      <SignLayout>
        <ThemeProvider theme={theme}>
          <Box
            onKeyPress={onEnterPress}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: theme.palette.success.main }}>
              <LoginIcon />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
              로그인
            </Typography>
            <Box>
              <TextField
                label="아이디"
                type="text"
                color="success"
                onChange={handleChangeId}
                autoFocus={true}
                required={true}
                autoComplete="off"
                fullWidth
              />
              <TextField
                label="비밀번호"
                type="password"
                color="success"
                onChange={handleChangePw}
                required={true}
                fullWidth
                sx={{ mt: 2 }}
              />
              <Button
                type="submit"
                variant="contained"
                color="success"
                fullWidth
                ok={true}
                onClick={handleSubmit}
                disabled={!id || !pw || loginState.isFetching}
                sx={{ mt: 3, fontSize: 20, fontWeight: 700 }}
              >
                {loginState.isFetching ? "로그인중..." : "로그인"}
              </Button>
              <Box
                component="span"
                sx={{ fontSize: 12, color: theme.palette.error.main }}
              >
                {loginState.message}
              </Box>
            </Box>
            <Box sx={{ mt: 1, fontSize: 13 }}>
              아이디가 없나요? &nbsp;
              <Link to="/sign-up">회원가입 하러가기 &rarr;</Link>
            </Box>
          </Box>
        </ThemeProvider>
      </SignLayout>
    </>
  );
};

export default Login;
