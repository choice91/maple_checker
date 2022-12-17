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
    questCheck: (state, action) => {
      const {
        payload: { nickname, questType },
      } = action;

      state.questData[`${nickname}`].quests[`${questType}`] =
        !state.questData[`${nickname}`].quests[`${questType}`];
    },
    updateNicknameInTable: (state, action) => {
      const {
        payload: { questId, newNickname },
      } = action;

      state.questData[`${questId}`].nickname = newNickname;
    },
  },
  extraReducers: {
    [getQuests.pending]: (state, action) => {
      state.isFetching = true;
    },
    [getQuests.fulfilled]: (state, action) => {
      state.questData = { ...action.payload.quests };
    },
    [getQuests.rejected]: (state, action) => {
      state.isFetching = false;
    },

    [questCheck.pending]: (state, action) => {
      state.questCheckFetching = true;
    },
    [questCheck.fulfilled]: (state, action) => {
      state.questCheckFetching = false;
    },
    [questCheck.rejected]: (state, action) => {},
  },
});

export default questSlice;
