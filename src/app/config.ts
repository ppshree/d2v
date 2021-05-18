/* eslint-disable @typescript-eslint/no-explicit-any */
interface IParentObjectKeys {
  [key: string]: any;
}

export const env_variables: IParentObjectKeys = {
  dev: {
    env_name: 'development',
    api_endpoint: process.env.REACT_APP_BASE_API,
  },
  prod: {
    env_name: 'production',
    api_endpoint: process.env.REACT_APP_BASE_API,
  },
  staging: {
    env_name: 'staging',
    api_endpoint: process.env.REACT_APP_BASE_API,
  },
};
