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
