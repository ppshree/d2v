/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  getAllContentManagers as getAllContentManagersAddedBySuperAdmin,
  addNewContentManager as addNewContentManagerAddedBySuperAdmin,
  updateContentManager as updateContentManagerAddedBySuperAdmin,
  deleteContentManager as deleteContentManagerAddedBySuperAdmin,
} from '../api/superadmin.api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ICreateContentManager } from '../entity/model';
// ==================APIS ROUTING TO RM-BACKEND=============================

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
