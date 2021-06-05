/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  getAllContentManagers as getAllContentManagersAddedBySuperAdmin,
  addNewContentManager as addNewContentManagerAddedBySuperAdmin,
  updateContentManager as updateContentManagerAddedBySuperAdmin,
  deleteContentManager as deleteContentManagerAddedBySuperAdmin,
  getAllAdmin as getAllAdminAddedBySuperAdmin,
  addNewAdmin as addNewAdminAddedBySuperAdmin,
  updateAdmin as updateAdminAddedBySuperAdmin,
  deleteAdmin as deleteAdminAddedBySuperAdmin,
  getAllStudent as getAllStudentAddedBySuperAdmin,
  getFilteredStudent as getFilteredStudentAddedBySuperAdmin,
  addNewStudent as addNewStudentAddedBySuperAdmin,
  updateStudent as updateStudentAddedBySuperAdmin,
  deleteStudent as deleteStudentAddedBySuperAdmin,
  getAllTutor as getAllTutorAddedBySuperAdmin,
  addNewTutor as addNewTutorAddedBySuperAdmin,
  updateTutor as updateTutorAddedBySuperAdmin,
  deleteTutor as deleteTutorAddedBySuperAdmin,
  getAllTags as getAllTagsAddedBySuperAdmin,
  addNewTags as addNewTagsAddedBySuperAdmin,
  updateTags as updateTagsAddedBySuperAdmin,
  deleteTags as deleteTagsAddedBySuperAdmin,
} from '../api/superadmin.api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ICreateContentManager, ICreateAdmin, ICreateStudent, ICreateTutor, ITags } from '../entity/model';
import { IFilterObj } from '../entity/constant';
// ==================APIS ROUTING TO RM-BACKEND=============================

export interface IGetAll {
  filterType?: string;
  filterQuery?: string;
  limit: number;
  offset: number;
}

export const retrieveAllContentManagers = createAsyncThunk(
  'superadmin/retrieveAllContentManagers',
  async ({ search, role_id, status, limit, offset }: IFilterObj) => {
    return await getAllContentManagersAddedBySuperAdmin({ search, role_id, status, limit, offset });
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
  async ({ search, role_id, status, limit, offset }: IFilterObj) => {
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
  async ({ search, role_id, status, limit, offset }: IFilterObj) => {
    return await getAllTutorAddedBySuperAdmin({ search, role_id, status, limit, offset });
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
  async ({ search, role_id, status, limit, offset }: IFilterObj) => {
    return await getAllStudentAddedBySuperAdmin({ search, role_id, status, limit, offset });
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

//===========API FOR TAGS ===========================
export const retrieveAllTags = createAsyncThunk(
  'superadmin/retrieveAllTags',
  async ({ search, limit, offset }: IFilterObj) => {
    return await getAllTagsAddedBySuperAdmin({ search, limit, offset });
  },
);

export const createNewTags = createAsyncThunk('superadmin/addOrUpdateTags', async (obj: ITags) => {
  if (obj.isEditFlag) {
    return await updateTagsAddedBySuperAdmin(obj);
  } else {
    return await addNewTagsAddedBySuperAdmin(obj);
  }
});

export const deleteTags = createAsyncThunk('superadmin/deleteTags', async (objId: string) => {
  return await deleteTagsAddedBySuperAdmin(objId);
});
