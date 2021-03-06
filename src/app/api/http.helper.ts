/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import axios, { AxiosRequestConfig } from 'axios';
import { env_variables } from '../config';

const current_env: any = process.env.REACT_APP_ENV ? process.env.REACT_APP_ENV : 'dev';
const BASE_API_URL: any = env_variables[current_env].api_endpoint;

export const getConfig = (encryptString?: string): any => {
  if (encryptString !== undefined) {
    return {
      headers: {
        Authentication: 'Authenticate ' + encryptString,
      },
    };
  } else {
    const TOKEN = localStorage.getItem('sessionToken');
    return {
      headers: {
        Authorization: 'Bearer ' + TOKEN,
      },
    };
  }
};

//======================GET, POST, PUT AND DELETE REQUESTS ARE FIRED FROM HERE=================
export async function getRequest(url: string, config?: any) {
  let responseBody: any = {};
  try {
    await axios
      .get(BASE_API_URL + url, config)
      .then((response) => {
        responseBody = response.data;
      })
      .catch((err) => {
        responseBody = err.response.data;
        responseBody.isAxiosError = true;
      });
  } catch (error) {
    responseBody = error;
  }
  return responseBody;
}

export async function postRequest(url: string, param: AxiosRequestConfig, config?: any) {
  let responseBody: any = {};
  try {
    await axios
      .post(BASE_API_URL + url, param.params, config)
      .then((response) => {
        responseBody = response.data;
      })
      .catch((err) => {
        responseBody = err.response.data;
        responseBody.isAxiosError = true;
      });
  } catch (error) {
    responseBody = error;
  }
  return responseBody;
}

export async function patchRequest(url: string, param: AxiosRequestConfig, config?: any) {
  let responseBody: any = {};
  try {
    await axios
      .patch(BASE_API_URL + url, param.params, config)
      .then((response) => {
        responseBody = response.data;
      })
      .catch((err) => {
        responseBody = err.response.data;
        responseBody.isAxiosError = true;
      });
  } catch (error) {
    responseBody = error;
  }
  return responseBody;
}

export async function deleteRequest(url: string, config?: any) {
  let responseBody: any = {};
  try {
    await axios
      .delete(BASE_API_URL + url, config)
      .then((response) => {
        responseBody = response.data;
      })
      .catch((err) => {
        responseBody = err.response.data;
        responseBody.isAxiosError = true;
      });
  } catch (error) {
    responseBody = error;
  }
  return responseBody;
}
