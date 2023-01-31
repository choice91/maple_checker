import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ButtonGroup, Button } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

import modalSlice from "../../../redux/slices/modalSlice";
import todoSlice from "../../../redux/slices/todoSlice";
import { resetTodo } from "../../../redux/async/todo";
import { resetBoss } from "../../../redux/async/boss";

import theme from "../../../shared/Theme";

const TableBtn = ({ page, category }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const openAddModal = () => {
    const args = { page };
    dispatch(modalSlice.actions.openAddModal(args));
    dispatch(todoSlice.actions.initAddState());
  };

  const resetData = () => {
    const args = { data: { category }, navigate };

    if (page === "todo") {
      dispatch(resetTodo(args));
    } else {
      dispatch(resetBoss(args));
    }
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <ButtonGroup
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Button startIcon={<PersonAddAltIcon />} onClick={openAddModal}>
            캐릭터 추가
          </Button>
          <Button startIcon={<RestartAltIcon />} onClick={resetData}>
            리셋
          </Button>
        </ButtonGroup>
      </ThemeProvider>
    </>
  );
};

export default TableBtn;
