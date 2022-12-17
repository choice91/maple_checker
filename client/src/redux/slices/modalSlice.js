import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isModalOpen: false,
    nickname: '',
  },
  reducers: {
    openAndCloseModal: (state, action) => {
      state.isModalOpen = !state.isModalOpen;
    },
    setNickname: (state, action) => {
      const {
        payload: { nickname },
      } = action;
      state.nickname = nickname;
    },
  },
  extraReducers: {},
});

export default modalSlice;
