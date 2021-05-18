/* eslint-disable @typescript-eslint/no-explicit-any */
import { Idevice } from '../entity/model';
import { IloginUser } from '../entity/constant';
import { IPatientUser } from '../entity/model';
import { getConfig, getRequest, postRequest } from '../api/http.helper';
// ==================APIS ROUTING TO RM-BACKEND=============================
export const login = async (obj: IloginUser): Promise<any> => {
  return await postRequest('/medics/login', {
    params: {
      email: obj.email, //"uri.michaeli@prevent.ai",
      password: obj.secret_key,
    },
  });
};
export const authenticate = async (): Promise<any> => {
  return await postRequest('/medics/me', {}, getConfig());
};

export const forgotKey = async (email: string): Promise<any> => {
  return await postRequest('/medics/forgotKey', {
    params: {
      email: email,
    },
  });
};

export const getAllPatientAddedBymedic = async (id: string): Promise<any> => {
  return await getRequest('/patients/byMedic/' + id, getConfig());
};
