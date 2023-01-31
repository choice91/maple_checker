import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  ThemeProvider,
} from "@mui/material";

import modalSlice from "../../redux/slices/modalSlice";
import todoSlice from "../../redux/slices/todoSlice";
import bossSlice from "../../redux/slices/bossSlice";
import { addCharacter } from "../../redux/async/todo";
import { addCharacterToBoss } from "../../redux/async/boss";

import TextFieldComp from "../TextFieldComp";
import CustomButton from "../CustomButton";
import JobSelect from "./element/JobSelect";

import theme from "../../shared/Theme";

const AddModal = ({ page, isAddModalOpen, errorMessage }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [nickname, setNickname] = React.useState("");
  const [job, setJob] = React.useState("");

  const onChangeNickname = (e) => {
    setNickname(e.target.value);
  };

  const handleClose = () => {
    dispatch(modalSlice.actions.closeAddModal());
    setJob("");

    if (page === "todo") {
      dispatch(todoSlice.actions.clearTodoErrorMsg());
    } else if (page === "boss") {
      dispatch(bossSlice.actions.clearBossErrorMsg());
    }
  };

  const handleAddCharacter = () => {
    const args = { data: { nickname, job }, navigate };

    if (page === "todo") {
      dispatch(addCharacter(args));
    } else if (page === "boss") {
      dispatch(addCharacterToBoss(args));
    }

    setJob("");
  };

  const handleAddCharacterEnter = (e) => {
    if (e.key === "Enter") {
      handleAddCharacter();
      setJob("");
    }
  };

  const handleChangeJob = (e) => {
    setJob(e.target.value);
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
              <TextFieldComp
                label="닉네임"
                onChange={onChangeNickname}
                onKeyPress={handleAddCharacterEnter}
                ok={errorMessage ? false : true}
                helperText={errorMessage}
                autoFocus={true}
              />
              <JobSelect job={job} onChange={handleChangeJob} />
            </DialogContent>
            <DialogActions>
              <CustomButton text="취소" onClick={handleClose} />
              <CustomButton text="추가" onClick={handleAddCharacter} />
            </DialogActions>
          </Box>
        </Dialog>
      </ThemeProvider>
    </>
  );
};

export default AddModal;
