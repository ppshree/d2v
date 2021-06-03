/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { deleteRequest, getConfig, getRequest, patchRequest, postRequest } from '../api/http.helper';
import { IloginUser } from '../entity/constant';
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
export const getAllSchool = async (active: number, limit: number, offset: number): Promise<any> => {
  return await getRequest(`/school/?is_active=${active}&limit=${limit}&offset=${offset}`, getConfig());
};

export const getFilteredSchools = async (
  filterType: string,
  filterQuery: string,
  limit: number,
  offset: number,
): Promise<any> => {
  return await getRequest(`/school/?${filterType}=${filterQuery}&limit=${limit}&offset=${offset}`, getConfig());
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
