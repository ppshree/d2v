/* eslint-disable @typescript-eslint/no-explicit-any */
import { IloginUser } from './../../app/entity/constant';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { authenticateUser, loginUser } from '../../app/service/shared.service';
import { RESPONSE } from '../../app/entity/constant';
interface LoginPageState {
  isLoading: boolean;
  loginError?: string | null;
  resetPasswordError?: string | null;
  isAxiosError: boolean;
  error: string | null;
  loggedInUser: IloginUser | any; //PATCH DELETE FOR PRODUCTION
  defaultLanguage: string | null;
  isLogin: boolean;
  isAuth: string | boolean;
  isForgotPassword: boolean;
  isResetPassword: boolean;
  token: string | null;
  activePanel: string;
}

type LoginPagePayloadAction = PayloadAction<LoginPageState>;
type LanguagePayloadAction = PayloadAction<string>;
type FlagPayloadAction = PayloadAction<boolean>;
type UserPayloadAction = PayloadAction<IloginUser | any>;
const initialState: LoginPageState = {
  activePanel: '',
  isLoading: false,
  loginError: '',
  isAxiosError: false,
  error: null,
  loggedInUser: localStorage.getItem('loggedInUser') ? JSON.parse(localStorage.getItem('loggedInUser') || '{}') : {}, //<IloginUser>{},
  defaultLanguage: localStorage.getItem('defaultLanguage') ? localStorage.getItem('defaultLanguage') : 'en',
  isLogin: true,
  isAuth: false,
  isForgotPassword: false,
  isResetPassword: false,
  token: localStorage.getItem('sessionToken') ? localStorage.getItem('sessionToken') : null,
};

export const LoginPageSlice = createSlice({
  name: 'LoginPageReducer',
  initialState,
  reducers: {
    updateActivePanel: (state, action: LanguagePayloadAction) => {
      state.activePanel = action.payload;
    },
    updateDefaultLanguage: (state, action: LanguagePayloadAction) => {
      state.defaultLanguage = action.payload;
      localStorage.setItem('defaultLanguage', action.payload);
    },
    updateLoggedInUser: (state, action: UserPayloadAction) => {
      state.loggedInUser = action.payload;
    },
    displayLogin: (state, action: FlagPayloadAction) => {
      state.isLogin = action.payload;
    },
    signOut: (state) => {
      state.loggedInUser = {};
      state.isAuth = false;
      state.token = null;
      localStorage.removeItem('sessionToken');
    },
    updateLoginError: (state, action: LanguagePayloadAction) => {
      state.loginError = action.payload;
    },
    resetPasswordError: (state, action: LanguagePayloadAction) => {
      state.resetPasswordError = action.payload;
    },
  },
  extraReducers: {
    [authenticateUser.pending.toString()]: (state) => {
      state.isLoading = true;
    },
    [authenticateUser.fulfilled.toString()]: (state, action: any) => {
      if (action.payload && action.payload.isAxiosError) {
        const { status, msg } = action.payload.response.data;
        state.loginError = status === RESPONSE.FAILED ? msg : 'Network Error';
        state.isLoading = false;
        state.loggedInUser = {};
        state.isAuth = false;
        state.token = null;
        return;
      }
      state.loginError = '';
      if (action?.payload?.data) {
        state.loggedInUser = action.payload.data;
        state.isAuth = true;
      } else {
        state.loggedInUser = {};
        state.isAuth = false;
        state.token = null;
      }
      state.isLoading = false;
    },
    [authenticateUser.rejected.toString()]: (state, action: LoginPagePayloadAction) => {
      state.isLoading = false;
      state.loginError = action.payload.error;
    },
    [loginUser.pending.toString()]: (state) => {
      state.isLoading = true;
    },
    [loginUser.fulfilled.toString()]: (state, action: any) => {
      if (action.payload && action.payload.isAxiosError) {
        console.log(action);
        const { status, msg } = action.payload.response.data;
        state.loginError = status === RESPONSE.FAILED ? msg : 'Network Error';
        state.isLoading = false;
        return;
      }
      state.loginError = '';
      if (action.payload.data && action.payload.token) {
        state.loggedInUser = action.payload.data;
        state.isAuth = true;
        state.token = action.payload.token;
      } else {
        state.loginError = action.payload.msg;
      }
      state.isLoading = false;
    },
    [loginUser.rejected.toString()]: (state, action: LoginPagePayloadAction) => {
      state.isLoading = false;
      state.loginError = action.payload.error;
    },
  },
});

export const {
  updateActivePanel,
  updateDefaultLanguage,
  updateLoggedInUser,
  displayLogin,
  signOut,
  updateLoginError,
  resetPasswordError,
} = LoginPageSlice.actions;
export const LoginPageReducer = LoginPageSlice.reducer;
