import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllPatientAddedBymedic } from '../api/medic.api';
import { IPatientUser, Idevice } from '../entity/model';
//TODO: get rid of unknown
// ==================APIS ROUTING TO RM-BACKEND=============================

export const retrieveAllPatients = createAsyncThunk('medic/getAllPatients', async (id: string) => {
  return await getAllPatientAddedBymedic(id);
});
