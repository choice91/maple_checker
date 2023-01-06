import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Select, FormControl, InputLabel, MenuItem } from '@mui/material';

import todoSlice from '../../redux/slices/todoSlice';

const SelectComp = () => {
  const dispatch = useDispatch();

  const [dailyCategory, setDailyCategory] = useState('');

  const { category } = useSelector((state) => state.todo);

  const handleCategoryChange = (e) => {
    setDailyCategory(e.target.value);
    dispatch(todoSlice.actions.switchCategory({ category: e.target.value }));
  };

  useEffect(() => {
    setDailyCategory(category);
  }, [category]);

  return (
    <>
      <FormControl
        size="small"
        sx={{
          minWidth: 80,
          '&:hover > .MuiOutlinedInput-root > .MuiOutlinedInput-notchedOutline':
            {
              borderColor: '#fff',
            },
          '& > .MuiFormLabel-root': {
            color: '#fff',
            backgroundColor: '#212121',
          },
          '& > .MuiOutlinedInput-root': {
            color: '#fff',
          },
          '& > .MuiOutlinedInput-root > .MuiOutlinedInput-notchedOutline': {
            borderColor: '#b2b2b2',
          },
          '& > .MuiOutlinedInput-root > .MuiSelect-iconOutlined': {
            color: '#fff',
          },
        }}
      >
        <InputLabel id="todo-category"></InputLabel>
        <Select
          labelId="todo-category"
          id="todo-select"
          value={category}
          onChange={handleCategoryChange}
          MenuProps={{
            PaperProps: {
              sx: {
                backgroundColor: '#3f3f3f',
                '& .MuiMenuItem-root': {
                  color: '#fff',
                },
                '& .MuiMenuItem-root:hover': {
                  backgroundColor: '#5f5f5f',
                },
                '& .Mui-selected': {
                  backgroundColor: '#4f4f4f',
                },
              },
            },
          }}
        >
          <MenuItem value="daily">일일</MenuItem>
          <MenuItem value="weekly">주간</MenuItem>
        </Select>
      </FormControl>
    </>
  );
};

export default SelectComp;
