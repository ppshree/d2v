/* eslint-disable @typescript-eslint/no-explicit-any */
import { IloginUser } from '../entity/constant';
import { getConfig, postRequest } from '../api/http.helper';

// ==================APIS ROUTING TO RM-BACKEND=============================
export const login = async (obj: IloginUser): Promise<any> => {
  return await postRequest('/patients/login', {
    params: {
      email: obj.email, //"uri.michaeli@prevent.ai",
      password: obj.secret_key, //"123456"
    },
  });
};
export const authenticate = async (): Promise<any> => {
  return await postRequest('/patients/me', {}, getConfig());
};

export const forgotKey = async (email: string): Promise<any> => {
  return await postRequest('/patients/forgotKey', {
    params: {
      email: email,
    },
  });
};
// ==================APIS ROUTING TO AWS-BACKEND=============================
