import { createSlice } from '@reduxjs/toolkit';

import {
  addCharacterToBoss,
  getBossData,
  bossCheckToServer,
} from '../async/boss';

const bossSlice = createSlice({
  name: 'boss',
  initialState: {
    isFetching: false,
    isAddModalOpen: false,
    isUpdateModalOpen: false,
    isDelModalOpen: false,
    nickname: null,
    bossId: null,
    bossData: {},
    errorMessage: '',
  },
  reducers: {
    bossCheckReducer: (state, action) => {
      const {
        payload: { bossId, bossType },
      } = action;

      state.bossData[`${bossId}`].boss[`${bossType}`] =
        !state.bossData[`${bossId}`].boss[`${bossType}`];
    },
    bossErrorMessageClear: (state, action) => {
      state.errorMessage = '';
    },

    // 캐릭터 추가 모달
    openBossAddModal: (state, action) => {
      state.isAddModalOpen = true;
      state.errorMessage = '';
    },
    closeBossAddModal: (state, action) => {
      state.isAddModalOpen = false;
    },

    // 캐릭터 삭제 모달
    openBossDelModal: (state, action) => {
      const {
        payload: { nickname, id },
      } = action;

      state.isDelModalOpen = true;
      state.nickname = nickname;
      state.bossId = id;
    },
    closeBossDelModal: (state, action) => {
      state.isDelModalOpen = false;
      state.nickname = null;
      state.bossId = null;
    },
  },
  extraReducers: {
    [addCharacterToBoss.pending]: (state, action) => {
      state.errorMessage = '';
    },
    [addCharacterToBoss.fulfilled]: (state, action) => {
      const {
        payload: { newCharacter },
      } = action;

      state.bossData = Object.assign(state.bossData, newCharacter);
    },
    [addCharacterToBoss.rejected]: (state, action) => {
      const {
        payload: { errorMessage },
      } = action;

      state.errorMessage = errorMessage;
    },

    [getBossData.pending]: (state, action) => {
      state.isFetching = true;
    },
    [getBossData.fulfilled]: (state, action) => {
      const {
        payload: { bossData },
      } = action;

      state.bossData = bossData;
      state.isFetching = false;
    },
    [getBossData.rejected]: (state, action) => {
      state.isFetching = false;
    },

    [bossCheckToServer.pending]: (state, action) => {},
    [bossCheckToServer.fulfilled]: (state, action) => {},
    [bossCheckToServer.rejected]: (state, action) => {},
  },
});

export default bossSlice;
