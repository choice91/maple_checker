import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  Box,
  Button,
  TextField,
  Typography,
  ThemeProvider,
} from "@mui/material";
import SensorOccupiedIcon from "@mui/icons-material/SensorOccupied";

import userSlice from "../redux/slices/userSlice";
import { idCheck, signUp } from "../redux/async/user";

import SignLayout from "../layout/SignLayout";

import theme from "../shared/Theme";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { signUpState } = useSelector((state) => state.user);

  const [id, setId] = React.useState("");
  const [pw, setPw] = React.useState("");
  const [pw2, setPw2] = React.useState("");
  const [name, setName] = React.useState("");

  const handleChange = (e) => {
    const {
      target: { id, value },
    } = e;

    if (id === "id") {
      setId(value);
    } else if (id === "password") {
      setPw(value);
    } else if (id === "password2") {
      setPw2(value);
    } else {
      setName(value);
    }
  };

  const handleCheckId = () => {
    const regExp = /^[a-z]+[a-z0-9]{4,19}$/g;

    if (!id) {
      dispatch(
        userSlice.actions.validateId({
          isError: true,
          message: "아이디를 입력해주세요.",
        })
      );
    } else if (id.length < 5) {
      dispatch(
        userSlice.actions.validateId({
          isError: true,
          message: "아이디를 5글자 이상 입력해주세요.",
        })
      );
    } else if (!regExp.test(id)) {
      dispatch(
        userSlice.actions.validateId({
          isError: true,
          message: "영문자 또는 숫자 5~20자로 입력해주세요.",
        })
      );
    } else {
      const args = { data: { id: id.replaceAll(/\s/g, "") }, navigate };
      dispatch(idCheck(args));
    }
  };

  const handleCheckPw = () => {
    if (!pw) {
      dispatch(
        userSlice.actions.validatePw({
          isError: true,
          message: "비밀번호를 입력하세요.",
        })
      );
    }
  };

  const handleCheckConfirmPw = () => {
    if (pw !== pw2) {
      dispatch(
        userSlice.actions.comparePwAndPw2({
          isError: true,
          message: "비밀번호가 일치하지 않습니다.",
        })
      );
    } else if (!pw2) {
      dispatch(
        userSlice.actions.validatePw2({
          isError: true,
          message: "비밀번호 확인을 입력하세요.",
        })
      );
    } else if (pw === pw2) {
      dispatch(
        userSlice.actions.comparePwAndPw2({
          isError: false,
          message: "",
        })
      );
    }
  };

  const handleCheckName = () => {
    if (!name) {
      dispatch(
        userSlice.actions.validateName({
          isError: true,
          message: "이름을 입력해주세요.",
        })
      );
    } else {
      dispatch(
        userSlice.actions.validateName({
          isError: false,
          message: "",
        })
      );
    }
  };

  const handleSignUp = () => {
    const data = { data: { id, pw, pw2, name }, navigate };
    dispatch(signUp(data));
  };

  const signUpButtonDisabled = () => {
    return !name || !id || !pw || !pw2 || signUpState.isFetching;
  };

  React.useEffect(() => {
    dispatch(userSlice.actions.initSignUpState());
  }, []);

  return (
    <>
      <SignLayout>
        <ThemeProvider theme={theme}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Avatar sx={{ m: 1, backgroundColor: theme.palette.success.main }}>
              <SensorOccupiedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
              회원가입
            </Typography>
            <Box>
              <TextField
                id="id"
                label="아이디"
                type="text"
                color="success"
                error={signUpState.idCheckError}
                fullWidth
                required
                autoFocus
                autoComplete="off"
                helperText={signUpState.idCheckMessage}
                onChange={handleChange}
                onBlur={handleCheckId}
                sx={{ mb: 2 }}
              />
              <TextField
                id="password"
                label="비밀번호"
                type="password"
                color="success"
                error={signUpState.pwCheckError}
                helperText={signUpState.pwCheckMessage}
                fullWidth
                required
                onChange={handleChange}
                onBlur={handleCheckPw}
                sx={{ mb: 2 }}
              />
              <TextField
                id="password2"
                label="비밀번호 확인"
                type="password"
                color="success"
                error={signUpState.pw2CheckError}
                helperText={signUpState.pw2CheckMessage}
                fullWidth
                required
                onChange={handleChange}
                onBlur={handleCheckConfirmPw}
                sx={{ mb: 2 }}
              />
              <TextField
                id="name"
                label="이름"
                type="text"
                color="success"
                error={signUpState.nameCheckError}
                helperText={signUpState.nameCHeckMessage}
                fullWidth
                required
                onChange={handleChange}
                onBlur={handleCheckName}
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                onClick={handleSignUp}
                color="success"
                disabled={signUpButtonDisabled()}
                sx={{ mt: 3, fontSize: 20, fontWeight: 700 }}
              >
                {signUpState.isFetching ? "회원가입중이에요" : "회원가입"}
              </Button>
              <Box
                component="span"
                sx={{ fontSize: 12, color: theme.palette.error.main }}
              >
                {signUpState.signUpErrorMessage}
              </Box>
            </Box>
            <Box sx={{ mt: 1, fontSize: 13, color: "#fff" }}>
              이미 계정이 있나요? &nbsp;
              <Link to="/login">로그인 하러가기 &rarr;</Link>
            </Box>
          </Box>
        </ThemeProvider>
      </SignLayout>
    </>
  );
};

export default SignUp;
