import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isAddModalOpen: false,
    isUpdateModalOpen: false,
    isDelModalOpen: false,
    nickname: '',
  },
  reducers: {
    // 캐릭터 추가 모달 열기
    openAddModal: (state, action) => {
      state.isAddModalOpen = true;
    },
    // 캐릭터 추가 모달 닫기
    closeAddModal: (state, action) => {
      state.isAddModalOpen = false;
    },
    // 캐릭터 삭제 모달 열기
    openDelModal: (state, action) => {
      state.isDelModalOpen = true;
      state.nickname = action.payload.nickname;
    },
    // 캐릭터 삭제 모달 닫기
    closeDelModal: (state, action) => {
      state.isDelModalOpen = false;
      state.nickname = '';
    },
    // 캐릭터 닉네임 수정 모달 열기
    openUpdateModal: (state, action) => {
      state.isUpdateModalOpen = true;
    },
    // 캐릭터 닉네임 수정 모달 닫기
    closeUpdateModal: (state, action) => {
      state.isUpdateModalOpen = false;
    },
  },
  extraReducers: {},
});

export default modalSlice;
