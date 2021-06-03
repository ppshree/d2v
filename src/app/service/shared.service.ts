/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  login as userLogin,
  authenticate as userAuthenticate,
  getAllSchool,
  getFilteredSchools,
  addNewSchool,
  updateSchool,
  deleteSchool,
} from '../api/shared.api';

import { createAsyncThunk } from '@reduxjs/toolkit';
import { IloginUser, SCHOOL } from '../entity/constant';
import { IGetAll } from './superadmin.service';
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
  async ({ filterType, filterQuery, limit, offset }: IGetAll) => {
    if (filterType && filterQuery && filterQuery !== 'none') {
      return await getFilteredSchools(filterType, filterQuery, limit, offset);
    } else {
      return await getAllSchool(SCHOOL.ACTIVE, limit, offset);
    }
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
