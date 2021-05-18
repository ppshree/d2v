/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  resetPassword as resetPasswordApi,
  login as userLogin,
  authenticate as userAuthenticate,
} from '../api/shared.api';
import { forgotKey as adminForgotKey } from '../api/admin.api';
import { USER_TYPE } from './../../app/entity/constant';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IloginUser } from '../entity/constant';
import { IresetKey, IrequestReadings, IResetPassword } from '../entity/model';

// ==================APIS ROUTING TO RM-BACKEND=============================
export const authenticateUser = createAsyncThunk('user/authenticate', async () => {
  const result = await userAuthenticate();
  return result;
});

export const loginUser = createAsyncThunk('user/login', async (obj: IloginUser) => {
  const result = await userLogin(obj);
  return result;
});

export const resetPassword = createAsyncThunk('user/resetPassword', async (obj: IResetPassword) => {
  return await resetPasswordApi(obj.userType, obj.resetToken, obj.password);
});

export const forgotKey = createAsyncThunk('user/forgotKey', async (obj: IresetKey) => {
  if (obj.user_type == USER_TYPE.ADMIN) {
    return await adminForgotKey(obj.email);
  }
});
