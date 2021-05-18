/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { IrequestReadings } from '../entity/model';
import { getConfig, getRequest, postRequest, basePostRequest } from '../api/http.helper';

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
