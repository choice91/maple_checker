import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, ThemeProvider } from "@mui/material";

import { getProfile, updateProfile } from "../redux/async/user";

import Header from "../components/Header";

import theme from "../shared/Theme";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { username, profile } = useSelector((state) => state.user);

  const [name, setName] = React.useState("");
  const [curPw, setCurPw] = React.useState("");
  const [newPw, setNewPw] = React.useState("");
  const [verifyPw, setVerifyPw] = React.useState("");
  const [profileError, setProfileError] = React.useState({
    password: { isError: false, errorMessage: "" },
    newPassword: { isError: false, errorMessage: "" },
    verifyPassword: { isError: false, errorMessage: "" },
  });
  const profileErrorDefault = {
    password: { isError: false, errorMessage: "" },
    newPassword: { isError: false, errorMessage: "" },
    verifyPassword: { isError: false, errorMessage: "" },
  };

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeCurPw = (e) => {
    setCurPw(e.target.value);
  };

  const handleChangeNewPw = (e) => {
    setNewPw(e.target.value);
  };

  const handleChangeVerifyPw = (e) => {
    setVerifyPw(e.target.value);
  };

  const handleSubmit = () => {
    if (curPw === newPw) {
      setProfileError({
        ...profileErrorDefault,
        password: {
          isError: true,
          errorMessage: "현재 비밀번호와 변경할 비밀번호가 일치합니다.",
        },
        newPassword: {
          isError: true,
          errorMessage: "현재 비밀번호와 변경할 비밀번호가 일치합니다.",
        },
      });
    } else if (newPw !== verifyPw) {
      setProfileError({
        ...profileErrorDefault,
        newPassword: {
          isError: true,
          errorMessage: "비밀번호가 서로 일치하지 않습니다.",
        },
        verifyPassword: {
          isError: true,
          errorMessage: "비밀번호가 서로 일치하지 않습니다.",
        },
      });
    } else {
      const args = { data: { name, curPw, newPw, verifyPw }, navigate };
      dispatch(updateProfile(args));
    }
  };

  const handlePwErrorMessage = () => {
    if (!curPw) {
      setProfileError({
        ...profileErrorDefault,
        password: { isError: true, errorMessage: "비밀번호를 입력해주세요." },
      });
    } else {
      setProfileError({
        ...profileErrorDefault,
        password: { isError: false, errorMessage: "" },
      });
    }
  };

  React.useEffect(() => {
    const args = { navigate };
    dispatch(getProfile(args));
  }, []);

  React.useEffect(() => {
    setName(username);
  }, [username]);

  React.useEffect(() => {
    if (profile.errorType === "password incorrect") {
      setProfileError({
        ...profileErrorDefault,
        password: { isError: true, errorMessage: "비밀번호가 틀렸습니다." },
      });
    } else if (profile.errorType === "password does not match") {
      setProfileError({
        ...profileErrorDefault,
        newPassword: {
          isError: true,
          errorMessage: "비밀번호가 서로 일치하지 않습니다.",
        },
        verifyPassword: {
          isError: true,
          errorMessage: "비밀번호가 서로 일치하지 않습니다.",
        },
      });
    }
  }, [dispatch, profile]);

  return (
    <>
      <Header page="user" />
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 15,
          }}
        >
          <Box
            sx={{
              border: "1px solid #fff",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              p: 3,
            }}
          >
            <TextField
              label="이름"
              type="text"
              value={name}
              color="success"
              error={!name ? true : false}
              helperText={!name ? "이름을 입력해주세요." : ""}
              required={true}
              autoComplete="off"
              onChange={handleChangeName}
              fullWidth
              sx={{ mt: 2, mb: 2, width: 300 }}
            />
            <TextField
              label="현재 비밀번호"
              color="success"
              type="password"
              error={profileError.password.isError}
              helperText={profileError.password.errorMessage}
              onBlur={handlePwErrorMessage}
              required={true}
              onChange={handleChangeCurPw}
              autoFocus={true}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="새 비밀번호"
              color="success"
              type="password"
              error={profileError.newPassword.isError}
              helperText={profileError.newPassword.errorMessage}
              required={true}
              onChange={handleChangeNewPw}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="새 비밀번호 확인"
              color="success"
              type="password"
              error={profileError.verifyPassword.isError}
              helperText={profileError.verifyPassword.errorMessage}
              required={true}
              onChange={handleChangeVerifyPw}
              fullWidth
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              color="success"
              disabled={
                !name || !curPw || !newPw || !verifyPw || profile.isFetching
                  ? true
                  : false
              }
              onClick={handleSubmit}
            >
              {profile.isFetching ? "요청중..." : "변경하기"}
            </Button>
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default Profile;
