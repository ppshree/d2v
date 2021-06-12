/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { deleteRequest, getConfig, getRequest, patchRequest, postRequest } from '../api/http.helper';
import { IFilterObj, IloginUser, SCHOOL } from '../entity/constant';
import { IClass, ICreateSchool, ISubject } from '../entity/model';

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
export const getAllSchool = async ({ status, search, limit, offset }: IFilterObj): Promise<any> => {
  return await getRequest(
    `/school/?limit=${limit}&offset=${offset}&is_active=${
      status && parseInt(status.toString()) === SCHOOL.NOTACTIVE ? SCHOOL.NOTACTIVE : SCHOOL.ACTIVE
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
// ===================== Class CRUD =============================
export const getAllClass = async ({ limit, offset }: IFilterObj): Promise<any> => {
  return await getRequest(`/courses/standard/?limit=${limit}&offset=${offset}`, getConfig());
};

export const addNewClass = async (obj: IClass): Promise<any> => {
  return await postRequest('/courses/standard/', { params: obj }, getConfig());
};

export const updateClass = async (obj: IClass): Promise<any> => {
  return await patchRequest(`/courses/standard/${obj.id}/`, { params: obj }, getConfig());
};

export const deleteClass = async (id: string): Promise<any> => {
  return await deleteRequest(`/courses/standard/${id}/`, getConfig());
};
// ===================== SUBJECT CRUD =============================
export const getAllSubject = async ({ limit, offset }: IFilterObj): Promise<any> => {
  return await getRequest(`/courses/subject/?limit=${limit}&offset=${offset}`, getConfig());
};

export const addNewSubject = async (obj: ISubject): Promise<any> => {
  return await postRequest('/courses/subject/', { params: obj }, getConfig());
};

export const updateSubject = async (obj: ISubject): Promise<any> => {
  return await patchRequest(`/courses/subject/${obj.id}/`, { params: obj }, getConfig());
};

export const deleteSubject = async (id: string): Promise<any> => {
  return await deleteRequest(`/courses/subject/${id}/`, getConfig());
};
// ===================== Topic CRUD =============================
export const getAllTopicBySubject = async ({ limit, offset }: IFilterObj): Promise<any> => {
  return await getRequest(`/courses/topic/?limit=${limit}&offset=${offset}`, getConfig());
};

export const addNewTopic = async (obj: ISubject): Promise<any> => {
  return await postRequest('/courses/topic/', { params: obj }, getConfig());
};

export const updateTopic = async (obj: ISubject): Promise<any> => {
  return await patchRequest(`/courses/topic/${obj.id}/`, { params: obj }, getConfig());
};

export const deleteTopic = async (id: string): Promise<any> => {
  return await deleteRequest(`/courses/topic/${id}/`, getConfig());
};
