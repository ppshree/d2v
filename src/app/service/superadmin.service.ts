/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  getAllContentManagers as getAllContentManagersAddedBySuperAdmin,
  getFilteredContentManagers as getFilteredContentManagersAddedBySuperAdmin,
  addNewContentManager as addNewContentManagerAddedBySuperAdmin,
  updateContentManager as updateContentManagerAddedBySuperAdmin,
  deleteContentManager as deleteContentManagerAddedBySuperAdmin,
  getAllAdmin as getAllAdminAddedBySuperAdmin,
  getFilteredAdmin as getFilteredAdminAddedBySuperAdmin,
  addNewAdmin as addNewAdminAddedBySuperAdmin,
  updateAdmin as updateAdminAddedBySuperAdmin,
  deleteAdmin as deleteAdminAddedBySuperAdmin,
  getAllStudent as getAllStudentAddedBySuperAdmin,
  getFilteredStudent as getFilteredStudentAddedBySuperAdmin,
  addNewStudent as addNewStudentAddedBySuperAdmin,
  updateStudent as updateStudentAddedBySuperAdmin,
  deleteStudent as deleteStudentAddedBySuperAdmin,
  getAllTutor as getAllTutorAddedBySuperAdmin,
  getFilteredTutor as getFilteredTutorAddedBySuperAdmin,
  addNewTutor as addNewTutorAddedBySuperAdmin,
  updateTutor as updateTutorAddedBySuperAdmin,
  deleteTutor as deleteTutorAddedBySuperAdmin,
} from '../api/superadmin.api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ICreateContentManager, ICreateAdmin, ICreateStudent, ICreateTutor } from '../entity/model';
import { IFilterUserObj } from '../entity/constant';
// ==================APIS ROUTING TO RM-BACKEND=============================

export interface IGetAll {
  filterType?: string;
  filterQuery?: string;
  limit: number;
  offset: number;
}

export const retrieveAllContentManagers = createAsyncThunk(
  'superadmin/retrieveAllContentManagers',
  async ({ filterType, filterQuery, limit, offset }: IGetAll) => {
    if (filterType && filterQuery && filterQuery !== 'none') {
      return await getFilteredContentManagersAddedBySuperAdmin(filterType, filterQuery, limit, offset);
    } else {
      return await getAllContentManagersAddedBySuperAdmin(limit, offset);
    }
  },
);

export const createNewContentManager = createAsyncThunk(
  'superadmin/addOrUpdateContentManager',
  async (obj: ICreateContentManager) => {
    if (obj.isEditFlag) {
      return await updateContentManagerAddedBySuperAdmin(obj);
    } else {
      return await addNewContentManagerAddedBySuperAdmin(obj);
    }
  },
);

export const deleteContentManager = createAsyncThunk('superadmin/deleteContantManager', async (objId: string) => {
  return await deleteContentManagerAddedBySuperAdmin(objId);
});

//===========API FOR ADMIN ===========================
export const retrieveAllAdmin = createAsyncThunk(
  'superadmin/retrieveAllAdmin',
  async ({ search, role_id, status, limit, offset }: IFilterUserObj) => {
    return await getAllAdminAddedBySuperAdmin({ search, role_id, status, limit, offset });
  },
);

export const createNewAdmin = createAsyncThunk('superadmin/addOrUpdateAdmin', async (obj: ICreateAdmin) => {
  if (obj.isEditFlag) {
    return await updateAdminAddedBySuperAdmin(obj);
  } else {
    return await addNewAdminAddedBySuperAdmin(obj);
  }
});

export const deleteAdmin = createAsyncThunk('superadmin/deleteAdmin', async (objId: string) => {
  return await deleteAdminAddedBySuperAdmin(objId);
});

//===========API FOR TUTOR ===========================
export const retrieveAllTutor = createAsyncThunk(
  'superadmin/retrieveAllTutor',
  async ({ filterType, filterQuery, limit, offset }: IGetAll) => {
    if (filterType && filterQuery && filterQuery !== 'none') {
      return await getFilteredTutorAddedBySuperAdmin(filterType, filterQuery, limit, offset);
    } else {
      return await getAllTutorAddedBySuperAdmin(limit, offset);
    }
  },
);

export const createNewTutor = createAsyncThunk('superadmin/addOrUpdateTutor', async (obj: ICreateTutor) => {
  if (obj.isEditFlag) {
    return await updateTutorAddedBySuperAdmin(obj);
  } else {
    return await addNewTutorAddedBySuperAdmin(obj);
  }
});

export const deleteTutor = createAsyncThunk('superadmin/deleteTutor', async (objId: string) => {
  return await deleteTutorAddedBySuperAdmin(objId);
});

//===========API FOR STUDENT ===========================
export const retrieveAllStudent = createAsyncThunk(
  'superadmin/retrieveAllStudent',
  async ({ filterType, filterQuery, limit, offset }: IGetAll) => {
    if (filterType && filterQuery && filterQuery !== 'none') {
      return await getFilteredStudentAddedBySuperAdmin(filterType, filterQuery, limit, offset);
    } else {
      return await getAllStudentAddedBySuperAdmin(limit, offset);
    }
  },
);

export const createNewStudent = createAsyncThunk('superadmin/addOrUpdateStudent', async (obj: ICreateStudent) => {
  if (obj.isEditFlag) {
    return await updateStudentAddedBySuperAdmin(obj);
  } else {
    return await addNewStudentAddedBySuperAdmin(obj);
  }
});

export const deleteStudent = createAsyncThunk('superadmin/deleteStudent', async (objId: string) => {
  return await deleteStudentAddedBySuperAdmin(objId);
});
