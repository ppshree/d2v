/* eslint-disable @typescript-eslint/no-explicit-any */
import { IloginUser } from '../../app/entity/model';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { authenticateUser, loginUser } from '../../app/service/shared.service';
import { RESPONSE } from '../../app/entity/constant';
interface LoginPageState {
  isLoading: boolean;
  loginError?: string | null;
  loggedInUser: IloginUser | any;
  defaultLanguage: string | null;
  token: string | null;
  activePanel: string;
  isAuthenticating: string | boolean;
}

type LoginPagePayloadAction = PayloadAction<any>;
type LanguagePayloadAction = PayloadAction<string>;
type UserPayloadAction = PayloadAction<IloginUser | any>;
const initialState: LoginPageState = {
  activePanel: '',
  isLoading: false,
  loginError: '',
  loggedInUser: localStorage.getItem('loggedInUser') ? JSON.parse(localStorage.getItem('loggedInUser') || '{}') : {}, //<IloginUser>{},
  token: localStorage.getItem('sessionToken') ? localStorage.getItem('sessionToken') : null,
  defaultLanguage: localStorage.getItem('defaultLanguage') ? localStorage.getItem('defaultLanguage') : 'en',
  isAuthenticating: true,
};

export const LoginPageSlice = createSlice({
  name: 'LoginPageReducer',
  initialState,
  reducers: {
    updateActivePanel: (state, action: LanguagePayloadAction) => {
      state.activePanel = action.payload;
    },
    signOut: (state) => {
      localStorage.clear();
      state.activePanel = '';
      state.loggedInUser = {};
      state.token = null;
      state.isAuthenticating = false;
    },
    updateLoginError: (state, action: LanguagePayloadAction) => {
      state.loginError = action.payload;
    },
  },
  extraReducers: {
    [authenticateUser.pending.toString()]: (state) => {
      state.isLoading = true;
    },
    [authenticateUser.fulfilled.toString()]: (state, action: any) => {
      state.loginError = '';
      if (action?.payload?.data) {
        state.loggedInUser = action.payload.data;
      } else {
        state.loggedInUser = {};
        state.token = null;
        const { message } = (action?.payload?.errors?.length && action.payload.errors[0]) || RESPONSE.WENTWRONG;
        state.loginError = message || RESPONSE.NETWORKERROR;
      }
      state.isLoading = false;
      state.isAuthenticating = false;
      return;
    },
    [authenticateUser.rejected.toString()]: (state, action: LoginPagePayloadAction) => {
      state.isLoading = false;
      state.loginError = action.payload.error;
    },
    [loginUser.pending.toString()]: (state) => {
      state.isLoading = true;
    },
    [loginUser.fulfilled.toString()]: (state, action: any) => {
      state.loginError = '';
      if (action?.payload?.data && action?.payload?.token) {
        state.loggedInUser = action.payload.data;
        state.token = action.payload.token;
      } else {
        state.loggedInUser = {};
        state.token = null;
        // const { status } = action?.payload || RESPONSE.FAILED;
        const { message } = (action?.payload?.errors?.length && action.payload.errors[0]) || RESPONSE.WENTWRONG;
        state.loginError = message || RESPONSE.NETWORKERROR;
      }
      state.isLoading = false;
      return;
    },
    [loginUser.rejected.toString()]: (state, action: LoginPagePayloadAction) => {
      state.isLoading = false;
      state.loginError = action.payload.error || RESPONSE.WENTWRONG;
    },
  },
});

export const { updateActivePanel, signOut, updateLoginError } = LoginPageSlice.actions;
export const LoginPageReducer = LoginPageSlice.reducer;
