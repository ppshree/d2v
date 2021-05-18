/* eslint-disable @typescript-eslint/no-explicit-any */
import { Idevice, IMedicUser } from '../entity/model';
import { IloginUser } from '../entity/constant';
import { getConfig, getRequest, postRequest } from '../api/http.helper';

// ==================APIS ROUTING TO BACKEND=============================

export const forgotKey = async (email: string): Promise<any> => {
  return await postRequest('/admins/forgotKey', {
    params: {
      email: email,
    },
  });
};

export const getAllMedicAddedByAdmin = async (): Promise<any> => {
  return await getRequest('/medics123', getConfig());
};

export const addNewMedic = async (obj: IMedicUser): Promise<any> => {
  return await postRequest('/medics', { params: obj }, getConfig());
};

// ==================APIS ROUTING TO AWS-BACKEND=============================
