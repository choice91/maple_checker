import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isModalOpen: false,
    nickname: '',
    questId: '',
  },
  reducers: {
    openAndCloseModal: (state, action) => {
      state.isModalOpen = !state.isModalOpen;
    },
    setNickAndId: (state, action) => {
      const {
        payload: { nickname, questId },
      } = action;

      state.nickname = nickname;
      state.questId = questId;
    },
  },
  extraReducers: {},
});

export default modalSlice;
