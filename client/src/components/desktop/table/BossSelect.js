import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  ThemeProvider,
} from "@mui/material";

import bossSlice from "../../../redux/slices/bossSlice";

import theme from "../../../shared/Theme";

const BossSelect = () => {
  const dispatch = useDispatch();

  const { category } = useSelector((state) => state.boss);

  const handleCategoryChange = (e) => {
    dispatch(bossSlice.actions.switchCategory({ category: e.target.value }));
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
            <MenuItem value="weekly">주간</MenuItem>
            <MenuItem value="monthly">월간</MenuItem>
          </Select>
        </FormControl>
      </ThemeProvider>
    </>
  );
};

export default BossSelect;
