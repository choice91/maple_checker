import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, ThemeProvider } from "@mui/material";

import userSlice from "../redux/slices/userSlice";
import { getProfile, updateProfile } from "../redux/async/user";

import Header from "../components/Header";

import theme from "../shared/Theme";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { profile } = useSelector((state) => state.user);

  const [name, setName] = React.useState("");
  const [curPw, setCurPw] = React.useState("");
  const [newPw, setNewPw] = React.useState("");
  const [verifyPw, setVerifyPw] = React.useState("");

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

  const handleOnBlurUsername = () => {
    if (!name) {
      dispatch(
        userSlice.actions.validateProfile({
          nameCheckError: true,
          nameCheckMessage: "이름을 입력해주세요.",
        })
      );
    } else {
      dispatch(
        userSlice.actions.validateProfile({
          nameCheckError: false,
          nameCheckMessage: "",
        })
      );
    }
  };

  const handleOnBlurCurrentPw = () => {
    if (!curPw) {
      dispatch(
        userSlice.actions.validateProfile({
          currentPwCheckError: true,
          currentPwCheckMessage: "이름을 입력해주세요.",
        })
      );
    } else {
      dispatch(
        userSlice.actions.validateProfile({
          currentPwCheckError: false,
          currentPwCheckMessage: "",
        })
      );
    }
  };

  const handleOnBlurPw = () => {
    if (!newPw) {
      dispatch(
        userSlice.actions.validateProfile({
          pwCheckError: true,
          pwCheckMessage: "비밀번호를 입력해주세요.",
        })
      );
    } else {
      dispatch(
        userSlice.actions.validateProfile({
          pwCheckError: false,
          pwCheckMessage: "",
        })
      );
    }
  };

  const handleOnBlurPw2 = () => {
    if (!newPw) {
      dispatch(
        userSlice.actions.validateProfile({
          pw2CheckError: true,
          pw2CheckMessage: "비밀번호를 입력해주세요.",
        })
      );
    } else {
      dispatch(
        userSlice.actions.validateProfile({
          pw2CheckError: false,
          pw2CheckMessage: "",
        })
      );
    }
  };

  const handleSubmit = () => {
    const args = { data: { name, curPw, newPw, verifyPw }, navigate };
    dispatch(updateProfile(args));
  };

  React.useEffect(() => {
    const args = { navigate };
    dispatch(getProfile(args));
  }, []);

  React.useEffect(() => {
    setName(profile.username);
  }, [profile]);

  React.useEffect(() => {
    dispatch(userSlice.actions.initProfileState());
  }, []);

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
              error={profile.nameCheckError}
              helperText={profile.nameCheckMessage}
              required={true}
              autoComplete="off"
              onChange={handleChangeName}
              onBlur={handleOnBlurUsername}
              fullWidth
              sx={{ mt: 2, mb: 2, width: 300 }}
            />
            <TextField
              label="현재 비밀번호"
              color="success"
              type="password"
              error={profile.currentPwCheckError}
              helperText={profile.currentPwCheckMessage}
              required={true}
              onChange={handleChangeCurPw}
              onBlur={handleOnBlurCurrentPw}
              autoFocus={true}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="새 비밀번호"
              color="success"
              type="password"
              error={profile.pwCheckError}
              helperText={profile.pwCheckMessage}
              required={true}
              onChange={handleChangeNewPw}
              onBlur={handleOnBlurPw}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="새 비밀번호 확인"
              color="success"
              type="password"
              error={profile.pw2CheckError}
              helperText={profile.pw2CheckMessage}
              required={true}
              onChange={handleChangeVerifyPw}
              onBlur={handleOnBlurPw2}
              fullWidth
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              color="success"
              disabled={
                !name || !curPw || !newPw || !verifyPw || profile.isFetching
              }
              onClick={handleSubmit}
            >
              {profile.isFetching ? "변경중..." : "변경하기"}
            </Button>
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default Profile;
