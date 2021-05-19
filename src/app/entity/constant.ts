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
    { name: 'Dashboard', logo: 'BarChartIcon', redirectTo: APPLICATION_URL.SUPERADMIN_DASHBOARD, isTopItem: true },
    { name: 'Master', logo: 'UserXIcon', redirectTo: APPLICATION_URL.SUPERADMIN_MASTER, isTopItem: true },
    { name: 'Admin List', logo: 'UsersIcon', redirectTo: APPLICATION_URL.SUPERADMIN_ADMIN_LIST, isTopItem: true },
    { name: 'Tutor List', logo: 'UserIcon', redirectTo: APPLICATION_URL.SUPERADMIN_TUTOR_LIST, isTopItem: true },
    { name: 'School List', logo: 'BookIcon', redirectTo: APPLICATION_URL.SUPERADMIN_SCHOOL_LIST, isTopItem: true },
    {
      name: 'Student List',
      logo: 'UserCheckIcon',
      redirectTo: APPLICATION_URL.SUPERADMIN_STUDENT_LIST,
      isTopItem: true,
    },
  ],
  ADMIN: [
    { name: 'Dashboard', logo: 'BarChartIcon', redirectTo: APPLICATION_URL.ADMIN_DASHBOARD, isTopItem: true },
    { name: 'Master', logo: 'UserXIcon', redirectTo: APPLICATION_URL.ADMIN_MASTER, isTopItem: true },
    { name: 'Admin List', logo: 'UsersIcon', redirectTo: APPLICATION_URL.ADMIN_ADMIN_LIST, isTopItem: true },
    { name: 'Tutor List', logo: 'UserIcon', redirectTo: APPLICATION_URL.ADMIN_TUTOR_LIST, isTopItem: true },
    { name: 'School List', logo: 'BookIcon', redirectTo: APPLICATION_URL.ADMIN_SCHOOL_LIST, isTopItem: true },
    {
      name: 'Student List',
      logo: 'UserCheckIcon',
      redirectTo: APPLICATION_URL.ADMIN_STUDENT_LIST,
      isTopItem: true,
    },
  ],
  TUTOR: [
    { name: 'Dashboard', logo: 'BarChartIcon', redirectTo: APPLICATION_URL.TUTOR_DASHBOARD, isTopItem: true },
    { name: 'Course', logo: 'BookOpenIcon', redirectTo: APPLICATION_URL.TUTOR_COURSE, isTopItem: true },
    {
      name: 'Student List',
      logo: 'UserCheckIcon',
      redirectTo: APPLICATION_URL.TUTOR_STUDENT_LIST,
      isTopItem: true,
    },
  ],
  SCHOOLSUPERADMIN: [
    {
      name: 'Dashboard',
      logo: 'BarChartIcon',
      redirectTo: APPLICATION_URL.SCHOOLSUPERADMIN_DASHBOARD,
      isTopItem: true,
    },
    { name: 'Admin List', logo: 'UsersIcon', redirectTo: APPLICATION_URL.SCHOOLSUPERADMIN_ADMIN_LIST, isTopItem: true },
    { name: 'Tutor List', logo: 'UserIcon', redirectTo: APPLICATION_URL.SCHOOLSUPERADMIN_TUTOR_LIST, isTopItem: true },
    {
      name: 'Student List',
      logo: 'UserCheckIcon',
      redirectTo: APPLICATION_URL.SCHOOLSUPERADMIN_STUDENT_LIST,
      isTopItem: true,
    },
  ],
  SCHOOLADMIN: [
    { name: 'Dashboard', logo: 'BarChartIcon', redirectTo: APPLICATION_URL.SCHOOLADMIN_DASHBOARD, isTopItem: true },
    { name: 'Tutor List', logo: 'UserIcon', redirectTo: APPLICATION_URL.SCHOOLADMIN_TUTOR_LIST, isTopItem: true },
    {
      name: 'Student List',
      logo: 'UserCheckIcon',
      redirectTo: APPLICATION_URL.SCHOOLADMIN_STUDENT_LIST,
      isTopItem: true,
    },
  ],
  SCHOOLTUTOR: [
    { name: 'Dashboard', logo: 'BarChartIcon', redirectTo: APPLICATION_URL.SCHOOLTUTOR_DASHBOARD, isTopItem: true },
    { name: 'Course', logo: 'BookOpenIcon', redirectTo: APPLICATION_URL.SCHOOLTUTOR_COURSE, isTopItem: true },
    {
      name: 'Student List',
      logo: 'UserCheckIcon',
      redirectTo: APPLICATION_URL.SCHOOLTUTOR_STUDENT_LIST,
      isTopItem: true,
    },
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
