import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isAddModalOpen: false,
    isUpdateModalOpen: false,
    isDelModalOpen: false,
    id: '',
    nickname: '',
    page: '',
  },
  reducers: {
    // 캐릭터 추가 모달 열기
    openAddModal: (state, action) => {
      state.isAddModalOpen = true;
      state.page = action.payload.page;
    },
    // 캐릭터 추가 모달 닫기
    closeAddModal: (state, action) => {
      state.isAddModalOpen = false;
      state.page = '';
    },
    // 캐릭터 삭제 모달 열기
    openDelModal: (state, action) => {
      state.isDelModalOpen = true;
      state.id = action.payload.id;
      state.nickname = action.payload.nickname;
      state.page = action.payload.page;
    },
    // 캐릭터 삭제 모달 닫기
    closeDelModal: (state, action) => {
      state.isDelModalOpen = false;
      state.id = '';
      state.nickname = '';
      state.page = '';
    },
    // 캐릭터 닉네임 수정 모달 열기
    openUpdateModal: (state, action) => {
      state.isUpdateModalOpen = true;
      state.id = action.payload.id;
      state.nickname = action.payload.nickname;
      state.page = action.payload.page;
    },
    // 캐릭터 닉네임 수정 모달 닫기
    closeUpdateModal: (state, action) => {
      state.isUpdateModalOpen = false;
      state.id = '';
      state.nickname = '';
      state.page = '';
    },
  },
  extraReducers: {},
});

export default modalSlice;
