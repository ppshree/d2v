/* eslint-disable @typescript-eslint/no-explicit-any */
import { ICreateContentManager, ICreateAdmin } from '../entity/model';
import { getConfig, getRequest, postRequest, patchRequest, deleteRequest } from '../api/http.helper';

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

//=================ADMIN CRUD ====================================

export const getAllAdmin = async (limit: number, offset: number): Promise<any> => {
  return await getRequest(`/user/admins/?limit=${limit}&offset=${offset}`, getConfig());
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
