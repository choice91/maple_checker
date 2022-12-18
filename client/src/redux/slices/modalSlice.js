import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isModalOpen: false,
    isDelModalOpen: false,
    nickname: '',
    questId: '',
    delNickname: '',
    delQuestId: '',
  },
  reducers: {
    openAndCloseModal: (state, action) => {
      state.isModalOpen = !state.isModalOpen;
    },
    openAndCloseDelModal: (state, action) => {
      state.isDelModalOpen = !state.isDelModalOpen;
    },
    setNickAndId: (state, action) => {
      const {
        payload: { nickname, questId },
      } = action;

      state.nickname = nickname;
      state.questId = questId;
    },
    setDelNickAndId: (state, action) => {
      const {
        payload: { nickname, questId },
      } = action;

      state.delNickname = nickname;
      state.delQuestId = questId;
    },
  },
  extraReducers: {},
});

export default modalSlice;
