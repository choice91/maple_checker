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
} from "@mui/material";

import modalSlice from "../../redux/slices/modalSlice";
import todoSlice from "../../redux/slices/todoSlice";
import bossSlice from "../../redux/slices/bossSlice";
import { updateCharacter } from "../../redux/async/todo";
import { updateCharacterToBoss } from "../../redux/async/boss";

import TextFieldComp from "../TextFieldComp";
import CustomButton from "../CustomButton";
import JobSelect from "./element/JobSelect";

import theme from "../../shared/Theme";

const UpdateModal = ({ page, isUpdateModalOpen, errorMessage }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    id,
    nickname: currentNickname,
    job: currentJob,
  } = useSelector((state) => state.modal);

  const [replaceNickname, setReplaceNickname] = React.useState(undefined);
  const [job, setJob] = React.useState("");

  const handleClose = () => {
    const args = { replaceNickname };
    dispatch(modalSlice.actions.closeUpdateModal(args));

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

  const onChangeNickname = (e) => {
    const {
      target: { value },
    } = e;

    setReplaceNickname(value);
  };

  React.useEffect(() => {
    setReplaceNickname(currentNickname);
  }, [currentNickname]);

  React.useEffect(() => {
    setJob(currentJob);
  }, [currentJob]);

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
              <TextFieldComp
                label="닉네임"
                value={currentNickname}
                onChange={onChangeNickname}
                onKeyPress={handleUpdateEnter}
                ok={errorMessage ? true : false}
                helperText={errorMessage}
                autoFocus={true}
              />
              <JobSelect job={job} setJob={setJob} />
            </DialogContent>
            <DialogActions>
              <CustomButton text="취소" onClick={handleClose} />
              <CustomButton text="수정" onClick={handleUpdate} />
            </DialogActions>
          </Box>
        </Dialog>
      </ThemeProvider>
    </>
  );
};

export default UpdateModal;
