import { createSlice } from '@reduxjs/toolkit';
import { getQuests } from '../async/quest';

export const questSlice = createSlice({
  name: 'quest',
  initialState: {
    isFetching: false,
    quests: [],
  },
  reducers: {},
  extraReducers: {
    [getQuests.pending]: (state, { payload }) => {
      state.isFetching = true;
    },
    [getQuests.fulfilled]: (state, { payload }) => {
      console.log(payload);
      state.quests = [...payload.quests];
    },
    [getQuests.rejected]: (state, { payload }) => {
      state.isFetching = false;
    },
  },
});

export default questSlice;
