/* eslint-disable @typescript-eslint/no-explicit-any */
import { ICreateContentManager } from '../entity/model';
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

export const addNewContentManager = async (obj: ICreateContentManager): Promise<any> => {
  return await postRequest('/user/contentManager/', { params: obj }, getConfig());
};

export const updateContentManager = async (obj: ICreateContentManager): Promise<any> => {
  return await patchRequest(`/user/contentManager/${obj.id}/`, { params: obj }, getConfig());
};
export const deleteContentManager = async (id: string): Promise<any> => {
  return await deleteRequest(`/user/contentManager/${id}/`, getConfig());
};
