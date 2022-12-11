import { createSlice } from '@reduxjs/toolkit';
import { getQuests } from '../async/quest';

export const questSlice = createSlice({
  name: 'quest',
  initialState: {
    isFetching: false,
    isLoggedIn: false,
  },
  reducers: {},
  extraReducers: {
    [getQuests.pending]: (state, { payload }) => {
      state.isFetching = true;
    },
    [getQuests.fulfilled]: (state, { payload }) => {},
    [getQuests.rejected]: (state, { payload }) => {
      state.isFetching = false;
    },
  },
});

export default questSlice;
