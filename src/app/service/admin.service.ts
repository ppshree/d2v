/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit';
// ==================APIS ROUTING TO RM-BACKEND=============================

export const retrieveAllMedics = createAsyncThunk('admin/getAllMedic', async () => {
  return;
});
export const createNewMedicUser = createAsyncThunk('admin/addOrUpdateMedic', async (obj: any) => {
  return;
});

// ==================APIS ROUTING TO AWS-BACKEND=============================
