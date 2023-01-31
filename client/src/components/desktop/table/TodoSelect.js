import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  ThemeProvider,
} from "@mui/material";

import todoSlice from "../../../redux/slices/todoSlice";

import theme from "../../../shared/Theme";

const TodoSelect = () => {
  const dispatch = useDispatch();
  const { category } = useSelector((state) => state.todo);

  const handleCategoryChange = (e) => {
    dispatch(todoSlice.actions.switchCategory({ category: e.target.value }));
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <FormControl size="small" sx={{ minWidth: 80 }}>
          <InputLabel id="todo-category"></InputLabel>
          <Select
            labelId="todo-category"
            id="todo-select"
            value={category}
            onChange={handleCategoryChange}
          >
            <MenuItem value="daily">일일</MenuItem>
            <MenuItem value="weekly">주간</MenuItem>
          </Select>
        </FormControl>
      </ThemeProvider>
    </>
  );
};

export default TodoSelect;
