/* eslint-disable @typescript-eslint/no-explicit-any */
interface IParentObjectKeys {
  [key: string]: any;
}

export const env_variables: IParentObjectKeys = {
  dev: {
    env_name: process.env.REACT_APP_ENV,
    api_endpoint: 'https://samapikanayak03.pythonanywhere.com',
  },
  prod: {
    env_name: process.env.REACT_APP_ENV,
    api_endpoint: 'https://samapikanayak03.pythonanywhere.com',
  },
  staging: {
    env_name: process.env.REACT_APP_ENV,
    api_endpoint: 'https://samapikanayak03.pythonanywhere.com',
  },
};
