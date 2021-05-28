/* eslint-disable @typescript-eslint/no-explicit-any */
interface IParentObjectKeys {
  [key: string]: any;
}

export const env_variables: IParentObjectKeys = {
  dev: {
    env_name: 'development',
    api_endpoint: 'http://samapikanayak03.pythonanywhere.com',
  },
  prod: {
    env_name: 'production',
    api_endpoint: 'http://samapikanayak03.pythonanywhere.com',
  },
  staging: {
    env_name: 'staging',
    api_endpoint: 'http://samapikanayak03.pythonanywhere.com',
  },
};
