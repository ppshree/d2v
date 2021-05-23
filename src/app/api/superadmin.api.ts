/* eslint-disable @typescript-eslint/no-explicit-any */
import { ICreateContentManager } from '../entity/model';
import { getConfig, getRequest, postRequest } from '../api/http.helper';

// ==================APIS ROUTING TO BACKEND=============================

export const forgotKey = async (email: string): Promise<any> => {
  return await postRequest('/admins/forgotKey', {
    params: {
      email: email,
    },
  });
};

// ================== CONTENT MANAGER CRUD =================

export const getAllContentManagersAddedBySuperAdmin = async (): Promise<any> => {
  return await getRequest('/user/superadmin', getConfig());
};

export const addNewContentManager = async (obj: ICreateContentManager): Promise<any> => {
  return await postRequest('/medics', { params: obj }, getConfig());
};

// ==================APIS ROUTING TO AWS-BACKEND=============================
