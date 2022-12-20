import { createSlice } from '@reduxjs/toolkit';

import { getBossData } from '../async/boss';

const bossSlice = createSlice({
  name: 'boss',
  initialState: {
    isFetching: false,
    bossData: {},
  },
  reducers: {},
  extraReducers: {
    [getBossData.pending]: (state, action) => {
      state.isFetching = true;
    },
    [getBossData.fulfilled]: (state, action) => {
      const {
        payload: { bossData },
      } = action;

      state.bossData = bossData;
      state.isFetching = false;
    },
    [getBossData.rejected]: (state, action) => {
      state.isFetching = false;
    },
  },
});

export default bossSlice;
