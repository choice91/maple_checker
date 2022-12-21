import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isModalOpen: false,
    isDelModalOpen: false,
    isAddModalOpen: false,
    nickname: '',
    type: '',
    questId: null,
    bossId: null,
    delNickname: '',
    delQuestId: null,
  },
  reducers: {
    openAndCloseModal: (state, action) => {
      const {
        payload: { type },
      } = action;

      state.isModalOpen = !state.isModalOpen;

      if (state.isModalOpen) {
        state.type = type;
      } else {
        state.type = '';
      }
    },
    openAndCloseDelModal: (state, action) => {
      const {
        payload: { type, nickname, id },
      } = action;

      state.isDelModalOpen = !state.isDelModalOpen;

      if (state.isDelModalOpen) {
        state.type = type;
        state.nickname = nickname;
        state[`${type}Id`] = id;
      } else {
        state.type = '';
        state.nickname = null;
        state[`${type}Id`] = null;
      }
    },
    openAndCloseAddModal: (state, action) => {
      const {
        payload: { type },
      } = action;

      state.isAddModalOpen = !state.isAddModalOpen;

      if (state.isAddModalOpen) {
        state.type = type;
      } else {
        state.type = '';
      }
    },
    setNickAndId: (state, action) => {
      const {
        payload: { nickname, id },
      } = action;

      state.nickname = nickname;
      state.questId = id;
    },
    setDelNickAndId: (state, action) => {
      const {
        payload: { nickname, id },
      } = action;

      state.delNickname = nickname;
      state.delQuestId = id;
    },
  },
  extraReducers: {},
});

export default modalSlice;
