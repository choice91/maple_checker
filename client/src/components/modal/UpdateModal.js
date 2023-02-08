import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  ThemeProvider,
  TextField,
  Button,
} from "@mui/material";

import modalSlice from "../../redux/slices/modalSlice";
import todoSlice from "../../redux/slices/todoSlice";
import bossSlice from "../../redux/slices/bossSlice";
import { updateCharacter } from "../../redux/async/todo";
import { updateCharacterToBoss } from "../../redux/async/boss";

import JobSelect from "./element/JobSelect";

import useModal from "../../hooks/useModal";
import theme from "../../shared/Theme";

const UpdateModal = ({ page, isUpdateModalOpen, updateState }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { closeUpdateModal } = useModal();

  const { id, nickname, job } = useSelector((state) => state.modal);

  const [replaceNickname, setReplaceNickname] = React.useState("");

  const handleClose = () => {
    closeUpdateModal();

    if (page === "todo") {
      dispatch(todoSlice.actions.clearTodoErrorMsg());
    } else if (page === "boss") {
      dispatch(bossSlice.actions.clearBossErrorMsg());
    }
  };

  const handleUpdate = () => {
    const args = {
      data: { id, newNickname: replaceNickname, newJob: job },
      navigate,
    };

    if (page === "todo") {
      dispatch(updateCharacter(args));
    } else if (page === "boss") {
      dispatch(updateCharacterToBoss(args));
    }
  };

  const handleUpdateEnter = (e) => {
    if (e.key === "Enter") {
      handleUpdate();
    }
  };

  const handleChangeNickname = (e) => {
    setReplaceNickname(e.target.value);
  };

  const handleChangeJob = (e) => {
    dispatch(modalSlice.actions.setJob({ job: e.target.value }));
  };

  React.useEffect(() => {
    setReplaceNickname(nickname);
  }, [nickname]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Dialog
          open={isUpdateModalOpen}
          onClose={handleClose}
          aria-labelledby="character add modal"
        >
          <Box>
            <DialogTitle>닉네임 수정</DialogTitle>
            <DialogContent dividers={true}>
              <TextField
                label="닉네임"
                color="success"
                value={replaceNickname}
                autoComplete="off"
                autoFocus
                required
                error={!updateState.isNicknameValid}
                helperText={updateState.nicknameResultMessage}
                onChange={handleChangeNickname}
                onKeyPress={handleUpdateEnter}
              />
              <JobSelect
                job={job}
                error={!updateState.isJobValid}
                helperText={updateState.jobResultMessage}
                onChange={handleChangeJob}
              />
            </DialogContent>
            <DialogActions>
              <Button color="success" onClick={handleClose}>
                취소
              </Button>
              <Button
                color="success"
                disabled={!replaceNickname || !job}
                onClick={handleUpdate}
              >
                수정
              </Button>
            </DialogActions>
          </Box>
        </Dialog>
      </ThemeProvider>
    </>
  );
};

export default UpdateModal;
