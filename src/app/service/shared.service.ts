/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  resetPassword as resetPasswordApi,
  login as userLogin,
  authenticate as userAuthenticate,
} from '../api/shared.api';
import { USER_TYPE } from './../../app/entity/constant';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IloginUser } from '../entity/constant';

// ==================APIS ROUTING TO RM-BACKEND=============================
export const authenticateUser = createAsyncThunk('user/authenticate', async () => {
  const result = await userAuthenticate();
  return result;
});

export const loginUser = createAsyncThunk('user/login', async (obj: IloginUser) => {
  const result = await userLogin(obj);
  return result;
});
