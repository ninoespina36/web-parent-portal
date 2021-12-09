import { createSlice } from '@reduxjs/toolkit';

const defaultUserData = {
    applicantUserID: null,
    firstName: null,
    lastName: null,
    school: null,
    schoolCode: null, 
    schoolID: null,
    username: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    token: null,
    user: defaultUserData
  },
  reducers: {
    login: (state, { payload }) => {
      const { token, user } = payload;
      state.isAuthenticated = true;
      state.token = token;
      state.user = user;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.user = defaultUserData;
  },
  }
})

export const { 
    login, 
    logout,
} = authSlice.actions;

export default authSlice.reducer;