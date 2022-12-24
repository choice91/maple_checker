import { createSlice } from '@reduxjs/toolkit';
import { getQuests, questCheck, addCharacter } from '../async/quest';

export const questSlice = createSlice({
  name: 'quest',
  initialState: {
    isFetching: false,
    isAddModalOpen: false,
    isUpdateModalOpen: false,
    isDelModalOpen: false,
    questCheckFetching: false,
    nickname: null,
    questId: null,
    questData: {},
    errorMessage: '',
  },
  reducers: {
    questCheck: (state, action) => {
      const {
        payload: { questId, questType },
      } = action;

      state.questData[`${questId}`].quests[`${questType}`] =
        !state.questData[`${questId}`].quests[`${questType}`];
    },

    // 캐릭터 추가 모달
    openQuestAddModal: (state, action) => {
      state.isAddModalOpen = true;
    },
    closeQuestAddModal: (state, action) => {
      state.isAddModalOpen = false;
      state.errorMessage = '';
    },

    // 캐릭터 닉네임 수정 모달
    openQuestUpdateModal: (state, action) => {
      const {
        payload: { nickname, id: questId },
      } = action;

      state.isUpdateModalOpen = true;
      state.nickname = nickname;
      state.questId = questId;
    },
    closeQuestUpdateModal: (state, action) => {
      state.isUpdateModalOpen = false;
      state.errorMessage = '';
      state.nickname = null;
      state.questId = null;
    },

    // 캐릭터 삭제 모달
    openQuestDelModal: (state, action) => {
      const {
        payload: { nickname, id: questId },
      } = action;

      state.isDelModalOpen = true;
      state.nickname = nickname;
      state.questId = questId;
    },
    closeQuestDelModal: (state, action) => {
      state.isDelModalOpen = false;
      state.nickname = null;
      state.questId = null;
    },

    updateNicknameInTable: (state, action) => {
      const {
        payload: { id, newNickname },
      } = action;

      state.questData[`${id}`].nickname = newNickname;
      state.isUpdateModalOpen = false;
      state.errorMessage = false;
      state.nickname = null;
      state.questId = null;
    },
    delCharacterInTable: (state, action) => {
      const {
        payload: { id },
      } = action;

      delete state.questData[`${id}`];
      state.isDelModalOpen = false;
      state.nickname = null;
      state.questId = null;
    },
  },
  extraReducers: {
    [getQuests.pending]: (state, action) => {
      state.isFetching = true;
    },
    [getQuests.fulfilled]: (state, action) => {
      state.questData = { ...action.payload.quests };
      state.isFetching = false;
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
      state.isAddModalOpen = false;
    },
    [addCharacter.rejected]: (state, action) => {},
  },
});

export default questSlice;
