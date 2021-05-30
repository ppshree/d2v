/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  login as userLogin,
  authenticate as userAuthenticate,
  getAllSchool as getAllSchoolByCurrentAdmin,
} from '../api/shared.api';

import { createAsyncThunk } from '@reduxjs/toolkit';
import { IloginUser } from '../entity/constant';

// ==================LOGIN API=============================
export const authenticateUser = createAsyncThunk('user/authenticate', async () => {
  const result = await userAuthenticate();
  return result;
});

export const loginUser = createAsyncThunk('user/login', async (obj: IloginUser) => {
  const result = await userLogin(obj);
  return result;
});

// ======================= SCHOOL CRUD ===========================
export const retrieveAllSchoolBySuperAdmin = createAsyncThunk('superadmin/retrieveAllSchool', async () => {
  return await getAllSchoolByCurrentAdmin();
});
export const retrieveAllSchoolByAdmin = createAsyncThunk('admin/retrieveAllSchool', async () => {
  return await getAllSchoolByCurrentAdmin();
});
