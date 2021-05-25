/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { getConfig, getRequest, postRequest } from '../api/http.helper';
import { IloginUser } from '../entity/constant';

export const login = async (obj: IloginUser): Promise<any> => {
  const encryptString: string = btoa(btoa(`${obj.email}:${obj.password}`));
  return await postRequest('/user/login', {}, getConfig(encryptString));
};

export const authenticate = async (): Promise<any> => {
  return await getRequest('/user/login', getConfig());
};

export const resetPassword = async (userType: string, resetToken: string, password: string): Promise<any> => {
  return await postRequest('/auth/reset-password', {
    params: {
      userType,
      resetToken,
      password,
    },
  });
};

// ==================APIS ROUTING TO RM-BACKEND=============================

// ==================APIS ROUTING TO AWS-BACKEND=============================
