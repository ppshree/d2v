/* eslint-disable @typescript-eslint/no-explicit-any */
interface IParentObjectKeys {
  [key: string]: any;
}

export const env_variables: IParentObjectKeys = {
  dev: {
    env_name: 'development',
    aws_endpoint: 'https://yw6ngz89zd.execute-api.eu-central-1.amazonaws.com/Dev',
    rm_enpoint: 'http://localhost:3030/api/v1',
  },
  prod: {
    env_name: 'production',
    aws_endpoint: 'https://yw6ngz89zd.execute-api.eu-central-1.amazonaws.com/Prod',
    rm_enpoint: 'https://rm-api.prevent.ai/api/v1',
  },
  staging: {
    env_name: 'staging',
    aws_endpoint: 'https://yw6ngz89zd.execute-api.eu-central-1.amazonaws.com/Dev',
    rm_enpoint: 'https://rm-api-staging.prevent.ai/api/v1',
  },
};
