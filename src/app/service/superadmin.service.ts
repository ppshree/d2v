/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  getAllContentManagers as getAllContentManagersAddedBySuperAdmin,
  getFilteredContentManagers as getFilteredContentManagersAddedBySuperAdmin,
  addNewContentManager as addNewContentManagerAddedBySuperAdmin,
  updateContentManager as updateContentManagerAddedBySuperAdmin,
  deleteContentManager as deleteContentManagerAddedBySuperAdmin,
} from '../api/superadmin.api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ICreateContentManager } from '../entity/model';
// ==================APIS ROUTING TO RM-BACKEND=============================

interface IGetContentManager {
  filterType?: string;
  filterQuery?: string;
  limit: number;
  offset: number;
}

export const retrieveAllContentManagers = createAsyncThunk(
  'superadmin/retrieveAllContentManagers',
  async ({ filterType, filterQuery, limit, offset }: IGetContentManager) => {
    if (filterType && filterQuery) {
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
