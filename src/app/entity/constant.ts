import { APPLICATION_URL } from '../router/applicationRoutes';
export const BASE_URL = 'https://yw6ngz89zd.execute-api.eu-central-1.amazonaws.com/';
export enum STAGE {
  DEV = 'Dev',
  PROD = 'Prod',
}

export enum RESPONSE {
  FAILED = 'failed',
  SUCCESS = 'success',
  FILLALLTHEDATA = 'FILL ALL THE DATA',
  LOGINFAILED = 'LOGIN FAILED',
  DATANOTFOUND = 'DATA NOT FOUND',
  TOKENOTFOUND = 'TOKEM NOT FOUND',
}

export interface ItempUser {
  //PATCH DELETE FOR PRODUCTION
  status: number;
  user_type: number;
  email: string;
  name: string;
}

export enum USER_TYPE {
  SUPERADMIN = 1,
  ADMIN = 2,
  TUTOR = 3,
  STUDENT = 4,
  SCHOOLSUPERADMIN = 5,
  SCHOOLADMIN = 6,
  SCHOOLTUTOR = 7,
  SCHOOLSTUDENT = 8,
}

export const LANGUAGES = [
  { id: 'en', name: 'English' },
  { id: 'ger', name: 'Deutsch' },
];
export const SIDEBAR_PANELS = {
  SUPERADMIN: [
    { name: 'Master', logo: 'dataPrivacy', redirectTo: APPLICATION_URL.SUPERADMIN_MASTER, isTopItem: true },
    { name: 'Admin List', logo: 'medicList', redirectTo: APPLICATION_URL.SUPERADMIN_LIST, isTopItem: true },
  ],
  ADMIN: [
    { name: 'Master', logo: 'dataPrivacy', redirectTo: APPLICATION_URL.ADMIN_MASTER, isTopItem: true },
    { name: 'Admin List', logo: 'medicList', redirectTo: APPLICATION_URL.ADMIN_LIST, isTopItem: true },
  ],
};
export interface ISideBar {
  name: string;
  logo: string;
}
export enum ROLES {
  SUPERADMIN = 'SUPERADMIN',
  ADMIN = 'ADMIN',
  TUTOR = 'TUTOR',
  STUDENT = 'STUDENT',
  SCHOOLSUPERADMIN = 'SCHOOLSUPERADMIN',
  SCHOOLADMIN = 'SCHOOLADMIN',
  SCHOOLTUTOR = 'SCHOOLTUTOR',
  SCHOOLSTUDENT = 'SCHOOLSTUDENT',
}

export type Role = keyof typeof ROLES;

export enum USER_STATUS {
  PENDING = 1, // (EMAIL CONFIRMATION NOT DONE YET)
  ONGOING = 2,
  COMPLETED = 3,
  DISCARDED = 4,
}

export enum CONTENT_TYPE {
  TEXT = 1,
  FILE = 2, //TO BE ADDED LATER
}
export interface IloginUser {
  email: string;
  password: string;
}
export interface IForgetloginUser {
  email: string;
  user_type: 1 | 2 | 3 | 4;
  role: Role;
}
