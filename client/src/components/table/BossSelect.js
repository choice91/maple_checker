import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Select, FormControl, InputLabel, MenuItem } from '@mui/material';

import bossSlice from '../../redux/slices/bossSlice';

const BossSelect = () => {
  const dispatch = useDispatch();

  const { category } = useSelector((state) => state.boss);

  const handleCategoryChange = (e) => {
    dispatch(bossSlice.actions.switchCategory({ category: e.target.value }));
  };

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
          <MenuItem value="weekly">주간</MenuItem>
          <MenuItem value="monthly">월간</MenuItem>
        </Select>
      </FormControl>
    </>
  );
};

export default BossSelect;
