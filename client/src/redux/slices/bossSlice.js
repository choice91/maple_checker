import { createSlice } from '@reduxjs/toolkit';

import { getBossData, bossCheckToServer } from '../async/boss';

const bossSlice = createSlice({
  name: 'boss',
  initialState: {
    isFetching: false,
    bossData: {},
  },
  reducers: {
    bossCheckReducer: (state, action) => {
      const {
        payload: { bossId, bossType },
      } = action;

      state.bossData[`${bossId}`].boss[`${bossType}`] =
        !state.bossData[`${bossId}`].boss[`${bossType}`];
    },
  },
  extraReducers: {
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
