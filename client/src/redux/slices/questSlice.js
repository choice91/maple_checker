import { createSlice } from '@reduxjs/toolkit';
import { getQuests, questCheck } from '../async/quest';

export const questSlice = createSlice({
  name: 'quest',
  initialState: {
    isFetching: false,
    questCheckFetching: false,
    questData: {},
  },
  reducers: {
    questCheck: (state, { payload }) => {
      const { nickname, questType } = payload;
      state.questData[`${nickname}`].quests[`${questType}`] =
        !state.questData[`${nickname}`].quests[`${questType}`];
    },
  },
  extraReducers: {
    [getQuests.pending]: (state, { payload }) => {
      state.isFetching = true;
    },
    [getQuests.fulfilled]: (state, { payload }) => {
      state.questData = { ...payload.quests };
    },
    [getQuests.rejected]: (state, { payload }) => {
      state.isFetching = false;
    },

    [questCheck.pending]: (state, { payload }) => {
      state.questCheckFetching = true;
    },
    [questCheck.fulfilled]: (state, { payload }) => {
      state.questCheckFetching = false;
    },
    [questCheck.rejected]: (state, { payload }) => {},
  },
});

export default questSlice;
