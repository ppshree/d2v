/* eslint-disable @typescript-eslint/no-explicit-any */
import { resetPassword as resetPasswordApi } from '../api/shared.api';
import { authenticate as adminAuthenticate, login as adminLogin, forgotKey as adminForgotKey } from '../api/admin.api';
import { authenticate as medicAuthenticate, login as medicLogin, forgotKey as medicForgotKey } from '../api/medic.api';
import {
  authenticate as patientAuthenticate,
  login as patientLogin,
  forgotKey as patientForgotKey,
} from '../api/patient.api';
import { USER_TYPE, ROLES } from './../../app/entity/constant';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IloginUser } from '../entity/constant';
import { IresetKey, IrequestReadings, IResetPassword } from '../entity/model';

export interface IlogUser {
  user: IloginUser;
  userType: 1 | 2 | 3 | 4;
}
// ==================APIS ROUTING TO RM-BACKEND=============================
export const authenticateUser = createAsyncThunk('user/authenticate', async (obj: number) => {
  if (obj == USER_TYPE.ADMIN) {
    const result = await adminAuthenticate();
    if (result.auth && result.user) {
      result.user.user_type = USER_TYPE.ADMIN;
      result.user.role = ROLES.ADMIN;
    }
    return result;
  } else if (obj == USER_TYPE.MEDIC) {
    const result = await medicAuthenticate();
    if (result.auth && result.user) {
      result.user.user_type = USER_TYPE.MEDIC;
      result.user.role = ROLES.MEDIC;
    }
    return result;
  } else if (obj == USER_TYPE.PATIENT) {
    const result = await patientAuthenticate();
    if (result.auth && result.user) {
      result.user.user_type = USER_TYPE.PATIENT;
      result.user.role = ROLES.PATIENT;
    }
    return result;
  }
});

export const loginUser = createAsyncThunk('user/login', async (obj: IlogUser) => {
  if (obj.userType == USER_TYPE.ADMIN) {
    const result = await adminLogin(obj.user);
    if (result.auth && result.user) {
      result.user.user_type = USER_TYPE.ADMIN;
      result.user.role = ROLES.ADMIN;
    }
    return result;
  } else if (obj.userType == USER_TYPE.MEDIC) {
    const result = await medicLogin(obj.user);
    if (result.auth && result.user) {
      result.user.user_type = USER_TYPE.MEDIC;
      result.user.role = ROLES.MEDIC;
    }
    return result;
  } else if (obj.userType == USER_TYPE.PATIENT) {
    const result = await patientLogin(obj.user);
    if (result.auth && result.user) {
      result.user.user_type = USER_TYPE.PATIENT;
      result.user.role = ROLES.PATIENT;
    }
    return result;
  }
});

export const resetPassword = createAsyncThunk('user/resetPassword', async (obj: IResetPassword) => {
  return await resetPasswordApi(obj.userType, obj.resetToken, obj.password);
});

export const forgotKey = createAsyncThunk('user/forgotKey', async (obj: IresetKey) => {
  if (obj.user_type == USER_TYPE.ADMIN) {
    return await adminForgotKey(obj.email);
  } else if (obj.user_type == USER_TYPE.MEDIC) {
    return await medicForgotKey(obj.email);
  } else if (obj.user_type == USER_TYPE.PATIENT) {
    return await patientForgotKey(obj.email);
  }
});
