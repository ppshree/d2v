/* eslint-disable @typescript-eslint/no-explicit-any */
import { Idevice, IMedicUser } from '../entity/model';
import { IloginUser } from '../entity/constant';
import { getConfig, getRequest, postRequest } from '../api/http.helper';

// ==================APIS ROUTING TO RM-BACKEND=============================
export const login = async (obj: IloginUser): Promise<any> => {
  return await postRequest('/admins/login', {
    params: {
      email: obj.email,
      password: obj.secret_key,
    },
  });
};

export const authenticate = async (): Promise<any> => {
  return await postRequest('/admins/me', {}, getConfig());
};

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
