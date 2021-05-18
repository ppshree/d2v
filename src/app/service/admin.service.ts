import { getAllMedicAddedByAdmin, addNewMedic } from '../api/admin.api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IMedicUser, Idevice } from '../entity/model';
// ==================APIS ROUTING TO RM-BACKEND=============================

export const retrieveAllMedics = createAsyncThunk('admin/getAllMedic', async () => {
  return await getAllMedicAddedByAdmin();
});
export const createNewMedicUser = createAsyncThunk('admin/addOrUpdateMedic', async (obj: IMedicUser) => {
  return await addNewMedic(obj);
});

// ==================APIS ROUTING TO AWS-BACKEND=============================
