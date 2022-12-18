import { createSlice } from '@reduxjs/toolkit';
import { getQuests, questCheck, addCharacter } from '../async/quest';

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
        payload: { questId, questType },
      } = action;

      state.questData[`${questId}`].quests[`${questType}`] =
        !state.questData[`${questId}`].quests[`${questType}`];
    },
    updateNicknameInTable: (state, action) => {
      const {
        payload: { questId, newNickname },
      } = action;

      state.questData[`${questId}`].nickname = newNickname;
    },
    delNicknameInTable: (state, action) => {
      const {
        payload: { delQuestId },
      } = action;

      delete state.questData[`${delQuestId}`];
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

    [addCharacter.pending]: (state, action) => {},
    [addCharacter.fulfilled]: (state, action) => {
      const {
        payload: { newCharacter },
      } = action;

      state.questData = Object.assign(state.questData, newCharacter);
    },
    [addCharacter.rejected]: (state, action) => {},
  },
});

export default questSlice;
