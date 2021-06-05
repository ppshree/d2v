/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  login as userLogin,
  authenticate as userAuthenticate,
  getAllSchool,
  addNewSchool,
  updateSchool,
  deleteSchool,
} from '../api/shared.api';

import { createAsyncThunk } from '@reduxjs/toolkit';
import { IFilterObj, IloginUser } from '../entity/constant';
import { ICreateSchool } from '../entity/model';

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
export const retrieveAllSchool = createAsyncThunk(
  'school/retrieveAllSchool',
  async ({ search, status, limit, offset }: IFilterObj) => {
    return await getAllSchool({ active_school: status && status, search, limit, offset });
  },
);

export const createSchool = createAsyncThunk('school/addOrUpdateSchool', async (obj: ICreateSchool) => {
  if (obj.isEditFlag) {
    return await updateSchool(obj);
  } else {
    return await addNewSchool(obj);
  }
});

export const deleteSchoolById = createAsyncThunk('school/deleteSchoolById', async (objId: string) => {
  return await deleteSchool(objId);
});
