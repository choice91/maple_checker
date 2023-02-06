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
import { addCharacterToTodo } from "../../redux/async/todo";
import { addCharacterToBoss } from "../../redux/async/boss";

import JobSelect from "./element/JobSelect";

import theme from "../../shared/Theme";

const AddModal = ({ page, isAddModalOpen, addState }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { job } = useSelector((state) => state.modal);

  const [nickname, setNickname] = React.useState("");
  // const [job, setJob] = React.useState("");

  const handleChangeNickname = (e) => {
    setNickname(e.target.value);
  };

  const handleClose = () => {
    dispatch(modalSlice.actions.closeAddModal());

    if (page === "todo") {
      dispatch(todoSlice.actions.clearTodoErrorMsg());
    } else if (page === "boss") {
      dispatch(bossSlice.actions.clearBossErrorMsg());
    }
  };

  const handleAddCharacter = () => {
    const args = { data: { nickname, job }, navigate };

    if (page === "todo") {
      dispatch(addCharacterToTodo(args));
    } else if (page === "boss") {
      dispatch(addCharacterToBoss(args));
    }
  };

  const handleAddCharacterEnter = (e) => {
    if (e.key === "Enter") {
      handleAddCharacter();
    }
  };

  const handleChangeJob = (e) => {
    // setJob(e.target.value);
    dispatch(modalSlice.actions.setJob({ job: e.target.value }));
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Dialog
          open={isAddModalOpen}
          onClose={handleClose}
          aria-labelledby="character add modal"
        >
          <Box>
            <DialogTitle>캐릭터 추가</DialogTitle>
            <DialogContent dividers={true}>
              <TextField
                label="닉네임"
                color="success"
                error={!addState.isNicknameValid}
                helperText={addState.nicknameResultMessage}
                autoFocus
                required
                autoComplete="off"
                onChange={handleChangeNickname}
                onKeyPress={handleAddCharacterEnter}
              />
              <JobSelect
                job={job}
                error={!addState.isJobValid}
                helperText={addState.jobResultMessage}
                onChange={handleChangeJob}
              />
            </DialogContent>
            <DialogActions>
              <Button color="success" onClick={handleClose}>
                취소
              </Button>
              <Button
                color="success"
                disabled={!nickname || !job}
                onClick={handleAddCharacter}
              >
                추가
              </Button>
            </DialogActions>
          </Box>
        </Dialog>
      </ThemeProvider>
    </>
  );
};

export default AddModal;
