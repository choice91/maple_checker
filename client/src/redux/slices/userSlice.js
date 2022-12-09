import { createSlice } from '@reduxjs/toolkit';
import { login } from '../async/user';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: '',
    username: '',
    isFetching: false,
  },
  reducers: {},
  extraReducers: {
    [login.pending]: (state, { payload }) => {
      state.isFetching = true;
    },
    [login.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
    },
  },
});

export default userSlice;
