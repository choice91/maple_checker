import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  ThemeProvider,
} from "@mui/material";

import modalSlice from "../../redux/slices/modalSlice";
import { deleteCharacter } from "../../redux/async/todo";
import { delCharacterToBoss } from "../../redux/async/boss";

import CustomButton from "../CustomButton";

import theme from "../../shared/Theme";

const DelConfirmModal = ({ page, isDelModalOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id, nickname } = useSelector((state) => state.modal);

  const handleClose = () => {
    dispatch(modalSlice.actions.closeDelModal());
  };

  const handleDelete = () => {
    if (page === "todo") {
      const args = { data: { todoId: id }, navigate };
      dispatch(deleteCharacter(args));
    } else if (page === "boss") {
      const args = { data: { bossId: id }, navigate };
      dispatch(delCharacterToBoss(args));
    }
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Dialog
          open={isDelModalOpen}
          onClose={handleClose}
          aria-labelledby="character del modal"
        >
          <Box>
            <DialogTitle>캐릭터 삭제</DialogTitle>
            <DialogContent dividers={true}>
              <DialogContentText>
                정말{" "}
                <Box
                  component="span"
                  sx={{ color: theme.palette.secondary.main, fontWeight: 700 }}
                >
                  {nickname}
                </Box>
                을 삭제하시겠습니까?
                <br />
                삭제된 데이터는 되돌릴 수 없습니다.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <CustomButton text="취소" onClick={handleClose} />
              <CustomButton text="삭제" onClick={handleDelete} />
            </DialogActions>
          </Box>
        </Dialog>
      </ThemeProvider>
    </>
  );
};

export default DelConfirmModal;
