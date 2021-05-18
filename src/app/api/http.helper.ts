/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import axios, { AxiosRequestConfig } from 'axios';
import { env_variables } from '../config';

const stage: any = process.env.REACT_APP_ENV ? process.env.REACT_APP_ENV : 'dev';
const AWS_BASE_URL: any = env_variables[stage].aws_endpoint;
const RM_BASE_URL: any = env_variables[stage].rm_enpoint;
export const getConfig = (): any => {
  const TOKEN = localStorage.getItem('sessionToken');
  return {
    headers: {
      'x-access-token': TOKEN,
    },
  };
};

//======================GET AND POST REQUESTS ARE FIRED FROM HERE==================
export async function postRequest(url: string, param: AxiosRequestConfig, config?: any) {
  let responseBody = {};
  try {
    //console.log('i am in postrequest');
    await axios
      .post(RM_BASE_URL + url, param.params, config)
      .then((response) => {
        responseBody = response.data;
      })
      .catch((err) => {
        responseBody = err;
      });
  } catch (error) {
    responseBody = error;
  }
  return responseBody;
}

export async function basePostRequest(url: string, param: AxiosRequestConfig, config?: any) {
  let responseBody = {};
  try {
    //console.log('i am in postrequest');
    await axios
      .post(AWS_BASE_URL + url, param.params, config)
      .then((response) => {
        responseBody = response.data;
      })
      .catch((err) => {
        responseBody = err;
      });
  } catch (error) {
    responseBody = error;
  }
  return responseBody;
}

export async function getRequest(url: string, config?: any) {
  let responseBody = {};
  try {
    await axios
      .get(RM_BASE_URL + url, config)
      .then((response) => {
        responseBody = response.data;
      })
      .catch((err) => {
        responseBody = err;
      });
  } catch (error) {
    responseBody = error;
  }
  return responseBody;
}
