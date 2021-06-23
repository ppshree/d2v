/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  /* Content managers crud */
  getAllContentManagers as getAllContentManagersAddedBySuperAdmin,
  addNewContentManager as addNewContentManagerAddedBySuperAdmin,
  updateContentManager as updateContentManagerAddedBySuperAdmin,
  deleteContentManager as deleteContentManagerAddedBySuperAdmin,
  /* Admin crud */
  getAllAdmin as getAllAdminAddedBySuperAdmin,
  addNewAdmin as addNewAdminAddedBySuperAdmin,
  updateAdmin as updateAdminAddedBySuperAdmin,
  deleteAdmin as deleteAdminAddedBySuperAdmin,
  /* Student crud */
  getAllStudent as getAllStudentAddedBySuperAdmin,
  addNewStudent as addNewStudentAddedBySuperAdmin,
  updateStudent as updateStudentAddedBySuperAdmin,
  deleteStudent as deleteStudentAddedBySuperAdmin,
  /* Tutor crud */
  getAllTutor as getAllTutorAddedBySuperAdmin,
  addNewTutor as addNewTutorAddedBySuperAdmin,
  updateTutor as updateTutorAddedBySuperAdmin,
  deleteTutor as deleteTutorAddedBySuperAdmin,
  /* Tags crud */
  getAllTags as getAllTagsAddedBySuperAdmin,
  addNewTags as addNewTagsAddedBySuperAdmin,
  updateTags as updateTagsAddedBySuperAdmin,
  deleteTags as deleteTagsAddedBySuperAdmin,
} from '../api/superadmin.api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ICreateContentManager, ICreateAdmin, ICreateStudent, ICreateTutor, ITags, IFilterObj } from '../entity/model';

// ==================APIS ROUTING TO RM-BACKEND=============================

export interface IGetAll {
  filterType?: string;
  filterQuery?: string;
  limit: number;
  offset: number;
}

export const retrieveAllContentManagers = createAsyncThunk(
  'superadmin/retrieveAllContentManagers',
  async ({ name, role_id, status, limit, offset }: IFilterObj) => {
    return await getAllContentManagersAddedBySuperAdmin({ name, role_id, status, limit, offset });
  },
);

export const createNewContentManager = createAsyncThunk(
  'superadmin/addOrUpdateContentManager',
  async (obj: ICreateContentManager) => {
    return obj.isEditFlag
      ? await updateContentManagerAddedBySuperAdmin(obj)
      : await addNewContentManagerAddedBySuperAdmin(obj);
  },
);

export const deleteContentManager = createAsyncThunk('superadmin/deleteContantManager', async (objId: string) => {
  return await deleteContentManagerAddedBySuperAdmin(objId);
});

//===========API FOR ADMIN ===========================
export const retrieveAllAdmin = createAsyncThunk(
  'superadmin/retrieveAllAdmin',
  async ({ name, email, mobile_number, role_id, status, limit, offset }: IFilterObj) => {
    return await getAllAdminAddedBySuperAdmin({ name, email, mobile_number, role_id, status, limit, offset });
  },
);

export const createNewAdmin = createAsyncThunk('superadmin/addOrUpdateAdmin', async (obj: ICreateAdmin) => {
  return obj.isEditFlag ? await updateAdminAddedBySuperAdmin(obj) : await addNewAdminAddedBySuperAdmin(obj);
});

export const deleteAdmin = createAsyncThunk('superadmin/deleteAdmin', async (objId: string) => {
  return await deleteAdminAddedBySuperAdmin(objId);
});

//===========API FOR TUTOR ===========================
export const retrieveAllTutor = createAsyncThunk(
  'superadmin/retrieveAllTutor',
  async ({ name, role_id, status, limit, offset }: IFilterObj) => {
    return await getAllTutorAddedBySuperAdmin({ name, role_id, status, limit, offset });
  },
);

export const createNewTutor = createAsyncThunk('superadmin/addOrUpdateTutor', async (obj: ICreateTutor) => {
  return obj.isEditFlag ? await updateTutorAddedBySuperAdmin(obj) : await addNewTutorAddedBySuperAdmin(obj);
});

export const deleteTutor = createAsyncThunk('superadmin/deleteTutor', async (objId: string) => {
  return await deleteTutorAddedBySuperAdmin(objId);
});

//===========API FOR STUDENT ===========================
export const retrieveAllStudent = createAsyncThunk(
  'superadmin/retrieveAllStudent',
  async ({ name, role_id, status, limit, offset }: IFilterObj) => {
    return await getAllStudentAddedBySuperAdmin({ name, role_id, status, limit, offset });
  },
);

export const createNewStudent = createAsyncThunk('superadmin/addOrUpdateStudent', async (obj: ICreateStudent) => {
  return obj.isEditFlag ? await updateStudentAddedBySuperAdmin(obj) : await addNewStudentAddedBySuperAdmin(obj);
});

export const deleteStudent = createAsyncThunk('superadmin/deleteStudent', async (objId: string) => {
  return await deleteStudentAddedBySuperAdmin(objId);
});

//===========API FOR TAGS ===========================
export const retrieveAllTags = createAsyncThunk(
  'superadmin/retrieveAllTags',
  async ({ name, limit, offset }: IFilterObj) => {
    return await getAllTagsAddedBySuperAdmin({ name, limit, offset });
  },
);

export const createNewTags = createAsyncThunk('superadmin/addOrUpdateTags', async (obj: ITags) => {
  return obj.isEditFlag ? await updateTagsAddedBySuperAdmin(obj) : await addNewTagsAddedBySuperAdmin(obj);
});

export const deleteTags = createAsyncThunk('superadmin/deleteTags', async (objId: string) => {
  return await deleteTagsAddedBySuperAdmin(objId);
});
