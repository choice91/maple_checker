import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  TableCell,
  Typography,
} from "@mui/material";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import DeleteIcon from "@mui/icons-material/Delete";

import theme from "../../../shared/Theme";

import modalSlice from "../../../redux/slices/modalSlice";
import todoSlice from "../../../redux/slices/todoSlice";
import bossSlice from "../../../redux/slices/bossSlice";
import { swapTodo } from "../../../redux/async/todo";
import { swapBoss } from "../../../redux/async/boss";

const TableTitle = ({ index, id, nickname, job, page, maxLength }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOpenUpdateModal = () => {
    const args = { id, nickname, job, page };
    dispatch(modalSlice.actions.openUpdateModal(args));

    if (page === "todo") {
      dispatch(todoSlice.actions.initUpdateState());
    } else if (page === "boss") {
      dispatch(bossSlice.actions.initUpdateState());
    }
  };

  const handleOpenDelModal = () => {
    const args = { id, nickname, page };
    dispatch(modalSlice.actions.openDelModal(args));
  };

  const handleMoveLeft = () => {
    if (index > 0) {
      const data = { index, direction: "left" };
      const args = { data, navigate };

      if (page === "todo") {
        dispatch(swapTodo(args));
        dispatch(todoSlice.actions.swapTodo(data));
      } else if (page === "boss") {
        dispatch(swapBoss(args));
        dispatch(bossSlice.actions.swapBoss(data));
      }
    }
  };

  const handleMoveRight = () => {
    if (index < maxLength - 1) {
      const data = { index, direction: "right" };
      const args = { data, navigate };

      if (page === "todo") {
        dispatch(swapTodo(args));
        dispatch(todoSlice.actions.swapTodo(data));
      } else if (page === "boss") {
        dispatch(swapBoss(args));
        dispatch(bossSlice.actions.swapBoss(data));
      }
    }
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <TableCell
          align="center"
          sx={{
            backgroundColor: theme.palette.grey["900"],
            color: "#fff",
            fontSize: 16,
            fontWeight: 700,
            p: 0,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                fontWeight: 700,
                fontSize: 14,
                color: "#ff6f61",
                minWidth: 120,
                width: "100%",
                pt: 0.5,
              }}
            >
              <Button
                sx={{ display: "flex", flexDirection: "column" }}
                onClick={handleOpenUpdateModal}
              >
                <Typography sx={{ fontWeight: 700 }}>{nickname}</Typography>
                <Typography
                  sx={{ fontSize: 12, p: 0, color: theme.palette.grey["500"] }}
                >
                  {job}
                </Typography>
              </Button>
            </Box>
            <ButtonGroup>
              <IconButton
                size="small"
                color="success"
                disabled={index === 0 ? true : false}
                sx={{
                  color: theme.palette.grey["500"],
                  "&:hover": {
                    color: theme.palette.success.main,
                  },
                }}
                onClick={handleMoveLeft}
              >
                <ArrowLeftIcon />
              </IconButton>
              <IconButton
                size="small"
                color="error"
                sx={{
                  color: theme.palette.grey["500"],
                  "&:hover": {
                    color: theme.palette.error.main,
                  },
                }}
                onClick={handleOpenDelModal}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                color="success"
                disabled={index === maxLength - 1 ? true : false}
                sx={{
                  color: theme.palette.grey["500"],
                  "&:hover": {
                    color: theme.palette.success.main,
                  },
                }}
                onClick={handleMoveRight}
              >
                <ArrowRightIcon />
              </IconButton>
            </ButtonGroup>
          </Box>
        </TableCell>
      </ThemeProvider>
    </>
  );
};

export default TableTitle;
