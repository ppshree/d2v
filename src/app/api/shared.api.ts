/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { deleteRequest, getConfig, getRequest, patchRequest, postRequest } from '../api/http.helper';
import { IFilterObj, IloginUser, SCHOOL } from '../entity/constant';
import { ICreateSchool } from '../entity/model';

export const login = async (obj: IloginUser): Promise<any> => {
  const encryptString: string = btoa(btoa(`${obj.email}:${obj.password}`));
  return await postRequest('/user/user-login/', {}, getConfig(encryptString));
};

export const authenticate = async (): Promise<any> => {
  return await getRequest('/user/user-login/', getConfig());
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

// ================== SCHOOL CRUD =============================
export const getAllSchool = async ({ active_school, search, limit, offset }: IFilterObj): Promise<any> => {
  return await getRequest(
    `/school/?limit=${limit}&offset=${offset}&is_active=${
      parseInt(active_school) === SCHOOL.NOTACTIVE ? SCHOOL.NOTACTIVE : SCHOOL.ACTIVE
    }&search=${search ? search : ''}`,
    getConfig(),
  );
};

export const addNewSchool = async (obj: ICreateSchool): Promise<any> => {
  return await postRequest('/school/', { params: obj }, getConfig());
};

export const updateSchool = async (obj: ICreateSchool): Promise<any> => {
  return await patchRequest(`/school/${obj.id}/`, { params: obj }, getConfig());
};
export const deleteSchool = async (id: string): Promise<any> => {
  return await deleteRequest(`/school/${id}/`, getConfig());
};
