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
  const [idValidation, setIdValidation] = React.useState({
    ok: true,
    message: "",
  });
  const [pwCheck, setPwCheck] = React.useState({ ok: true, message: "" });
  const [pwConfirmCheck, setPwConfirmCheck] = React.useState({
    ok: true,
    message: "",
  });
  const [nameCheck, setNameCheck] = React.useState({ ok: true, message: "" });
  const [signUpResult, setSignUpResult] = React.useState({
    ok: true,
    message: "",
  });

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
      setIdValidation({ ok: false, message: "아이디를 입력해주세요." });
    } else if (id.length < 5) {
      setIdValidation({
        ok: false,
        message: "아이디를 5글자 이상 입력해주세요",
      });
    } else if (!regExp.test(id)) {
      setIdValidation({
        ok: false,
        message: "영문자 또는 숫자 5~20자로 입력해주세요.",
      });
    } else {
      const args = { data: { id: id.replaceAll(/\s/g, "") }, navigate };
      dispatch(idCheck(args));
    }
  };

  const handleCheckPw = () => {
    if (!pw) {
      setPwCheck({ ok: false, message: "비밀번호를 입력하세요." });
    }
  };

  const handleCheckConfirmPw = () => {
    if (!pw2) {
      setPwConfirmCheck({ ok: false, message: "비밀번호 확인을 입력하세요." });
    } else if (pw !== pw2) {
      setPwCheck({ ok: false, message: "비밀번호가 일치하지 않습니다." });
      setPwConfirmCheck({
        ok: false,
        message: "비밀번호가 일치하지 않습니다.",
      });
    } else if (pw === pw2) {
      setPwCheck({ ok: true, message: "사용할 수 있는 비밀번호입니다." });
      setPwConfirmCheck({
        ok: true,
        message: "사용할 수 있는 비밀번호입니다.",
      });
    }
  };

  const handleCheckName = () => {
    if (!name) {
      setNameCheck({ ok: false, message: "이름을 입력해주세요" });
    }
  };

  const handleSignUp = () => {
    const data = { data: { id, pw, pw2, name }, navigate };
    dispatch(signUp(data));
  };

  React.useEffect(() => {
    if (signUpState.message === "id duplication") {
      setIdValidation({
        ok: false,
        message: "중복된 아이디입니다.",
      });
    } else if (signUpState.message === "valid id") {
      setIdValidation({
        ok: true,
        message: "사용할 수 있는 아이디입니다.",
      });
    } else if (signUpState.message === "exist id") {
      setSignUpResult({ ok: false, message: "아이디 중복확인을 해주세요." });
    }
  }, [dispatch, signUpState]);

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
                error={!idValidation.ok}
                fullWidth
                required
                autoFocus
                autoComplete="off"
                helperText={idValidation.message}
                onChange={handleChange}
                onBlur={handleCheckId}
                sx={{ mb: 2 }}
              />
              <TextField
                id="password"
                label="비밀번호"
                type="password"
                color="success"
                error={!pwCheck.ok}
                helperText={pwCheck.message}
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
                error={!pwConfirmCheck.ok}
                helperText={pwConfirmCheck.message}
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
                error={!nameCheck.ok}
                helperText={nameCheck.message}
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
                disabled={!name || !id || !pw || !pw2 || signUpState.isFetching}
                sx={{ mt: 3, fontSize: 20, fontWeight: 700 }}
              >
                {signUpState.isFetching ? "회원가입중이에요" : "회원가입"}
              </Button>
              <Box
                component="span"
                sx={{ fontSize: 12, color: theme.palette.error.main }}
              >
                {signUpResult.message}
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
