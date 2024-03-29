import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ButtonGroup, Button } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

import todoSlice from "../../../redux/slices/todoSlice";
import bossSlice from "../../../redux/slices/bossSlice";
import { resetTodo } from "../../../redux/async/todo";
import { resetBoss } from "../../../redux/async/boss";

import useModal from "../../../hooks/useModal";
import theme from "../../../shared/Theme";

const TableBtn = ({ page, category }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { openAddModal } = useModal();

  const handleOpenAddModal = () => {
    openAddModal();

    if (page === "todo") {
      dispatch(todoSlice.actions.initAddState());
    } else if (page === "boss") {
      dispatch(bossSlice.actions.initAddState());
    }
  };

  const resetData = () => {
    if (page === "todo") {
      dispatch(resetTodo({ navigate }));
    } else {
      dispatch(resetBoss({ data: { category }, navigate }));
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
          <Button startIcon={<PersonAddAltIcon />} onClick={handleOpenAddModal}>
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
