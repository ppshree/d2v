import { getAllContentManagersAddedBySuperAdmin, addNewContentManager } from '../api/superadmin.api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ICreateContentManager } from '../entity/model';
// ==================APIS ROUTING TO RM-BACKEND=============================

export const retrieveAllContentManagers = createAsyncThunk('admin/getAllContentManagers', async () => {
  return await getAllContentManagersAddedBySuperAdmin();
});
export const createNewContentManager = createAsyncThunk(
  'admin/addOrUpdateContentManager',
  async (obj: ICreateContentManager) => {
    return await addNewContentManager(obj);
  },
);
