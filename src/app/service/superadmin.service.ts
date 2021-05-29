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
} from '../api/superadmin.api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ICreateContentManager, ICreateAdmin } from '../entity/model';
// ==================APIS ROUTING TO RM-BACKEND=============================

//===========API FOR CONTENT MANAGER ===========================
export const retrieveAllContentManagers = createAsyncThunk(
  'superadmin/retrieveAllContentManagers',
  async ({ limit, offset }: { limit: number; offset: number }) => {
    return await getAllContentManagersAddedBySuperAdmin(limit, offset);
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
  async ({ limit, offset }: { limit: number; offset: number }) => {
    return await getAllAdminAddedBySuperAdmin(limit, offset);
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
