/* eslint-disable @typescript-eslint/no-explicit-any */
import { ICreateContentManager, ICreateAdmin, ICreateTutor, ICreateStudent, ITags } from '../entity/model';
import { getConfig, getRequest, postRequest, patchRequest, deleteRequest } from '../api/http.helper';
import { IFilterUserObj } from '../entity/constant';

// ==================APIS ROUTING TO BACKEND=============================

export const forgotKey = async (email: string): Promise<any> => {
  return await postRequest('/admins/forgotKey', {
    params: {
      email: email,
    },
  });
};

// ================== CONTENT MANAGER CRUD =================

export const getAllContentManagers = async (limit: number, offset: number): Promise<any> => {
  return await getRequest(`/user/contentManager/?limit=${limit}&offset=${offset}`, getConfig());
};
export const getFilteredContentManagers = async (
  filterType: string,
  filterQuery: string,
  limit: number,
  offset: number,
): Promise<any> => {
  return await getRequest(
    `/user/contentManager/?${filterType}=${filterQuery}&limit=${limit}&offset=${offset}`,
    getConfig(),
  );
};

export const addNewContentManager = async (obj: ICreateContentManager): Promise<any> => {
  return await postRequest('/user/contentManager/', { params: obj }, getConfig());
};

export const updateContentManager = async (obj: ICreateContentManager): Promise<any> => {
  return await patchRequest(`/user/contentManager/${obj.id}/`, { params: obj }, getConfig());
};
export const deleteContentManager = async (id: string): Promise<any> => {
  return await deleteRequest(`/user/contentManager/${id}/`, getConfig());
};

//=================ADMIN CRUD =======================

export const getAllAdmin = async ({ search, role_id, status, limit, offset }: IFilterUserObj): Promise<any> => {
  return await getRequest(
    `/user/admins/?limit=${limit}&offset=${offset}&search=${search && search}&role_id=${role_id && role_id}&status=${
      status && status
    }`,
    getConfig(),
  );
};

export const getFilteredAdmin = async (
  filterType: string,
  filterQuery: string,
  limit: number,
  offset: number,
): Promise<any> => {
  return await getRequest(`/user/admins/?${filterType}=${filterQuery}&limit=${limit}&offset=${offset}`, getConfig());
};

export const addNewAdmin = async (obj: ICreateAdmin): Promise<any> => {
  return await postRequest('/user/admins/', { params: obj }, getConfig());
};

export const updateAdmin = async (obj: ICreateAdmin): Promise<any> => {
  return await patchRequest(`/user/admins/${obj.id}/`, { params: obj }, getConfig());
};
export const deleteAdmin = async (id: string): Promise<any> => {
  return await deleteRequest(`/user/admins/${id}/`, getConfig());
};

//================ TUTOR CRUD =================================================
export const getAllTutor = async (limit: number, offset: number): Promise<any> => {
  return await getRequest(`/user/tutors/?limit=${limit}&offset=${offset}`, getConfig());
};
export const getFilteredTutor = async (
  filterType: string,
  filterQuery: string,
  limit: number,
  offset: number,
): Promise<any> => {
  return await getRequest(`/user/tutors/?${filterType}=${filterQuery}&limit=${limit}&offset=${offset}`, getConfig());
};

export const addNewTutor = async (obj: ICreateTutor): Promise<any> => {
  return await postRequest('/user/tutors/', { params: obj }, getConfig());
};

export const updateTutor = async (obj: ICreateTutor): Promise<any> => {
  return await patchRequest(`/user/tutors/${obj.id}/`, { params: obj }, getConfig());
};
export const deleteTutor = async (id: string): Promise<any> => {
  return await deleteRequest(`/user/tutors/${id}/`, getConfig());
};

//================ STUDENT CRUD =================================================
export const getAllStudent = async (limit: number, offset: number): Promise<any> => {
  return await getRequest(`/user/students/?limit=${limit}&offset=${offset}`, getConfig());
};
export const getFilteredStudent = async (
  filterType: string,
  filterQuery: string,
  limit: number,
  offset: number,
): Promise<any> => {
  return await getRequest(`/user/students/?${filterType}=${filterQuery}&limit=${limit}&offset=${offset}`, getConfig());
};

export const addNewStudent = async (obj: ICreateStudent): Promise<any> => {
  return await postRequest('/user/students/', { params: obj }, getConfig());
};

export const updateStudent = async (obj: ICreateStudent): Promise<any> => {
  return await patchRequest(`/user/students/${obj.id}/`, { params: obj }, getConfig());
};
export const deleteStudent = async (id: string): Promise<any> => {
  return await deleteRequest(`/user/students/${id}/`, getConfig());
};

//=================TAGS CRUD=============================================

export const getAllTags = async (limit: number, offset: number): Promise<any> => {
  return await getRequest(`/courses/learning-outcome/?limit=${limit}&offset=${offset}`, getConfig());
};

export const addNewTags = async (obj: ITags): Promise<any> => {
  return await postRequest('/courses/learning-outcome/', { params: obj }, getConfig());
};

export const updateTags = async (obj: ITags): Promise<any> => {
  return await patchRequest(`/courses/learning-outcome/${obj.id}/`, { params: obj }, getConfig());
};
export const deleteTags = async (id: string): Promise<any> => {
  return await deleteRequest(`/courses/learning-outcome/${id}/`, getConfig());
};
