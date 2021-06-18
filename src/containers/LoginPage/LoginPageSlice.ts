/* eslint-disable @typescript-eslint/no-explicit-any */
import { IloginUser } from './../../app/entity/model';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { authenticateUser, loginUser } from '../../app/service/shared.service';
import { RESPONSE } from '../../app/entity/constant';
interface LoginPageState {
  isLoading: boolean;
  loginError?: string | null;
  isAxiosError: boolean;
  error: string | null;
  loggedInUser: IloginUser | any;
  defaultLanguage: string | null;
  isAuthCompleted: string | boolean;
  isForgotPassword: boolean;
  isResetPassword: boolean;
  token: string | null;
  activePanel: string;
}

type LoginPagePayloadAction = PayloadAction<LoginPageState>;
type LanguagePayloadAction = PayloadAction<string>;
type UserPayloadAction = PayloadAction<IloginUser | any>;
const initialState: LoginPageState = {
  activePanel: '',
  isLoading: false,
  loginError: '',
  isAxiosError: false,
  error: null,
  loggedInUser: localStorage.getItem('loggedInUser') ? JSON.parse(localStorage.getItem('loggedInUser') || '{}') : {}, //<IloginUser>{},
  defaultLanguage: localStorage.getItem('defaultLanguage') ? localStorage.getItem('defaultLanguage') : 'en',
  isAuthCompleted: false,
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
    signOut: (state) => {
      localStorage.clear();
      state.activePanel = '';
      state.loggedInUser = {};
      state.token = null;
      state.isAuthCompleted = false;
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
      if (action.payload && action.payload.isAxiosError) {
        const { status } = action.payload;
        const { message } = action.payload.errors.length > 0 && action.payload.errors[0];
        state.loginError = status === RESPONSE.FAILED ? message : 'Network Error';
        state.isLoading = false;
        state.loggedInUser = {};
        state.isAuthCompleted = false;
        state.token = null;
        return;
      }
      state.loginError = '';
      if (action?.payload?.data) {
        state.loggedInUser = action.payload.data;
        state.isAuthCompleted = true;
      } else {
        state.loggedInUser = {};
        state.isAuthCompleted = false;
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
        const { status } = action.payload;
        const { message } = action.payload.errors.length > 0 && action.payload.errors[0];
        state.loginError = status === RESPONSE.FAILED ? message : 'Network Error';
        state.isLoading = false;
        return;
      }
      state.loginError = '';
      if (action.payload.data && action.payload.token) {
        state.loggedInUser = action.payload.data;
        state.isAuthCompleted = true;
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
  signOut,
  updateLoginError,
} = LoginPageSlice.actions;
export const LoginPageReducer = LoginPageSlice.reducer;
