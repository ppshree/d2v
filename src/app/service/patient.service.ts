import { createAsyncThunk } from '@reduxjs/toolkit';
//import { contactSupportApi, deletePatientProfileApi } from '../api/patient.api';

//TODO: get rid of unknown
// ==================APIS ROUTING TO RM-BACKEND=============================
// export const patientLogin = createAsyncThunk('patient/login', async (obj: IloginUser) => {
//   return await login(obj);
// });
// export const authenticatePatient = createAsyncThunk('patient/authenticate', async (token: string) => {
//   return await authenticate(token);
// });
// ==================APIS ROUTING TO AWS-BACKEND=============================
export const loginUser = createAsyncThunk('posts/fetchPosts', async (obj: unknown) => {
  // const response = await loginUser1('3swayam@gmail.com', 'Pn1hBoCjAS');
  return obj; // return response;
});
