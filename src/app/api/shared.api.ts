/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { ISubTopic } from './../entity/model';
import { deleteRequest, getConfig, getRequest, patchRequest, postRequest } from '../api/http.helper';
import { SCHOOL, LIMIT } from '../entity/constant';
import { IClass, ICreateSchool, ISubject, ITopic, IFilterObj, IloginUser } from '../entity/model';

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
export const getAllSchool = async ({ status, name, limit, offset }: IFilterObj): Promise<any> => {
  const filter = JSON.stringify({
    school_name: name,
    is_active: status ? status : SCHOOL.ACTIVE,
  });
  const meta = JSON.stringify({ limit: limit ? limit : LIMIT.DEFAULT, offset: offset ? offset : 0 });
  return await getRequest(`/school/school/?filters=${filter}&meta=${meta}`, getConfig());
};

export const addNewSchool = async (obj: ICreateSchool): Promise<any> => {
  return await postRequest('/school/school/', { params: obj }, getConfig());
};

export const updateSchool = async (obj: ICreateSchool): Promise<any> => {
  return await patchRequest(`/school/school/${obj.id}/`, { params: obj }, getConfig());
};

export const deleteSchool = async (id: string): Promise<any> => {
  return await deleteRequest(`/school/school/${id}/`, getConfig());
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
export const getAllSubject = async ({ standard, limit, offset }: IFilterObj): Promise<any> => {
  const filter = JSON.stringify({
    standard_id__standard_name: standard,
  });
  const meta = JSON.stringify({ limit: limit ? limit : LIMIT.DEFAULT, offset: offset ? offset : 0 });
  return await getRequest(`/courses/subject/?filters=${filter}&meta=${meta}`, getConfig());
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
export const getAllTopicBySubject = async ({ subject, limit, offset }: IFilterObj): Promise<any> => {
  const filter = JSON.stringify({
    subject_id__subject_name: subject,
  });
  const meta = JSON.stringify({ limit: limit ? limit : LIMIT.DEFAULT, offset: offset ? offset : 0 });
  return await getRequest(`/courses/topic/?filters=${filter}&meta=${meta}`, getConfig());
};

export const addNewTopic = async (obj: ITopic): Promise<any> => {
  return await postRequest('/courses/topic/', { params: obj }, getConfig());
};

export const updateTopic = async (obj: ITopic): Promise<any> => {
  return await patchRequest(`/courses/topic/${obj.id}/`, { params: obj }, getConfig());
};

export const deleteTopic = async (id: string): Promise<any> => {
  return await deleteRequest(`/courses/topic/${id}/`, getConfig());
};
// ===================== Sub Topic CRUD =============================
export const getAllSubTopicByTopic = async ({ topic, limit, offset }: IFilterObj): Promise<any> => {
  const filter = JSON.stringify({
    topic_id__topic_name: topic,
  });
  const meta = JSON.stringify({ limit: limit ? limit : LIMIT.DEFAULT, offset: offset ? offset : 0 });
  return await getRequest(`/courses/sub-topic/?filters=${filter}&meta=${meta}`, getConfig());
};

export const addNewSubTopic = async (obj: ISubTopic): Promise<any> => {
  return await postRequest('/courses/sub-topic/', { params: obj }, getConfig());
};

export const updateSubTopic = async (obj: ISubTopic): Promise<any> => {
  return await patchRequest(`/courses/sub-topic/${obj.id}/`, { params: obj }, getConfig());
};

export const deleteSubTopic = async (id: string): Promise<any> => {
  return await deleteRequest(`/courses/sub-topic/${id}/`, getConfig());
};
