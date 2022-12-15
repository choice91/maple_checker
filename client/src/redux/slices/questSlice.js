import { createSlice } from '@reduxjs/toolkit';
import { getQuests, questCheck } from '../async/quest';

export const questSlice = createSlice({
  name: 'quest',
  initialState: {
    isFetching: false,
    questCheckFetching: false,
    questData: [],
  },
  reducers: {
    questCheck: (state, { payload }) => {
      const { name, questType } = payload;
      const index = state.questData.findIndex(
        (quest) => quest.nickname === name
      );
      state.questData[index].quests[`${questType}`] =
        !state.questData[index].quests[`${questType}`];
    },
  },
  extraReducers: {
    [getQuests.pending]: (state, { payload }) => {
      state.isFetching = true;
    },
    [getQuests.fulfilled]: (state, { payload }) => {
      state.questData = [...payload.quests];
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
